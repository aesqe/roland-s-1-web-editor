import { useCallback } from 'react'
import { useAtomCallback } from 'jotai/utils'
import { Button } from '@mantine/core'
import { Fieldset } from '@mantine/core'

import initPatch from '../../../../assets/presets/initpatch.json'
import { S1Patch } from '../../../../types'
import { patchAtom } from '../../../../store/atoms'
import { MainButton } from '../../../MainButton/MainButton'

type Props = {
  handlePatchChange: (patch: S1Patch) => void
  viewportWidth: number
}

export const AppHeaderInitializeControls = ({ handlePatchChange, viewportWidth }: Props) => {
  const buttonMarginTop = viewportWidth > 970 ? 2 : 20

  const handleInitializePatch = useCallback(() => {
    handlePatchChange(initPatch)
  }, [handlePatchChange])

  const handleInitializeADSR = useAtomCallback(
    useCallback(
      (get) => {
        const patch = get(patchAtom)

        handlePatchChange({
          ...patch
        })
      },
      [handlePatchChange]
    )
  )

  const handleInitializeOperators = useAtomCallback(
    useCallback(
      (get) => {
        const patch = get(patchAtom)

        handlePatchChange({
          ...initPatch,
          ...patch
        })
      },
      [handlePatchChange]
    )
  )

  return (
    <Fieldset legend='Initialize' w='100%' px={5} py={6}>
      <Button.Group w='100%'>
        <MainButton mt={buttonMarginTop} onClick={handleInitializePatch}>
          Patch
        </MainButton>
        <MainButton mt={buttonMarginTop} onClick={handleInitializeOperators}>
          Operators
        </MainButton>
        <MainButton mt={buttonMarginTop} onClick={handleInitializeADSR}>
          ADSR
        </MainButton>
      </Button.Group>
    </Fieldset>
  )
}
