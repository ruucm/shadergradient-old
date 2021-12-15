import { useStore } from '@/helpers/store'
import { A11yUserPreferences } from '@react-three/a11y'
import { OrbitControls, Preload, useContextBridge } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { FormContext } from '../../helpers/form-provider'
import { useQueryState } from 'shadergradient'

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

  // useEffect(() => {
  //   var noise = document.createElement('div')
  //   noise.style.width = '100vw'
  //   noise.style.height = '100vh'
  //   noise.style.backgroundImage =
  //     'url("https://smlweb-src.s3.ap-northeast-2.amazonaws.com/noise99.png")'
  //   noise.style.backgroundRepeat = 'repeat'
  //   noise.style.color = 'white'
  //   noise.style.position = 'absolute'
  //   noise.style.zIndex = '4'
  //   noise.style.top = '0'
  //   noise.style.left = '0'
  //   noise.style.mixBlendMode = 'overlay'
  //   // noise.innerHTML = 'Hello'

  //   document.getElementById('gradientCanvas').appendChild(noise)
  // }, [])

  return (
    <Canvas
      id='gradientCanvas'
      mode='concurrent'
      style={{
        position: 'absolute',
        top: 0,
      }}
      camera={{
        fov: 45,
      }}
      dpr={pixelDensity} //device pixel ratio - 1 default and fast, 2 detailed and slow
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
