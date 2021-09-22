import { FormContext } from '@/helpers/form-provider'
import { useContext, useState } from 'react'
import { Gradient, UI } from 'shadergradient'
import { ShapeControls } from './shape-controls'
import cx from 'classnames'
import { CameraControls } from './camera-controls'

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
        rotation={[Math.PI / 2, 0, 0]}
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

function ControlTypeTile({ title, active, onClick }) {
  return (
    <div
      className={cx(
        'text-3xl font-medium text-primary text-opacity-20 cursor-pointer',
        active && 'text-opacity-100'
      )}
      onClick={onClick}
    >
      {title}
    </div>
  )
}

function Controls() {
  const [activeTab, setActiveTab] = useState('shape')

  return (
    <div className='inline-flex overflow-hidden rounded-md'>
      {/* Control Types */}
      <div className='p-4 bg-white w-control-types'>
        <ControlTypeTile
          title='Shape'
          active={activeTab === 'shape'}
          onClick={() => setActiveTab('shape')}
        />
        <UI.Spacing className='h-2' />

        <ControlTypeTile
          title='Colors'
          active={activeTab === 'colors'}
          onClick={() => setActiveTab('colors')}
        />
        <UI.Spacing className='h-2' />

        <ControlTypeTile
          title='Light'
          active={activeTab === 'light'}
          onClick={() => setActiveTab('light')}
        />
        <UI.Spacing className='h-2' />

        <ControlTypeTile
          title='Camera'
          active={activeTab === 'camera'}
          onClick={() => setActiveTab('camera')}
        />
      </div>
      {/* Controls */}
      <div className='inline-block p-4 bg-controls-panel'>
        {activeTab === 'shape' && <ShapeControls />}
        {activeTab === 'camera' && <CameraControls />}
      </div>
    </div>
  )
}
