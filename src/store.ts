import * as qs from 'query-string'
import create from 'zustand'
import { combine } from 'zustand/middleware'
import { initialCurrent } from './consts'

// without embedMode
// it renders without the dom & other gradient controls at first, and add it after the first updateGradientState() excuted.
export const defaultPreset = '?pixelDensity=1'

export const useGradientStore = create((set) => ({
  ...parseState(),
}))

export const usePropertyStore = create((set) => ({
  hoverState: 0,
  toggleZoom: false,
  toggleAxis: false,
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

export const useDomStore = create(() => {
  return { dom: null }
})

export const useUIStore = create(
  combine(
    { activePreset: initialCurrent, mode: 'full', loadingPercentage: 0 },
    (set) => ({
      setActivePreset: (by: number) => set((state) => ({ activePreset: by })),
      setMode: (data: any) => set((state) => ({ ...state, mode: data })),
      setLoadingPercentage: (data: any) =>
        set((state) => ({ ...state, loadingPercentage: data })),
    })
  )
)
