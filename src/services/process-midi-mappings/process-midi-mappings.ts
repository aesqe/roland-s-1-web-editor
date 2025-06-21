// import { NormalisableRange } from '../normalisable-range/normalisable-range'
import {
  GlobalRefs,
  // SettableControl,
  MIDIMapping
} from '../../types'

export const processMidiMappings = (
  mappings: MIDIMapping[],
  _value: number,
  _globalRefs: GlobalRefs
) => {
  for (const item of mappings) {
    const {
      //refName,
      propertyPath
      // min,
      // max,
      // center
    } = item
    const pathParts = propertyPath.split('.')

    if (pathParts.length < 2) {
      continue
    }

    // const range = new NormalisableRange(min, max, center)
    // const mappedValue = range.mapFrom01(value as number)

    try {
      if (pathParts[0].startsWith('osc')) {
        // TODO: Implement
      } else {
        console.log('Unknown property path:', item.propertyPath)
      }
    } catch (error) {
      console.error(`Error setting value for ${item.propertyPath}`, error)
    }
  }
}
