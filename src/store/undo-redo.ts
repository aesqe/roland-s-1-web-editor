import { useCallback } from 'react'
import { atom } from 'jotai'
import { useAtomCallback } from 'jotai/utils'

import { S1Patch } from '../types'
import { objectsAreJSONEqual } from '../services/compare-objects/compare-objects'

const MAX_HISTORY = 100

export const undoStackAtom = atom<S1Patch[]>([])
export const redoStackAtom = atom<S1Patch[]>([])

export const useHistory = () => {
  const pushToUndoStack = useAtomCallback(
    useCallback((_get, set, data: S1Patch) => {
      set(redoStackAtom, [])

      set(undoStackAtom, (current) => {
        const lastItem = current[current.length - 1]

        if (lastItem && objectsAreJSONEqual(lastItem, data)) {
          return current
        }

        return current.concat(data).slice(-MAX_HISTORY)
      })
    }, [])
  )

  const undoAction = useAtomCallback(
    useCallback((get, set, stateBeforeUndo: S1Patch) => {
      const undoStack = get(undoStackAtom)
      const stateToRestore = undoStack[undoStack.length - 1]

      if (!stateToRestore) {
        return
      }

      const clonedStateToPush = structuredClone(stateBeforeUndo)

      set(undoStackAtom, (current) => current.slice(0, -1))
      set(redoStackAtom, (current) => current.concat(clonedStateToPush).slice(-MAX_HISTORY))

      return stateToRestore
    }, [])
  )

  const redoAction = useAtomCallback(
    useCallback((get, set, stateBeforeRedo: S1Patch) => {
      const redoStack = get(redoStackAtom)
      const stateToRestore = redoStack[redoStack.length - 1]

      if (!stateToRestore) {
        return
      }

      const clonedStateToPush = structuredClone(stateBeforeRedo)

      set(redoStackAtom, (current) => current.slice(0, -1))
      set(undoStackAtom, (current) => current.concat(clonedStateToPush).slice(-MAX_HISTORY))

      return stateToRestore
    }, [])
  )

  return {
    pushToUndoStack,
    undo: undoAction,
    redo: redoAction
  }
}
