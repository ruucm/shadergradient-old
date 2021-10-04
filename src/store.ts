import create from 'zustand'
import * as qs from 'query-string'

// without embedMode
// it renders without the dom & other gradient controls at first, and add it after the first updateGradientState() excuted.
export const defaultPreset = '?pixelDensity=1'

export const useUIStore = create((set) => ({
  current: 0,
  mode: 'full',
  firstLoad: 'never',
  setMode: (data: any) => set((state: any) => ({ ...state, mode: data })),
  setCurrent: (data: any) => set((state: any) => ({ ...state, current: data })),
  setFirstLoad: (data: any) =>
    set((state: any) => ({ ...state, firstLoad: data })),
}))

export const useGradientStore = create((set) => ({
  ...parseState(),
}))

export const updateGradientState = (querystate: any) => {
  const state = parseState(querystate)
  useGradientStore.setState(state, true)
}

// defaultGradient could be replaced by window.location.search
function parseState(search = defaultPreset) {
  return qs.parse(search, {
    parseNumbers: true,
    parseBooleans: true,
    arrayFormat: 'index',
  })
}
