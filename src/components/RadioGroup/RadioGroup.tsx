import { useCallback, useEffect, useRef, useState } from 'react'
import { useSetAtom } from 'jotai'
import { Radio, MantineSize, InputLabel } from '@mantine/core'

import { globalRefsAtom } from '../../store/atoms'
import { S1Patch, SettableControl } from '../../types'
import { useUpdatePatch } from '../../services/use-update-patch/use-update-patch'
import { useSendCC } from '../../services/use-send-cc/use-send-cc'

type Props = Omit<React.ComponentProps<typeof Radio.Group>, 'children' | 'onChange'> & {
  values: { value: string; label: string }[]
  onChange?: (value: number, sendCC?: boolean) => void
  size?: MantineSize
  label?: string
  refName: keyof S1Patch
  propertyPath: string
}

export const RadioGroup = ({
  defaultValue,
  values,
  onChange,
  size = 'xs',
  label,
  refName,
  propertyPath,
  ...rest
}: Props) => {
  const setGlobalRefs = useSetAtom(globalRefsAtom)
  const [value, setValue] = useState(defaultValue)
  const ref = useRef<SettableControl<string>>(null)
  const updatePatch = useUpdatePatch()
  const sendCC = useSendCC()

  const handleOnChange = useCallback(
    (val: string | number, shouldSendCC = true) => {
      const cc = Number(propertyPath.replace(/[^\d]/gi, ''))
      setValue(String(val) || '0')

      if (onChange) {
        onChange(Number(val) || 0, shouldSendCC)
      } else {
        updatePatch(cc, Number(val) || 0)

        if (shouldSendCC) {
          sendCC(cc, Number(val) || 0)
        }
      }
    },
    [onChange, propertyPath, updatePatch, sendCC]
  )

  useEffect(() => {
    ref.current = {
      setInternalValue: handleOnChange
    }
  }, [handleOnChange])

  useEffect(() => {
    setGlobalRefs((prev) => ({
      ...prev,
      [refName]: ref
    }))
  }, [refName, setGlobalRefs])

  return (
    <Radio.Group
      value={value}
      defaultValue={defaultValue}
      defaultChecked
      size={size}
      mb={-8}
      onChange={handleOnChange}
      {...rest}
    >
      {label && (
        <InputLabel fw='bold' fz='xs' mb={8}>
          {label}
        </InputLabel>
      )}
      {values.map(({ value, label }) => (
        <Radio
          size={size}
          value={value}
          label={label}
          checked={value === value}
          mb={8}
          key={value}
        />
      ))}
    </Radio.Group>
  )
}
