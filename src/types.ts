import { RefObject } from 'react'

export type S1Patch = {
  patchName: string
  chordVoice2KeyShift: number
  chordVoice3KeyShift: number
  chordVoice4KeyShift: number
  chordVoice2Active: number
  chordVoice3Active: number
  chordVoice4Active: number
  reverbTime: number
  reverbLevel: number
  delayTime: number
  delayLevel: number
  chorus: number
  lfoSync: number
  lfoKeyTrigger: number
  lfoMode: number
  lfoWaveform: number
  lfoRate: number
  lfoModulationDepth: number
  ampEnvelopeMode: number
  envelopeTriggerMode: number
  envelopeAttack: number
  envelopeDecay: number
  envelopeSustain: number
  envelopeRelease: number
  filterCutoff: number
  filterResonance: number
  filterLfo: number
  filterEnvelope: number
  filterKeyFollow: number
  filterBendSens: number
  oscRange: number
  oscLfo: number
  oscFineTune: number
  oscPulseLevel: number
  oscPulseWidth: number
  oscPwmSource: number
  oscSubOscLevel: number
  oscSubOscOctave: number
  oscSawLevel: number
  oscNoiseLevel: number
  oscNoiseType: number
  oscTranspose: number
  oscBendSens: number
  oscPolyMode: number
  oscDrawMultiply: number
  oscChopOvertone: number
  oscChopComb: number
  oscDrawSw: number
  portamentoMode: number
  portamentoTime: number
  portamentoDepth: number
}

export type ADSRValues = {
  ALevel: number
  ATime: number
  DLevel: number
  DTime: number
  SLevel: number
  STime: number
  RLevel: number
  RTime: number
  UpCurve?: number
  DnCurve?: number
}

export type SettableControl<T = number | string> = {
  setInternalValue: (value: T, sendCC?: boolean) => void
} | null

export type ADSREnvelopeRef = SettableControl<ADSRValues> & {
  refs: {
    aTimeRef: RefObject<SettableControl>
    aLevelRef: RefObject<SettableControl>
    dTimeRef: RefObject<SettableControl>
    dLevelRef: RefObject<SettableControl>
    sTimeRef: RefObject<SettableControl>
    sLevelRef: RefObject<SettableControl>
    rTimeRef: RefObject<SettableControl>
    rLevelRef: RefObject<SettableControl>
    upCurveRef: RefObject<SettableControl>
    dnCurveRef: RefObject<SettableControl>
  }
}

export type RandomizationOptions = {
  amount: number
  freeRatio: boolean
  lowOP1In: boolean
  useStartValues: boolean
}

export type DragPoint = 'attack' | 'decay' | 'sustain' | 'release' | null

export type RatioMode = 'default' | 'free' | 'scale'

export type GlobalRefs = Record<
  keyof S1Patch | 'globalRandomization.amountRef',
  RefObject<SettableControl> | null
>

export type MIDIMapping = {
  controllerIds: number[]
  propertyPath: string
  min: number
  max: number
  center: number
  refName: string
}
