import { useStore } from '@/helpers/store'
import { A11yUserPreferences } from '@react-three/a11y'
import { OrbitControls, Preload, useContextBridge } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { FormContext } from '../../helpers/form-provider'
<<<<<<< HEAD
import img from 'public/img/noise-test.png'
import { useQueryState } from 'shadergradient'
=======
import { useContextBridge } from '@react-three/drei'
>>>>>>> parent of fd86525 (fix text anim, background)

const LControl = () => {
  const dom = useStore((state) => state.dom)
  const control = useRef(null)

  useEffect(() => {
    if (control) {
      dom.current.style['touch-action'] = 'none'
    }
  }, [dom, control])
  return (
    // @ts-ignore
    <OrbitControls
      ref={control}
      domElement={dom.current}
      enablePan={false}
      enableZoom={false}
      enableRotate={false}
    />
  )
}
const LCanvas = ({ children }) => {
  const dom = useStore((state) => state.dom)
  const ContextBridge = useContextBridge(FormContext)

  // performance
  const [pixelDensity] = useQueryState('pixelDensity')

  return (
    <Canvas
      mode='concurrent'
      style={{
        position: 'absolute',
        top: 0,
      }}
      camera={{
        fov: 45,
      }}
<<<<<<< HEAD
      dpr={pixelDensity} //device pixel ratio - 1 default and fast, 2 detailed and slow
=======
      dpr={2} //device pixel ratio - 1 default and fast, 2 detailed and slow
>>>>>>> parent of fd86525 (fix text anim, background)
      linear={true} //sRGBEncoding
      flat={true} //ACESFilmicToneMapping
      onCreated={(state) => {
        state.events.connect(dom.current)
        console.log('state.camera', state.camera)
      }}
    >
      <LControl />
      <A11yUserPreferences>
        <Preload all />
        <ContextBridge>{children}</ContextBridge>
      </A11yUserPreferences>
    </Canvas>
  )
}

export default LCanvas
