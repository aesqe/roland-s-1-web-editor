import { useCallback } from 'react'
import { useAtomCallback } from 'jotai/utils'
import { useThrottledCallback } from '@mantine/hooks'

import { MIDI_CC_MAP } from '../use-web-midi/constants'
import { globalRefsAtom } from '../../store/atoms'

export const useUpdateControl = () =>
  useThrottledCallback(
    useAtomCallback(
      useCallback((get, _set, cc: number, value: number | string, sendCC = true) => {
        const globalRefs = get(globalRefsAtom)
        const ref = globalRefs[MIDI_CC_MAP[cc]]

        if (ref) {
          ref.current?.setInternalValue(value, sendCC)
        }
      }, [])
    ),
    17
  )
