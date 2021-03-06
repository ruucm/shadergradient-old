export * from './components'
export * as UI from './ui-components'
export { useQueryState } from './hooks/useQueryState'
export * from './store'
export * from './presets'
export * from './utils'
export * from './consts'

export const canvasProps = (pixelDensity: number) => ({
  mode: 'concurrent' as 'legacy' | 'blocking' | 'concurrent',
  camera: { fov: 45 },
  dpr: pixelDensity, //device pixel ratio - 1 default and fast, 2 detailed and slow
  linear: true, //sRGBEncoding
  flat: true, //ACESFilmicToneMapping
})
