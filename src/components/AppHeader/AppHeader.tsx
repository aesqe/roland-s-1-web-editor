import { useRef } from 'react'
import { useAtom } from 'jotai'
import {
  Stack,
  Flex,
  ActionIcon,
  Anchor,
  Divider,
  Image,
  Title,
  Text,
  useMantineColorScheme
} from '@mantine/core'
import { useDisclosure, useViewportSize } from '@mantine/hooks'
import { IconExternalLink, IconTerminal2 } from '@tabler/icons-react'

import githubMark from '../../assets/github-mark.svg'
import { MainButton } from '../MainButton/MainButton'
import { useMidiMap } from '../../services/use-midi-map/use-midi-map'
import { logSysExAtom } from '../../store/atoms'
import { UndoRedoControls } from '../UndoRedoControls/UndoRedoControls'
import { MIDIMappingManager } from '../MIDIMappingManager/MIDIMappingManager'
import { DownloadPatchButton } from '../DownloadPatchButton/DownloadPatchButton'
import { GlobalRandomization } from '../GlobalRandomization/GlobalRandomization'
import { MidiDevicesSelection } from '../MidiDevicesSelection/MidiDevicesSelection'
import { AppHeaderToggleControls } from './components/AppHeaderToggleControls/AppHeaderToggleControls'
import { AppHeaderInitializeControls } from './components/AppHeaderInitializeControls/AppHeaderInitializeControls'
import { S1Patch } from '../../types'

type Props = {
  handlePatchChange: (patch: S1Patch | null | undefined) => void
}

export const AppHeader = ({ handlePatchChange }: Props) => {
  const viewport = useViewportSize()
  const [logSysEx, setLogSysEx] = useAtom(logSysExAtom)
  const containerRef = useRef<HTMLDivElement>(null)
  const { colorScheme } = useMantineColorScheme()
  const [showMIDIMappingManager, { toggle: toggleMIDIMappingManager }] = useDisclosure(false)

  useMidiMap()

  return (
    <>
      <Flex
        w={viewport.width > 970 ? '100%' : '460px'}
        mx='auto'
        wrap='wrap'
        justify='center'
        ref={containerRef}
        pb={viewport.width > 1900 ? 0 : 10}
      >
        <Stack gap={0} mr={10} w={viewport.width > 970 ? 250 : '100%'} pt={5}>
          <Anchor
            title='View the repository on GitHub'
            href='https://github.com/aesqe/sonicware-liven-xfm-web-editor'
            target='_blank'
            c='grey'
            fz={12}
            py={3}
          >
            <Flex align='center' gap={5}>
              <Image
                src={githubMark}
                alt='View the repository on GitHub'
                w={12}
                h={12}
                display='inline'
                style={{ filter: colorScheme === 'dark' ? 'invert(1)' : 'invert(0)' }}
              />
              <Text fz={12} mb={1} inline>
                View the repository on GitHub
              </Text>
              <IconExternalLink size={12} />
            </Flex>
          </Anchor>
          <Flex justify='space-between' align='center' w='100%'>
            <Title order={2} style={{ cursor: 'default' }}>
              XFM Web Editor
            </Title>
            <ActionIcon
              mt={4}
              color={logSysEx ? 'green' : colorScheme === 'light' ? '#e6e3e1' : '#6f6a68'}
              onClick={() => setLogSysEx(!logSysEx)}
              title='Toggle logging of SysEx messages to the browser console'
              c={colorScheme === 'light' ? 'dark' : '#c9c9c9'}
            >
              <IconTerminal2 />
            </ActionIcon>
          </Flex>

          <MidiDevicesSelection />

          <Flex align='end' justify='space-between' gap={5}>
            <DownloadPatchButton />
          </Flex>
        </Stack>

        {viewport.width > 970 && <Divider orientation='vertical' mr={15} ml={10} />}

        <Stack
          gap={8}
          mb={10}
          mt={8}
          mr={viewport.width > 970 ? 20 : 0}
          w={viewport.width > 970 ? 280 : '100%'}
        >
          <AppHeaderInitializeControls
            handlePatchChange={handlePatchChange}
            viewportWidth={viewport.width}
          />
          <Stack align='start' gap={4} w='100%'>
            <AppHeaderToggleControls>
              <MainButton
                active={showMIDIMappingManager}
                w='calc(50% - 2.5px)'
                onClick={toggleMIDIMappingManager}
                flex=''
              >
                MIDI Mapping
              </MainButton>
            </AppHeaderToggleControls>
          </Stack>

          <UndoRedoControls handlePatchChange={handlePatchChange} />
        </Stack>

        {viewport.width > 1880 && <Divider orientation='vertical' mr={15} />}

        <Stack
          align='start'
          gap={4}
          mt={8}
          mr={viewport.width > 970 ? 20 : 0}
          w={viewport.width >= 1920 ? 380 : viewport.width >= 970 ? 280 : '100%'}
        >
          <GlobalRandomization handlePatchChange={handlePatchChange} />
        </Stack>

        {viewport.width > 1900 && <Divider orientation='vertical' mr={20} />}

        {showMIDIMappingManager && (
          <>
            <Divider w='100%' orientation='horizontal' my={20} />
            <MIDIMappingManager />
          </>
        )}
      </Flex>
    </>
  )
}
