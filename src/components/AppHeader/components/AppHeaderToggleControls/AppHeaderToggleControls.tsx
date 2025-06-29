import { ReactNode, useCallback, useState } from 'react'
import { Fieldset, Flex, useMantineColorScheme } from '@mantine/core'

import { MainButton } from '../../../MainButton/MainButton'
import { IconSun } from '@tabler/icons-react'
import { IconMoon } from '@tabler/icons-react'

type Props = {
  children?: ReactNode
}

export const AppHeaderToggleControls = ({ children }: Props) => {
  const [ADSRControlsOpen, setADSRControlsOpen] = useState(true)
  const [scaleControlsOpen, setScaleControlsOpen] = useState(false)
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  const toggleADSRControls = useCallback(() => {
    setADSRControlsOpen(!ADSRControlsOpen)
  }, [ADSRControlsOpen])

  const toggleScaleControls = useCallback(() => {
    setScaleControlsOpen(!scaleControlsOpen)
  }, [scaleControlsOpen])

  return (
    <Fieldset legend='Toggle' w='100%' px={5} py={6}>
      <Flex gap={5} wrap='wrap'>
        <MainButton
          flex=''
          active={scaleControlsOpen}
          onClick={toggleScaleControls}
          w='calc(50% - 2.5px)'
        >
          Scale controls
        </MainButton>
        <MainButton
          flex=''
          active={ADSRControlsOpen}
          onClick={toggleADSRControls}
          w='calc(50% - 2.5px)'
        >
          ADSR controls
        </MainButton>
        <MainButton flex='' onClick={toggleColorScheme} w='calc(50% - 2.5px)'>
          {colorScheme === 'dark' ? (
            <>
              <IconSun size={16} />
              &nbsp; Light Mode
            </>
          ) : (
            <>
              <IconMoon size={16} />
              &nbsp; Dark Mode
            </>
          )}
        </MainButton>
        {children}
      </Flex>
    </Fieldset>
  )
}
