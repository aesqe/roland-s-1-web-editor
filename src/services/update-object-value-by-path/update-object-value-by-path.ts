import { S1Patch } from '../../types'

export const updateObjectValueByPath = (obj: S1Patch, path: string, value: number) => {
  const clone = structuredClone(obj)
  const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g)

  pathArray?.reduce((acc, key, i) => {
    if (acc[key] === undefined) {
      acc[key] = {}
    }

    if (i === pathArray.length - 1) {
      acc[key] = value
    }

    return acc[key]
  }, clone)

  return clone
}
