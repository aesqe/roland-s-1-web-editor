import { useAtomValue } from 'jotai'
import { Fieldset, Flex, Stack } from '@mantine/core'

import { CCKnob } from '../Knob/CCKnob'
import { patchAtom } from '../../store/atoms'
import { CCKnobWithLabels } from '../Knob/CCKnobWithLabels'
import { ChorusTypes, DelaySyncTypes } from './constants'

export const Effects = () => {
  const patch = useAtomValue(patchAtom)

  return (
    <Fieldset legend='Effects' p={20} bg='#f5fbff'>
      <Flex gap={10}>
        <Fieldset legend='Reverb' p={10} my={-10} bg='#00000008'>
          <Stack gap={18.5}>
            <CCKnob
              valueMin={0}
              valueMax={127}
              valueDefault={0}
              center={64}
              propertyPath='cc.89'
              label='Time'
              refName='reverbTime'
            />

            <CCKnob
              valueMin={0}
              valueMax={127}
              valueDefault={0}
              center={64}
              propertyPath='cc.91'
              label='Level'
              refName='reverbLevel'
            />
          </Stack>
        </Fieldset>

        <Fieldset legend='Delay' p={10} my={-10} bg='#00000008'>
          <Stack gap={18.5}>
            {patch.lfoSync === 0 && (
              <CCKnob
                valueMin={0}
                valueMax={127}
                valueDefault={0}
                center={64}
                propertyPath='cc.90'
                label='Time'
                refName='delayTime'
              />
            )}

            {patch.lfoSync === 1 && (
              <CCKnobWithLabels
                valueMin={0}
                valueMax={15}
                valueDefault={0}
                cc={90}
                label='Time'
                refName='delayTime'
                center={8}
                values={DelaySyncTypes}
              />
            )}

            <CCKnob
              valueMin={0}
              valueMax={127}
              valueDefault={0}
              center={64}
              propertyPath='cc.92'
              label='Level'
              refName='delayLevel'
            />
          </Stack>
        </Fieldset>

        <Fieldset legend='Chorus' p={10} my={-10} bg='#00000008'>
          <CCKnobWithLabels
            valueMin={0}
            valueMax={4}
            valueDefault={0}
            label='Variant'
            refName='chorus'
            cc={93}
            values={ChorusTypes}
          />
        </Fieldset>
      </Flex>
    </Fieldset>
  )
}
