export * from './components/Gradient'
export * from './components/GradientWithQueries'
export * from './components/WireframeOverlay'
export * as UI from './ui-components'
export { useQueryState } from './hooks/useQueryState'
export { updateGradientState } from './store'
export { usePropertyStore } from './store'
export * from './presets'
export * from './utils'

export const canvasProps = (pixelDensity: number) => ({
  mode: 'concurrent' as 'legacy' | 'blocking' | 'concurrent',
  camera: { fov: 45 },
  dpr: pixelDensity, //device pixel ratio - 1 default and fast, 2 detailed and slow
  linear: true, //sRGBEncoding
  flat: true, //ACESFilmicToneMapping
})
