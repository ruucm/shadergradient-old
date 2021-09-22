import { FormContext } from '@/helpers/form-provider'
import { useContext } from 'react'
import { Gradient, UI } from 'shadergradient'

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

function Controls() {
  const { register, handleSubmit, watch, setValue } = useContext(FormContext) // States from Form
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
    uTime,
  }: any = watch()

  return (
    <div>
      {/* Control Types */}
      <div className='bg-white'></div>
      {/* Controls */}
      <div className='inline-block p-4 bg-controls-panel'>
        <UI.InputPanel title='Type' gap='w-2'>
          <UI.Radio
            value='plane'
            check={type === 'plane'}
            label='Plane'
            {...register('type')}
          />
          <UI.Radio
            value='sphere'
            check={type === 'sphere'}
            label='Sphere'
            {...register('type')}
          />
          <UI.Radio
            value='waterPlane'
            check={type === 'waterPlane'}
            label='Water'
            {...register('type')}
          />
        </UI.InputPanel>

        <UI.Spacing className='h-3' />

        <UI.InputPanel title='Animate' gap='w-2'>
          <UI.Radio
            value='on'
            check={animate === 'on'}
            label='On'
            {...register('animate')}
          />
          <UI.Radio
            value='off'
            check={animate === 'off'}
            label='Off'
            {...register('animate')}
          />
        </UI.InputPanel>

        <UI.Spacing className='h-3' />

        <UI.InputPanel title='Movements'>
          <UI.Slider
            defaultValue={movements}
            setValue={setValue}
            step={0.1}
            min={0}
            max={9}
            {...register('movements')}
          />
        </UI.InputPanel>

        <UI.Spacing className='h-3' />

        <UI.InputPanel title='Speed'>
          <UI.Slider
            defaultValue={speed}
            setValue={setValue}
            step={0.1}
            min={0}
            max={2}
            {...register('speed')}
          />
        </UI.InputPanel>

        <UI.Spacing className='h-3' />

        <UI.InputPanel title='Bump Scale'>
          <UI.Slider
            defaultValue={bumpScale}
            setValue={setValue}
            step={0.1}
            min={0}
            max={2}
            {...register('bumpScale')}
          />
        </UI.InputPanel>

        <UI.Spacing className='h-3' />

        <UI.InputPanel title='Rotation'>
          <UI.NumberInput label='x' {...register('rotationX')} />
          <UI.NumberInput label='y' {...register('rotationY')} />
          <UI.NumberInput label='z' {...register('rotationZ')} />
        </UI.InputPanel>
      </div>
    </div>
  )
}
