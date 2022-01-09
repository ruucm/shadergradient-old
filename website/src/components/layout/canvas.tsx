import { useStore } from '@/helpers/store'
import { A11yUserPreferences } from '@react-three/a11y'
import {
  OrbitControls,
  Preload,
  useContextBridge,
  GizmoHelper,
  GizmoViewport,
} from '@react-three/drei'
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
      makeDefault={true}
    />
  )
}
const LCanvas = ({ children }) => {
  const dom = useStore((state) => state.dom)
  const ContextBridge = useContextBridge(FormContext)

  // performance
  const [pixelDensity] = useQueryState('pixelDensity')

  //hide gizmoHelper on Embedmode
  const [embedMode] = useQueryState('embedMode')

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
      {embedMode === true ? null : (
        <GizmoHelper
          alignment='bottom-right' // widget alignment within scene
          margin={[65, 110]} // widget margins (X, Y)
          renderPriority={2}
        >
          <GizmoViewport
            axisColors={['white', 'white', 'white']}
            labelColor='grey'
            hideNegativeAxes
            axisHeadScale={0.8}
          />
          {/* alternative: <GizmoViewcube /> */}
        </GizmoHelper>
      )}

      <A11yUserPreferences>
        <Preload all />
        <ContextBridge>{children}</ContextBridge>
      </A11yUserPreferences>
    </Canvas>
  )
}

export default LCanvas
