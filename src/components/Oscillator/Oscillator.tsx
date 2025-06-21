import { Divider, Fieldset, Flex, Stack } from '@mantine/core'

import {
  range127to240,
  range127to255,
  range127to_11
} from '../../services/range127to255/range127to255'
import { CCKnob } from '../Knob/CCKnob'
import { Portamento } from '../Portamento/Portamento'
import { RadioGroup } from '../RadioGroup/RadioGroup'
import { CCKnobWithLabels } from '../Knob/CCKnobWithLabels'
import { OscRangeTypes, PwmSourceTypes, PolyModeTypes, SubOscTypes } from './constants'

export const Oscillator = () => {
  return (
    <Fieldset legend='Oscillator' p={20} bg='#fafffb'>
      <Flex gap={25} wrap='wrap'>
        <Stack gap={25}>
          <CCKnobWithLabels
            valueMin={0}
            valueMax={5}
            center={2}
            valueDefault={3}
            label='Range'
            refName='oscRange'
            cc={14}
            values={OscRangeTypes}
          />

          <CCKnob
            valueMin={0}
            valueMax={127}
            valueDefault={0}
            center={64}
            propertyPath='cc.13'
            valueRawDisplayFn={range127to255}
            label='LFO Depth'
            refName='oscLfo'
          />

          <CCKnob
            valueMin={0}
            valueMax={127}
            center={64}
            valueDefault={64}
            propertyPath='cc.76'
            label='Fine Tune'
            refName='oscFineTune'
            valueRawDisplayFn={range127to_11}
          />
        </Stack>

        <Stack gap={25}>
          <CCKnob
            valueMin={0}
            valueMax={127}
            valueDefault={0}
            center={64}
            propertyPath='cc.19'
            label='Pulse'
            refName='oscPulseLevel'
            valueRawDisplayFn={range127to255}
          />

          <CCKnob
            valueMin={0}
            valueMax={127}
            valueDefault={0}
            center={64}
            propertyPath='cc.15'
            label='Pulse Width'
            refName='oscPulseWidth'
            valueRawDisplayFn={range127to255}
          />

          <CCKnobWithLabels
            valueMin={0}
            valueMax={2}
            valueDefault={0}
            label='PWM Source'
            refName='oscPwmSource'
            cc={16}
            values={PwmSourceTypes}
          />
        </Stack>

        <Stack gap={25}>
          <CCKnob
            valueMin={0}
            valueMax={127}
            valueDefault={0}
            center={64}
            propertyPath='cc.21'
            label='Sub'
            refName='oscSubOscLevel'
            valueRawDisplayFn={range127to255}
          />

          <CCKnobWithLabels
            valueMin={0}
            valueMax={2}
            valueDefault={0}
            label='Sub Octave'
            refName='oscSubOscOctave'
            cc={22}
            values={SubOscTypes}
          />
        </Stack>

        <Stack gap={25}>
          <CCKnob
            valueMin={0}
            valueMax={127}
            valueDefault={0}
            center={64}
            propertyPath='cc.20'
            label='Saw'
            refName='oscSawLevel'
            valueRawDisplayFn={range127to255}
          />

          <Stack
            gap={25}
            bd='1px solid var(--mantine-color-gray-3'
            p={10}
            m={-10}
            style={{ borderRadius: 'var(--mantine-radius-default)' }}
            bg='#00000008'
          >
            <CCKnob
              valueMin={0}
              valueMax={127}
              valueDefault={0}
              center={64}
              propertyPath='cc.23'
              label='Noise Level'
              refName='oscNoiseLevel'
              valueRawDisplayFn={range127to255}
            />

            <Divider my={-5} />

            <RadioGroup
              refName='oscNoiseType'
              propertyPath='cc.78'
              label='Type'
              values={[
                { value: '0', label: 'Pink' },
                { value: '1', label: 'White' }
              ]}
              defaultValue='0'
              mt={-10}
            />
          </Stack>
        </Stack>
      </Flex>
      <Divider mt={20} mb={10} />
      <Flex gap={25} align='start' justify='space-between'>
        <Flex gap={25} align='start'>
          <CCKnob
            valueMin={4}
            valueMax={124}
            valueDefault={64}
            center={64}
            propertyPath='cc.77'
            label='Transpose'
            refName='oscTranspose'
            valueRawDisplayFn={(val) => (Math.round(val) - 64).toString()}
          />
          <CCKnob
            valueMin={0}
            valueMax={127}
            valueDefault={0}
            center={64}
            propertyPath='cc.18'
            label='Bend Sensitivity'
            refName='oscBendSens'
            valueRawDisplayFn={range127to240}
          />
        </Flex>

        <Divider orientation='vertical' />

        <Flex mr={10}>
          <CCKnobWithLabels
            valueMin={0}
            valueMax={3}
            valueDefault={2}
            label='Polyphony'
            refName='oscPolyMode'
            cc={80}
            values={PolyModeTypes}
          />
        </Flex>
      </Flex>

      <Portamento />
    </Fieldset>
  )
}
