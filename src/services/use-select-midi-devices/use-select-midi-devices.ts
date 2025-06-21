import { useCallback, useEffect } from 'react'
import { useAtom, useAtomValue } from 'jotai'
import { WebMidi } from 'webmidi'
import { useLocalStorage } from '@mantine/hooks'

import {
  midiInputAtom,
  midiOutputAtom,
  midiOutputListAtom,
  midiInputListAtom,
  webMidiEnabledAtom,
  midiControllerInputAtom,
  midiInputChannelAtom
} from '../../store/atoms'

export const useSelectMidiDevices = () => {
  const webMidiEnabled = useAtomValue(webMidiEnabledAtom)
  const [midiInput, setMidiInput] = useAtom(midiInputAtom)
  const [midiOutput, setMidiOutput] = useAtom(midiOutputAtom)
  const [midiControllerInput, setMidiControllerInput] = useAtom(midiControllerInputAtom)
  const [midiInputChannel, setMidiInputChannel] = useAtom(midiInputChannelAtom)
  const midiInputList = useAtomValue(midiInputListAtom)
  const midiOutputList = useAtomValue(midiOutputListAtom)

  const [midiInputStorage, setMidiInputStorage] = useLocalStorage({
    key: 'midiInput',
    defaultValue: midiInput?.id
  })

  const [midiOutputStorage, setMidiOutputStorage] = useLocalStorage({
    key: 'midiOutput',
    defaultValue: midiOutput?.id
  })

  const [midiControllerInputStorage, setMidiControllerInputStorage] = useLocalStorage({
    key: 'midiControllerInput',
    defaultValue: midiControllerInput?.id
  })

  const [midiInputChannelStorage, setMidiInputChannelStorage] = useLocalStorage({
    key: 'midiInputChannel',
    defaultValue: 1
  })

  const saveMidiInput = (value: string | null) => {
    const input = WebMidi.getInputById(value ?? '') ?? null
    setMidiInputStorage(input?.id ?? '')
    setMidiInput(input)
  }

  const saveMidiOutput = (value: string) => {
    const output = WebMidi.getOutputById(value) ?? null
    setMidiOutputStorage(output?.id ?? '')
    setMidiOutput(output)
  }

  const saveMidiControllerInput = (value: string | null) => {
    const input = WebMidi.getInputById(value ?? '') ?? null
    setMidiControllerInputStorage(input?.id ?? '')
    setMidiControllerInput(input)
  }

  const saveMidiInputChannel = (value: string | null) => {
    setMidiInputChannelStorage(Number(value ?? '1'))
    setMidiInputChannel(Number(value ?? '1'))
  }

  const restoreMidiDevices = useCallback(() => {
    if (midiInputStorage) {
      setMidiInput(WebMidi.getInputById(midiInputStorage) ?? null)
    }

    if (midiOutputStorage) {
      setMidiOutput(WebMidi.getOutputById(midiOutputStorage) ?? null)
    }

    if (midiControllerInputStorage) {
      setMidiControllerInput(WebMidi.getInputById(midiControllerInputStorage) ?? null)
    }

    if (midiInputChannelStorage) {
      setMidiInputChannel(Number(midiInputChannelStorage))
    }
  }, [
    midiInputStorage,
    midiOutputStorage,
    midiControllerInputStorage,
    midiInputChannelStorage,
    setMidiInput,
    setMidiOutput,
    setMidiControllerInput,
    setMidiInputChannel
  ])

  useEffect(() => {
    if (webMidiEnabled) {
      restoreMidiDevices()
    }
  }, [webMidiEnabled, restoreMidiDevices])

  return {
    midiInput,
    midiOutput,
    midiControllerInput,
    midiInputList,
    midiOutputList,
    midiInputChannel,
    saveMidiInput,
    saveMidiOutput,
    saveMidiControllerInput,
    saveMidiInputChannel
  }
}
