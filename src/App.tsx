import { Divider, Flex, Stack, Text } from '@mantine/core'

import { LFO } from './components/LFO/LFO'
import { Chord } from './components/Chord/Chord'
import { Filter } from './components/Filter/Filter'
import { Effects } from './components/Effects/Effects'
import { Envelope } from './components/Envelope/Envelope'
import { DrawChop } from './components/DrawChop/DrawChop'
import { useWebMidi } from './services/use-web-midi/use-web-midi'
import { Oscillator } from './components/Oscillator/Oscillator'
import { FileUpload } from './components/FileUpload/FileUpload'
import { useLoadPatch } from './services/use-load-patch/use-load-patch'
import { PatchNameEditor } from './components/PatchNameEditor/PatchNameEditor'
import { DownloadPatchButton } from './components/DownloadPatchButton/DownloadPatchButton'
import { MidiDevicesSelection } from './components/MidiDevicesSelection/MidiDevicesSelection'

export const App = () => {
  useWebMidi()

  const loadPatch = useLoadPatch()

  return (
    <Stack w='100%' mx='auto' gap={0} p={20}>
      <FileUpload handlePatchChange={loadPatch} />

      <Text>Roland S-1</Text>

      <Divider my={10} />

      <Stack w='540' gap={10}>
        <MidiDevicesSelection />
        <Flex w='540' gap={10} justify='space-between' align='end'>
          <PatchNameEditor />
          <DownloadPatchButton />
        </Flex>
      </Stack>

      <Divider my={25} />

      <Flex w='100%' gap={10}>
        <LFO />
        <Oscillator />

        <Stack gap={10}>
          <Filter />
          <Envelope />
          <DrawChop />
        </Stack>

        <Stack gap={10}>
          <Effects />
          <Chord />
        </Stack>
      </Flex>
    </Stack>
  )
}

/**
 * CCs




102 OSC DRAW MULTIPLY (1 > 32)
103 OSC CHOP OVERTONE (0 > 127)
104 OSC CHOP COMB (0 > 127)
107 OSC DRAW SW (Off, Step, Slope)
 * 
 */
