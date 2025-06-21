import initPatch from '../../assets/presets/initpatch.json'
import { S1Patch, RandomizationOptions } from '../../types'

type Props = {
  basic?: boolean
  sourcePatch?: S1Patch
  randomizationOptions: RandomizationOptions
}

const getRandomizedValues = (
  _opNum: number,
  _basic: boolean,
  _randomizationOptions: RandomizationOptions,
  _sourcePatch: S1Patch
) => {
  return { values: {} }
}

export const getRandomPatch = (props: Props): S1Patch => {
  const { basic = false, sourcePatch = initPatch, randomizationOptions } = props

  const random = getRandomizedValues(1, !basic, randomizationOptions, sourcePatch)

  return {
    ...sourcePatch,
    ...random.values
  }
}
