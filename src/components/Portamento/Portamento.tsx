import { Divider, Fieldset, Flex } from '@mantine/core'
import { useAtomValue } from 'jotai'

import { CCKnob } from '../Knob/CCKnob'
import { useSendCC } from '../../services/use-send-cc/use-send-cc'
import { RadioGroup } from '../RadioGroup/RadioGroup'
import { useUpdatePatch } from '../../services/use-update-patch/use-update-patch'
import { globalRefsAtom } from '../../store/atoms'
import { PortamentoModeTypes } from './constants'

export const Portamento = () => {
  const sendCC = useSendCC()
  const globalRefs = useAtomValue(globalRefsAtom)
  const updatePatch = useUpdatePatch()

  return (
    <Fieldset legend='Portamento' p={10} m={-10} mt={20} bg='#00000008'>
      <Flex gap={25} align='center'>
        <RadioGroup
          refName='portamentoMode'
          propertyPath='cc.31'
          defaultValue='0'
          label='Mode'
          values={PortamentoModeTypes}
          mt={-10}
        />

        <Divider orientation='vertical' />

        <CCKnob
          valueMin={0}
          valueMax={127}
          valueDefault={32}
          center={64}
          propertyPath='cc.5'
          label='Time'
          refName='portamentoTime'
        />

        <CCKnob
          valueMin={0}
          valueMax={127}
          valueDefault={127}
          center={64}
          propertyPath='cc.65'
          label='Depth'
          refName='portamentoDepth'
          onChange={(value, shouldSendCC) => {
            updatePatch(65, value)

            if (shouldSendCC) {
              sendCC(65, value)
            }

            globalRefs.portamentoMode?.current?.setInternalValue(value === 0 ? 0 : 1)
          }}
        />
      </Flex>
    </Fieldset>
  )
}
