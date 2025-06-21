import { useEffect, useRef, useState, useCallback } from 'react'
import { useSetAtom, Setter } from 'jotai'
import { useAtomCallback } from 'jotai/utils'
import { TextInput, Tooltip } from '@mantine/core'
import { useDebouncedCallback } from '@mantine/hooks'
import { IconInfoCircle } from '@tabler/icons-react'

import { SettableControl } from '../../types'
import { globalRefsAtom, patchAtom } from '../../store/atoms'
import { tooltipText, validationRegex } from './constants'

export const PatchNameEditor = () => {
  const setGlobalRef = useSetAtom(globalRefsAtom)
  const [valid, setValid] = useState(true)
  const [patchName, setPatchName] = useState('INIT')
  const ref = useRef<SettableControl>(null)

  useEffect(() => {
    ref.current = {
      setInternalValue: (value) => {
        setPatchName(String(value))
      }
    }
  }, [setPatchName])

  useEffect(() => {
    setGlobalRef((prev) => ({
      ...prev,
      patchName: ref
    }))
  }, [setGlobalRef])

  const handleDebouncedChange = useAtomCallback(
    useDebouncedCallback(
      useCallback(
        (_get, set: Setter, patchName: string) => {
          if (valid) {
            set(patchAtom, (prev) => ({ ...prev, patchName }))
          }
        },
        [valid]
      ),
      1000
    )
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target
      const isValid = value.length > 0 && value.length <= 16 && validationRegex.test(value)

      setValid(isValid)
      setPatchName(value)
      handleDebouncedChange(value)
    },
    [handleDebouncedChange]
  )

  return (
    <TextInput
      flex={1}
      label='Patch Name'
      value={patchName}
      onChange={handleChange}
      error={!valid}
      maxLength={16}
      pt={10}
      styles={{
        input: {
          fontWeight: 700,
          fontSize: 28,
          padding: 6,
          height: 40
        }
      }}
      rightSection={
        <Tooltip
          withArrow
          maw={300}
          multiline
          color='#F0F0F0'
          c='#000000'
          events={{ hover: true, focus: true, touch: true }}
          label={tooltipText}
        >
          <IconInfoCircle />
        </Tooltip>
      }
    />
  )
}
