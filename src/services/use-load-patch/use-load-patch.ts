import { useCallback } from 'react'

import { useAtomCallback } from 'jotai/utils'
import { S1Patch } from '../../types'
import { globalRefsAtom, patchAtom } from '../../store/atoms'

export const useLoadPatch = () =>
  useAtomCallback(
    useCallback((get, set, patch: S1Patch) => {
      const globalRefs = get(globalRefsAtom)

      set(patchAtom, patch)

      const keys = Object.keys(globalRefs).filter(
        (key) => key !== 'globalRandomization.amountRef'
      ) as (keyof S1Patch)[]

      keys.forEach((key) => {
        const ref = globalRefs[key]

        if (ref) {
          ref.current?.setInternalValue(patch[key], true)
        }
      })
    }, [])
  )
