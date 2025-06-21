import { atom } from 'jotai'
import { Input, Output } from 'webmidi'

import initPatch from '../assets/presets/initpatch.json'
import { atomWithListeners } from '../services/atom-with-listeners/atom-with-listeners'
import { ADSRValues, RandomizationOptions, GlobalRefs, MIDIMapping, S1Patch } from '../types'

export const webMidiEnabledAtom = atom<boolean>(false)

export const midiInputAtom = atom<Input | null>(null)
export const midiOutputAtom = atom<Output | null>(null)
export const midiInputListAtom = atom<Input[]>([])
export const midiOutputListAtom = atom<Output[]>([])

export const [patchAtom, usePatchAtomListener] = atomWithListeners<S1Patch>(initPatch)

export const randomizationOptionsAtom = atom<RandomizationOptions>({
  amount: 50,
  freeRatio: true,
  lowOP1In: false,
  useStartValues: false
})

export const messagesDelayAtom = atom<number>(16.7)
export const sysexSendThrottleTimeAtom = atom<number>(100)

export const patchClipboardAtom = atom<S1Patch | null>(null)
export const envelopeClipboardAtom = atom<ADSRValues | null>(null)

export const logSysExAtom = atom<boolean>(false)

export const globalRefsAtom = atom<GlobalRefs>({
  patchName: null,
  chordVoice2KeyShift: null,
  chordVoice3KeyShift: null,
  chordVoice4KeyShift: null,
  chordVoice2Active: null,
  chordVoice3Active: null,
  chordVoice4Active: null,
  reverbTime: null,
  reverbLevel: null,
  delayTime: null,
  delayLevel: null,
  chorus: null,
  lfoSync: null,
  lfoKeyTrigger: null,
  lfoMode: null,
  lfoWaveform: null,
  lfoRate: null,
  lfoModulationDepth: null,
  ampEnvelopeMode: null,
  envelopeTriggerMode: null,
  envelopeAttack: null,
  envelopeDecay: null,
  envelopeSustain: null,
  envelopeRelease: null,
  filterCutoff: null,
  filterResonance: null,
  filterLfo: null,
  filterEnvelope: null,
  filterKeyFollow: null,
  filterBendSens: null,
  oscRange: null,
  oscLfo: null,
  oscFineTune: null,
  oscPulseLevel: null,
  oscPulseWidth: null,
  oscPwmSource: null,
  oscSubOscLevel: null,
  oscSubOscOctave: null,
  oscSawLevel: null,
  oscNoiseLevel: null,
  oscNoiseType: null,
  oscTranspose: null,
  oscBendSens: null,
  oscPolyMode: null,
  oscDrawMultiply: null,
  oscChopOvertone: null,
  oscChopComb: null,
  oscDrawSw: null,
  portamentoMode: null,
  portamentoTime: null,
  portamentoDepth: null,
  'globalRandomization.amountRef': null
})

export const midiControllerInputAtom = atom<Input | null>(null)
export const midiInputChannelAtom = atom<number>(1)
export const lastCCUsedAtom = atom<number>(-1)
export const midiMapAtom = atom<MIDIMapping[]>([])
export const midiMappingModeAtom = atom({
  active: false,
  propertyPath: '',
  refName: '',
  enableControlWhileMapping: false,
  controlRange: {
    min: 0,
    max: 127,
    center: 64
  }
})
