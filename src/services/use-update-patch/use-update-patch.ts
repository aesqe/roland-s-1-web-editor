import { useCallback } from 'react'
import { useAtomCallback } from 'jotai/utils'
import { useThrottledCallback } from '@mantine/hooks'

import { patchAtom } from '../../store/atoms'
import { MIDI_CC_MAP } from '../use-web-midi/constants'

export const useUpdatePatch = () =>
  useThrottledCallback(
    useAtomCallback(
      useCallback((_get, set, cc: number, value: number) => {
        set(patchAtom, (patch) => ({
          ...patch,
          [MIDI_CC_MAP[cc]]: value
        }))
      }, [])
    ),
    250
  )
