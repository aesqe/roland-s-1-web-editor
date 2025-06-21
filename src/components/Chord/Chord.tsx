import { Fieldset, Flex, Stack } from '@mantine/core'

import { CCKnob } from '../Knob/CCKnob'
import { CCSwitch } from '../CCSwitch/CCSwitch'

export const Chord = () => {
  return (
    <Fieldset legend='Chord' p={20} bg='#aa005508'>
      <Flex gap={25} align='center' justify='space-between'>
        <Stack align='center'>
          <CCKnob
            valueMin={52}
            valueMax={76}
            center={64}
            valueDefault={64}
            propertyPath='cc.85'
            label='Voice 2'
            refName='chordVoice2KeyShift'
            valueRawRoundFn={(value) => Math.round(value)}
            valueRawDisplayFn={(value) => Math.round(value - 64).toString()}
          />

          <CCSwitch label='Active' size='xs' refName='chordVoice2Active' propertyPath='cc.81' />
        </Stack>

        <Stack align='center'>
          <CCKnob
            valueMin={52}
            valueMax={76}
            center={64}
            valueDefault={64}
            propertyPath='cc.86'
            label='Voice 3'
            refName='chordVoice3KeyShift'
            valueRawRoundFn={(value) => Math.round(value)}
            valueRawDisplayFn={(value) => Math.round(value - 64).toString()}
          />

          <CCSwitch label='Active' size='xs' refName='chordVoice3Active' propertyPath='cc.82' />
        </Stack>

        <Stack align='center'>
          <CCKnob
            valueMin={52}
            valueMax={76}
            center={64}
            valueDefault={64}
            propertyPath='cc.87'
            label='Voice 4'
            refName='chordVoice4KeyShift'
            valueRawRoundFn={(value) => Math.round(value)}
            valueRawDisplayFn={(value) => Math.round(value - 64).toString()}
          />

          <CCSwitch label='Active' size='xs' refName='chordVoice4Active' propertyPath='cc.83' />
        </Stack>
      </Flex>
    </Fieldset>
  )
}
