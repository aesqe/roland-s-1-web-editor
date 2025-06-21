import { useAtomValue } from 'jotai'
import { Divider, Fieldset, Stack } from '@mantine/core'

import { CCKnob } from '../Knob/CCKnob'
import { CCSwitch } from '../CCSwitch/CCSwitch'
import { patchAtom } from '../../store/atoms'
import { RadioGroup } from '../RadioGroup/RadioGroup'
import { CCKnobWithLabels } from '../Knob/CCKnobWithLabels'
import { LfoModeTypes, LfoTypes, LfoSyncTypes } from './constants'
import { range127to255 } from '../../services/range127to255/range127to255'

export const LFO = () => {
  const { lfoSync } = useAtomValue(patchAtom)

  return (
    <Fieldset legend='LFO' p={20} bg='#fcfcfc'>
      <Stack gap={15} align='center'>
        <Stack>
          <CCSwitch refName='lfoSync' label='Sync' size='xs' propertyPath='cc.106' />

          <CCSwitch refName='lfoKeyTrigger' label='Retrigger' propertyPath='cc.105' size='xs' />

          <Divider w='100%' />

          <RadioGroup
            refName='lfoMode'
            propertyPath='cc.79'
            defaultValue='0'
            label='Mode'
            values={LfoModeTypes}
            mt={-10}
          />
        </Stack>

        <Divider w='100%' />

        {lfoSync === 0 && (
          <CCKnob
            valueMin={0}
            valueMax={127}
            valueDefault={0}
            center={64}
            propertyPath='cc.3'
            label='Rate'
            refName='lfoRate'
            valueRawDisplayFn={range127to255}
          />
        )}

        {lfoSync === 1 && (
          <CCKnobWithLabels
            valueMin={0}
            valueMax={30}
            valueDefault={9}
            center={15}
            cc={3}
            values={LfoSyncTypes}
            label='Rate'
            refName='lfoRate'
          />
        )}

        <CCKnobWithLabels
          valueMin={0}
          valueMax={5}
          valueDefault={0}
          cc={12}
          values={LfoTypes}
          label='Waveform Type'
          refName='lfoWaveform'
        />

        <Divider w='100%' />

        <CCKnob
          valueMin={0}
          valueMax={127}
          valueDefault={0}
          center={64}
          propertyPath='cc.17'
          valueRawDisplayFn={range127to255}
          label='Modulation Depth'
          refName='lfoModulationDepth'
          aria-description='When the OSC or FILTER receive D-MOTION signals or MIDI modulation, they are controlled by the LFO sine wave output
(producing vibrato or growl effects).
This parameter sets the intensity.'
        />
      </Stack>
    </Fieldset>
  )
}
