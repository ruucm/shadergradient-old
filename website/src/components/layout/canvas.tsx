import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload } from '@react-three/drei'
import { A11yUserPreferences } from '@react-three/a11y'
import useStore from '@/helpers/store'
import { useEffect, useRef } from 'react'
import { FormContext } from '../../helpers/form-provider'
import { useContextBridge } from '@react-three/drei'
import img from 'public/img/noise-test.png'

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

  return (
    <div>
      <Canvas
        mode='concurrent'
        style={{
          position: 'absolute',
          top: 0,
        }}
        camera={{
          fov: 45,
        }}
        dpr={1.5} //device pixel ratio - 1 default and fast, 2 detailed and slow
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
    </div>
  )
}

export default LCanvas
