import { NormalisableRange } from '../normalisable-range/normalisable-range'

const range_1_1 = new NormalisableRange(-1, 1, 0)
const range0_127 = new NormalisableRange(0, 127, 64)
const range0_255 = new NormalisableRange(0, 255, 128)
const range0_240 = new NormalisableRange(0, 240, 120)

export const range127to255 = (val: number) =>
  range0_255.mapFrom01(range0_127.mapTo01(val)).toFixed(0)

export const range127to_11 = (val: number) =>
  range_1_1.mapFrom01(range0_127.mapTo01(val)).toFixed(1)

export const range127to240 = (val: number) =>
  range0_240.mapFrom01(range0_127.mapTo01(val)).toFixed(0)
