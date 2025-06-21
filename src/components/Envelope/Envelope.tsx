import { Divider, Fieldset, Flex } from '@mantine/core'

import { CCKnob } from '../Knob/CCKnob'
import { RadioGroup } from '../RadioGroup/RadioGroup'
import { AmpEnvelopeModeTypes, EnvTriggerModeTypes } from './constants'

export const Envelope = () => {
  return (
    <Fieldset legend='Envelope' p={20} bg='#f5f5f5'>
      <Flex gap={25} wrap='wrap'>
        <CCKnob
          valueMin={0}
          valueMax={127}
          center={64}
          valueDefault={0}
          propertyPath='cc.73'
          label='Attack'
          refName='envelopeAttack'
        />

        <CCKnob
          valueMin={0}
          valueMax={127}
          center={64}
          valueDefault={127}
          propertyPath='cc.75'
          label='Decay'
          refName='envelopeDecay'
        />

        <CCKnob
          valueMin={0}
          valueMax={127}
          center={64}
          valueDefault={127}
          propertyPath='cc.30'
          label='Sustain'
          refName='envelopeSustain'
        />

        <CCKnob
          valueMin={0}
          valueMax={127}
          center={64}
          valueDefault={64}
          propertyPath='cc.72'
          label='Release'
          refName='envelopeRelease'
        />
      </Flex>

      <Divider mt={20} mb={10} />

      <Flex gap={25} wrap='wrap'>
        <RadioGroup
          refName='ampEnvelopeMode'
          propertyPath='cc.28'
          defaultValue='0'
          label='Amp Envelope Mode'
          values={AmpEnvelopeModeTypes}
        />

        <Divider orientation='vertical' />

        <RadioGroup
          refName='envelopeTriggerMode'
          propertyPath='cc.29'
          defaultValue='0'
          label='Trigger Mode'
          values={EnvTriggerModeTypes}
        />
      </Flex>
    </Fieldset>
  )
}
