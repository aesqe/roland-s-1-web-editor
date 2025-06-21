import { Select, Stack } from '@mantine/core'

import { useSelectMidiDevices } from '../../services/use-select-midi-devices/use-select-midi-devices'

export const MidiDevicesSelection = () => {
  const {
    midiInput,
    midiOutput,
    midiInputList,
    midiOutputList,
    midiInputChannel,
    saveMidiInput,
    saveMidiOutput,
    saveMidiInputChannel
  } = useSelectMidiDevices()

  return (
    <Stack w='100%' gap={5}>
      <Select
        label='S-1 MIDI Input'
        data={midiInputList.map((input) => ({
          label: input.name,
          value: input.id
        }))}
        value={midiInput?.id}
        onChange={saveMidiInput}
        size='xs'
      />

      <Select
        label='S-1 MIDI Input Channel'
        data={Array.from({ length: 16 }, (_, i) => ({
          label: `Channel ${i + 1}`,
          value: (i + 1).toString()
        }))}
        value={midiInputChannel.toString()}
        onChange={saveMidiInputChannel}
        size='xs'
      />
      <Select
        label='S-1 MIDI Output'
        data={midiOutputList.map((output) => ({
          label: output.name,
          value: output.id
        }))}
        value={midiOutput?.id}
        onChange={(value) => saveMidiOutput(value ?? '')}
        size='xs'
      />
    </Stack>
  )
}
