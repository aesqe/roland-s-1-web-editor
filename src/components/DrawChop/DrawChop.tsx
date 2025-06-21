import { Fieldset, Flex } from '@mantine/core'

import { CCKnob } from '../Knob/CCKnob'
import { RadioGroup } from '../RadioGroup/RadioGroup'

const mapDrawMultiply = (midiValue: number) => {
  const normalizedValue = (midiValue - 3) / (127 - 3)
  const mappedValue = 1.0 + normalizedValue * 31.0

  return (Math.round(mappedValue * 10) / 10).toFixed(1)
}

export const DrawChop = () => {
  return (
    <Fieldset legend='Draw/Chop' p={10} bg='#00000008'>
      <Flex gap={25} align='center'>
        <CCKnob
          valueMin={3}
          valueMax={127}
          valueDefault={1}
          center={64}
          propertyPath='cc.102'
          label='Draw Multiply'
          refName='oscDrawMultiply'
          valueRawDisplayFn={mapDrawMultiply}
        />

        <CCKnob
          valueMin={0}
          valueMax={100}
          valueDefault={0}
          propertyPath='cc.103'
          label='Chop Overtone'
          refName='oscChopOvertone'
          valueRawDisplayFn={(value) => Math.round(value * 2).toString()}
        />

        <CCKnob
          valueMin={3}
          valueMax={127}
          center={64}
          valueDefault={0}
          propertyPath='cc.104'
          label='Chop Comb'
          refName='oscChopComb'
          valueRawDisplayFn={mapDrawMultiply}
        />

        <RadioGroup
          refName='oscDrawSw'
          propertyPath='cc.107'
          label='Draw Mode'
          defaultValue='0'
          values={[
            { value: '0', label: 'Off' },
            { value: '1', label: 'Step' },
            { value: '2', label: 'Slope' }
          ]}
        />
      </Flex>
    </Fieldset>
  )
}
