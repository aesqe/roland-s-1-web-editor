import { useEffect, useState } from 'react'
import { useAtomValue, useSetAtom } from 'jotai'
import { WebMidi } from 'webmidi'
import { useCallbackOne } from 'use-memo-one'

import {
  midiInputAtom,
  midiInputListAtom,
  midiOutputListAtom,
  webMidiEnabledAtom
} from '../../store/atoms'
import { useAtomEffect } from '../use-atom-effect/use-atom-effect'
import { useUpdatePatch } from '../use-update-patch/use-update-patch'
import { useUpdateControl } from '../use-update-control/use-update-control'

export const useWebMidi = () => {
  const setWebMidiEnabled = useSetAtom(webMidiEnabledAtom)
  const midiInput = useAtomValue(midiInputAtom)
  const [midiPortsChanged, setMidiPortsChanged] = useState(1)
  const updatePatch = useUpdatePatch()
  const updateControl = useUpdateControl()

  useAtomEffect(
    useCallbackOne(
      (_get, set) => {
        set(midiInputListAtom, WebMidi.inputs)
        set(midiOutputListAtom, WebMidi.outputs)
      },
      [midiPortsChanged]
    )
  )

  useEffect(() => {
    const updateMidiPorts = () => {
      setMidiPortsChanged((prev) => prev + 1)
    }

    WebMidi.enable({ sysex: true })
      .catch((error) => {
        console.log('Failed to enable Web MIDI', error)
      })
      .then(() => {
        WebMidi.addListener('connected', updateMidiPorts)
        WebMidi.addListener('disconnected', updateMidiPorts)

        setWebMidiEnabled(true)
      })

    return () => {
      WebMidi.removeListener('connected', updateMidiPorts)
      WebMidi.removeListener('disconnected', updateMidiPorts)
    }
  }, [setWebMidiEnabled])

  useEffect(() => {
    midiInput?.addListener('controlchange', (e) => {
      if (e.port.name === 'S-1 MIDI OUT') {
        updatePatch(e.controller.number, Number(e.value) * 127)
        updateControl(e.controller.number, Number(e.value) * 127, false)
      }
    })

    return () => {
      midiInput?.removeListener('controlchange')
    }
  }, [midiInput, updatePatch, updateControl])
}
