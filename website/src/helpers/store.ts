import create from 'zustand'
import qs from 'query-string'
import { defaultGradient } from '@/consts'

const useStore = create(() => {
  return {
    router: null,
    dom: null,
  }
})

export const useGradientStore = create((set) => ({
  ...parseState(),
}))

export const updateGradientState = (querystate) => {
  const state = parseState(querystate)
  useGradientStore.setState(state, true)
}

function parseState(search = defaultGradient) {
  return qs.parse(search, {
    parseNumbers: true,
    parseBooleans: true,
    arrayFormat: 'index',
  })
}

export default useStore
