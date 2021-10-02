import create from 'zustand'
import qs from 'query-string'
import { defaultGradient } from '@/consts'

const useStore = create(() => {
  return {
    router: null,
    dom: null,
  }
})

export const useUIStore = create((set) => ({
  current: 0,
  mode: 'full',
  firstLoad: 'never',
  setMode: (data) => set((state: any) => ({ ...state, mode: data })),
  setCurrent: (data) => set((state: any) => ({ ...state, current: data })),
  setFirstLoad: (data) => set((state: any) => ({ ...state, firstLoad: data })),
}))

export const useGradientStore = create((set) => ({
  ...parseState(),
}))

export const updateGradientState = (querystate) => {
  const state = parseState(querystate)
  useGradientStore.setState(state, true)
}

// defaultGradient could be replaced by window.location.search
function parseState(search = defaultGradient) {
  return qs.parse(search, {
    parseNumbers: true,
    parseBooleans: true,
    arrayFormat: 'index',
  })
}

export default useStore
