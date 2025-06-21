import {
  ComponentProps,
  CSSProperties,
  useId,
  useState,
  useEffect,
  useRef,
  useCallback
} from 'react'
import { useAtomValue, useSetAtom } from 'jotai'
import { KnobHeadless, KnobHeadlessLabel, KnobHeadlessOutput } from 'react-knob-headless'
import { Box, Stack, StackProps } from '@mantine/core'

import { NormalisableRange } from '../../services/normalisable-range/normalisable-range'
import { ParameterMappingButton } from '../MIDIMappingManager/components/ParameterMappingButton/ParameterMappingButton'
import { useKnobKeyboardControls } from './services/use-knob-keyboard-controls/use-knob-keyboard-controls'
import { GlobalRefs, SettableControl } from '../../types'
import { globalRefsAtom, midiMappingModeAtom } from '../../store/atoms'
import { useUpdatePatch } from '../../services/use-update-patch/use-update-patch'
import { useSendCC } from '../../services/use-send-cc/use-send-cc'

type KnobHeadlessProps = Pick<
  ComponentProps<typeof KnobHeadless>,
  'valueMin' | 'valueMax' | 'mapTo01' | 'mapFrom01'
>

type KnobBaseProps = Pick<
  ComponentProps<typeof KnobHeadless>,
  'valueRawRoundFn' | 'valueRawDisplayFn'
>

type Props = KnobHeadlessProps &
  Partial<KnobBaseProps> & {
    label: string
    center?: number
    disabled?: boolean
    valueDefault: number
    propertyPath: string
    stepFn?: (valueRaw: number) => number
    stepLargerFn?: (valueRaw: number) => number
    onChange?: (value: number, sendCC?: boolean) => void
    size?: CSSProperties['width']
    refName: keyof GlobalRefs
    round?: boolean
  } & Partial<Omit<StackProps, 'onChange'>>

export const CCKnob = ({
  label,
  propertyPath,
  valueMin,
  valueMax,
  valueDefault,
  center = (valueMin + valueMax) / 2,
  disabled = false,
  size = '3.25rem',
  valueRawDisplayFn = (val: number) => val.toFixed(0),
  valueRawRoundFn = (x: number) => x,
  stepFn = () => 1,
  stepLargerFn = () => 10,
  onChange,
  refName,
  round = false,
  ...stackProps
}: Props) => {
  const knobId = useId()
  const labelId = useId()
  const [valueRaw, setValueRaw] = useState<number>(valueDefault)
  const midiMappingMode = useAtomValue(midiMappingModeAtom)
  const setGlobalRefs = useSetAtom(globalRefsAtom)
  const ref = useRef<SettableControl<number>>(null)
  const updatePatch = useUpdatePatch()
  const sendCC = useSendCC()
  const range = new NormalisableRange(valueMin, valueMax, center)
  const mapTo01 = (x: number) => range.mapTo01(x)
  const mapFrom01 = (x: number) => range.mapFrom01(x)

  const dragSensitivity = midiMappingMode.active ? 0 : 0.006
  const value01 = mapTo01(valueRaw)
  const step = stepFn(valueRaw)
  const stepLarger = stepLargerFn(valueRaw)

  const handleOnChange = useCallback(
    (value: number, shouldSendCC = true) => {
      const cc = Number(propertyPath.replace(/[^\d]/gi, ''))

      const val = round ? Math.round(value) : value

      setValueRaw(value)

      if (onChange) {
        onChange(val, shouldSendCC)
      } else {
        updatePatch(cc, val)

        if (shouldSendCC) {
          sendCC(cc, val)
        }
      }
    },
    [onChange, propertyPath, sendCC, updatePatch, round]
  )

  const keyboardControlHandlers = useKnobKeyboardControls({
    valueRaw,
    valueMin,
    valueMax,
    step,
    stepLarger,
    onValueRawChange: (val) => handleOnChange(val)
  })

  useEffect(() => {
    if (refName) {
      ref.current = {
        setInternalValue: handleOnChange
      }
    }
  }, [setValueRaw, handleOnChange, valueRaw, refName])

  useEffect(() => {
    setGlobalRefs((prev) => ({ ...prev, [refName]: ref }))
  }, [refName, setGlobalRefs])

  const handleOnDoubleClick = useCallback(() => {
    handleOnChange(center)
  }, [center, handleOnChange])

  return (
    <Stack
      gap='0'
      w={size}
      align='center'
      justify='center'
      fz={14}
      lh={1.2}
      ta='center'
      pos='relative'
      style={{
        userSelect: 'none',
        outline: 'none'
      }}
      {...stackProps}
    >
      <KnobHeadlessOutput
        htmlFor={knobId}
        style={{ opacity: disabled ? 0.5 : 1, color: '#00a372' }}
      >
        {valueRawDisplayFn(valueRaw)}
      </KnobHeadlessOutput>
      <Box pos='relative' w={size} h={size} mt={2} mb={2}>
        <KnobHeadless
          id={knobId}
          aria-labelledby={labelId}
          includeIntoTabOrder
          dragSensitivity={dragSensitivity}
          valueMin={valueMin}
          valueMax={valueMax}
          valueRaw={valueRaw}
          valueRawRoundFn={valueRawRoundFn}
          valueRawDisplayFn={valueRawDisplayFn}
          mapTo01={mapTo01}
          mapFrom01={mapFrom01}
          onValueRawChange={handleOnChange}
          onDoubleClick={handleOnDoubleClick}
          {...keyboardControlHandlers}
        >
          <ParameterMappingButton
            propertyPath={propertyPath}
            label={label}
            min={valueMin}
            max={valueMax}
            center={center}
            refName={refName}
            value01={value01}
            disabled={disabled}
          />
        </KnobHeadless>
      </Box>
      <KnobHeadlessLabel id={labelId} style={{ opacity: disabled ? 0.5 : 1, color: '#646464' }}>
        {label}
      </KnobHeadlessLabel>
    </Stack>
  )
}
