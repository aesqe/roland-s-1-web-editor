import { Fieldset, Flex, Stack } from '@mantine/core'

import { CCKnob } from '../Knob/CCKnob'

export const Filter = () => {
  return (
    <Fieldset legend='Filter' p={20} bg='#fff6e9'>
      <Stack gap={25}>
        <Flex gap={25}>
          <CCKnob
            valueMin={0}
            valueMax={127}
            valueDefault={0}
            center={64}
            propertyPath='cc.74'
            label='Cutoff'
            refName='filterCutoff'
          />

          <CCKnob
            valueMin={0}
            valueMax={127}
            valueDefault={0}
            center={64}
            propertyPath='cc.71'
            label='Resonance'
            refName='filterResonance'
          />

          <CCKnob
            valueMin={0}
            valueMax={127}
            valueDefault={0}
            center={64}
            propertyPath='cc.25'
            label='LFO'
            refName='filterLfo'
          />

          <CCKnob
            valueMin={0}
            valueMax={127}
            valueDefault={0}
            center={64}
            propertyPath='cc.24'
            label='Envelope'
            refName='filterEnvelope'
          />
        </Flex>

        <Flex gap={25}>
          <CCKnob
            valueMin={0}
            valueMax={127}
            valueDefault={0}
            center={64}
            propertyPath='cc.26'
            label='Key Follow'
            refName='filterKeyFollow'
          />

          <CCKnob
            valueMin={0}
            valueMax={127}
            valueDefault={0}
            center={64}
            propertyPath='cc.27'
            label='Bend Sensitivity'
            refName='filterBendSens'
          />
        </Flex>
      </Stack>
    </Fieldset>
  )
}
