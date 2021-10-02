import { useEffect, useState } from 'react'
import { Gradient, UI } from 'shadergradient'
import { PreviewSwitch } from '@/components/dom/PreviewSwitch'
import { updateGradientState } from '@/helpers/store'
import useQueryState from '@/hooks/useQueryState'

const Page = () => {
  useEffect(() => {
    // update Gradient if there are query params (history nav)
    window.location.search && updateGradientState(window.location.search)
    document.documentElement.classList.add('remix')
    return () => {
      document.documentElement.classList.remove('remix')
    }
  }, [])

  // shape
  const [type] = useQueryState('type')
  const [animate] = useQueryState('animate')
  const [uTime] = useQueryState('uTime')
  const [uSpeed] = useQueryState('uSpeed')
  const [uStrength] = useQueryState('uStrength')
  const [rotationX] = useQueryState('rotationX')
  const [rotationY] = useQueryState('rotationY')
  const [rotationZ] = useQueryState('rotationZ')

  // colors
  const [color1] = useQueryState('color1')
  const [color2] = useQueryState('color2')
  const [color3] = useQueryState('color3')

  // effects
  const [grain] = useQueryState('grain')
  const [lightType] = useQueryState('lightType')
  const [envPreset] = useQueryState('envPreset')
  const [reflection] = useQueryState('reflection')
  const [brightness] = useQueryState('brightness')

  // camera
  const [cameraZoom] = useQueryState('cameraZoom')
  const [cameraPositionX] = useQueryState('cameraPositionX')
  const [cameraPositionY] = useQueryState('cameraPositionY')
  const [cameraPositionZ] = useQueryState('cameraPositionZ')

  // misc
  const [controls] = useQueryState('controls')

  return (
    <>
      <Gradient
        r3f
        rotation={[
          (rotationX / 360) * Math.PI,
          (rotationY / 360) * Math.PI,
          (rotationZ / 360) * Math.PI,
        ]}
        cameraPosition={{
          x: cameraPositionX,
          y: cameraPositionY,
          z: cameraPositionZ,
        }}
        cameraRotation={{ x: 0, y: 0, z: 0 }}
        type={type}
        animate={animate === 'on'}
        cameraZoom={cameraZoom}
        uTime={uTime}
        uStrength={uStrength}
        uSpeed={uSpeed}
        colors={[color1, color2, color3]}
        grain={grain}
        lightType={lightType}
        envPreset={envPreset}
        reflection={reflection}
        brightness={brightness}
      />
      {controls === 'show' && <Controls />}
    </>
  )
}

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'Gradient Scene',
    },
  }
}

function Controls() {
  const [activeTab, setActiveTab] = useState('shape')

  return (
    <div className='inline-flex overflow-hidden rounded-md'>
      {/* Control Types */}
      <div className='p-4 bg-white w-control-types'>
        <div className='flex flex-col gap-2'>
          <UI.ControlTypeTitle
            title='Shape'
            active={activeTab === 'shape'}
            onClick={() => setActiveTab('shape')}
          />

          <UI.ControlTypeTitle
            title='Colors'
            active={activeTab === 'colors'}
            onClick={() => setActiveTab('colors')}
          />

          <UI.ControlTypeTitle
            title='Effects'
            active={activeTab === 'effects'}
            onClick={() => setActiveTab('effects')}
          />

          <UI.ControlTypeTitle
            title='Camera'
            active={activeTab === 'camera'}
            onClick={() => setActiveTab('camera')}
          />
        </div>
        <PreviewSwitch />
      </div>
      {/* Controls */}
      <div className='inline-block p-4 bg-controls-panel'>
        {activeTab === 'shape' && (
          <UI.ShapeControls useQueryState={useQueryState} />
        )}
        {activeTab === 'colors' && (
          <UI.ColorControls useQueryState={useQueryState} />
        )}
        {activeTab === 'effects' && (
          <UI.EffectControls useQueryState={useQueryState} />
        )}
        {activeTab === 'camera' && (
          <UI.CameraControls useQueryState={useQueryState} />
        )}
      </div>
    </div>
  )
}
