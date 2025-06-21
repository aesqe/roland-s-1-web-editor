import { useCallback, useRef } from 'react'
import { useAtomValue } from 'jotai'
import { useAtomCallback } from 'jotai/utils'

import { midiInputChannelAtom, midiOutputAtom } from '../../store/atoms'
import { useUpdatePatch } from '../use-update-patch/use-update-patch'

export const useSendCC = () => {
  const midiInputChannel = useAtomValue(midiInputChannelAtom)
  const lastSentCCAndValue = useRef<{ cc: number; value: number } | null>(null)
  const updatePatch = useUpdatePatch()

  return useAtomCallback(
    useCallback(
      (get, _set, cc: number, value: number) => {
        const midiOutput = get(midiOutputAtom)

        console.log('midiInputChannel', midiInputChannel)

        midiOutput?.channels[midiInputChannel].sendControlChange(cc, value)

        updatePatch(cc, value)

        lastSentCCAndValue.current = { cc, value }
      },
      [updatePatch, midiInputChannel]
    )
  )
}
