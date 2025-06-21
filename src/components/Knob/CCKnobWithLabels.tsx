import { CCKnob } from './CCKnob'
import { GlobalRefs } from '../../types'

type Props = {
  valueMin: number
  valueMax: number
  valueDefault: number
  center?: number
  label: string
  refName: keyof GlobalRefs
  values: { value: string; label: string }[]
  cc: number
  onChange?: (value: number) => void
}

export const CCKnobWithLabels = ({
  valueMin,
  valueMax,
  center,
  valueDefault,
  label,
  refName,
  values,
  cc,
  onChange
}: Props) => (
  <CCKnob
    valueMin={valueMin}
    valueMax={valueMax}
    center={center}
    valueDefault={valueDefault}
    propertyPath={`cc.${cc}`}
    label={label}
    refName={refName}
    stepLargerFn={() => 1}
    valueRawDisplayFn={(val) => values[Math.round(val)]?.label}
    onChange={onChange}
    round
  />
)
