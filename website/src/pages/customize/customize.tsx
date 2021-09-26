import { FormContext } from '@/helpers/form-provider'
import { useContext, useState } from 'react'
import { Gradient, UI } from 'shadergradient'
import cx from 'classnames'
import { PreviewSwitch } from '@/components/dom/PreviewSwitch'

const Page = () => {
  const ctx: any = useContext(FormContext)
  const {
    type,
    animate,
    movements,
    speed,
    bumpScale,
    rotationX,
    rotationY,
    rotationZ,
    cameraPositionX,
    cameraPositionY,
    cameraPositionZ,
    cameraQuaternionX,
    cameraQuaternionY,
    cameraQuaternionZ,
    cameraZoom,
  }: any = ctx?.watch()

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
        cameraQuaternion={{
          x: cameraQuaternionX,
          y: cameraQuaternionY,
          z: cameraQuaternionZ,
        }}
        type={type}
        animate={animate === 'on'}
        cameraZoom={cameraZoom}
        uTime={movements}
      />
      <Controls />
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
          <UI.ShapeControls FormContext={FormContext} />
        )}
        {activeTab === 'colors' && (
          <UI.ColorControls FormContext={FormContext} />
        )}
        {activeTab === 'effects' && (
          <UI.EffectControls FormContext={FormContext} />
        )}
        {activeTab === 'camera' && (
          <UI.CameraControls FormContext={FormContext} />
        )}
      </div>
    </div>
  )
}
