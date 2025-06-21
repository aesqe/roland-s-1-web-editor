import { useCallback, useEffect, useRef, useState } from 'react'
import { useSetAtom } from 'jotai'
import { Switch, SwitchProps } from '@mantine/core'

import { useSendCC } from '../../services/use-send-cc/use-send-cc'
import { globalRefsAtom } from '../../store/atoms'
import { useUpdatePatch } from '../../services/use-update-patch/use-update-patch'
import { S1Patch, SettableControl } from '../../types'

type Props = Omit<SwitchProps, 'checked' | 'onChange'> & {
  refName: keyof S1Patch
  onChange?: (checked: 0 | 1, sendCC?: boolean) => void
  propertyPath: string
}

export const CCSwitch = ({ refName, onChange, propertyPath, ...switchProps }: Props) => {
  const setGlobalRef = useSetAtom(globalRefsAtom)
  const ref = useRef<SettableControl<number>>(null)
  const [checked, setChecked] = useState(false)
  const updatePatch = useUpdatePatch()
  const sendCC = useSendCC()

  const handleOnChange = useCallback(
    (val: number, shouldSendCC = true) => {
      const cc = Number(propertyPath.replace(/[^\d]/gi, ''))
      setChecked(val === 1)

      if (onChange) {
        onChange(val === 0 ? 0 : 1, shouldSendCC)
      } else {
        updatePatch(cc, val === 0 ? 0 : 1)

        if (shouldSendCC) {
          sendCC(cc, val === 0 ? 0 : 1)
        }
      }
    },
    [onChange, updatePatch, sendCC, propertyPath]
  )

  useEffect(() => {
    ref.current = {
      setInternalValue: handleOnChange
    }

    setGlobalRef((prev) => ({
      ...prev,
      [refName]: ref
    }))
  }, [refName, setGlobalRef, handleOnChange])

  return (
    <Switch
      {...switchProps}
      styles={{
        body: {
          gap: 5,
          flexDirection: 'column-reverse',
          alignItems: 'center'
        },
        label: {
          paddingInlineStart: 0
        }
      }}
      checked={checked}
      onChange={(event) => handleOnChange(event.currentTarget.checked ? 1 : 0, true)}
    />
  )
}
