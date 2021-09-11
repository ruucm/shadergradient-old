import { FormContext } from '@/helpers/form-provider'
import { useContext } from 'react'
import { Gradient, UI } from 'shadergradient'

const Page = () => {
  const ctx: any = useContext(FormContext)
  const {
    type,
    cameraPositionX,
    cameraPositionY,
    cameraPositionZ,
    cameraQuaternionX,
    cameraQuaternionY,
    cameraQuaternionZ,
    cameraZoom,
  }: any = ctx?.watch()

  console.log('type', type)

  return (
    <>
      {/* <Gradient
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
        cameraZoom={cameraZoom}
      /> */}
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
    <div style={{ background: 'white' }}>
      uTime: {uTime}
      <UI.Slider
        defaultValue={0.2}
        setValue={setValue}
        {...register('uTime')}
      />
      <UI.RadioGroup>
        <UI.Radio
          value='plane'
          checked={watch('type') === 'plane'}
          label='Plane'
          {...register('type')}
        />
        <UI.Radio
          value='sphere'
          checked={watch('type') === 'sphere'}
          label='Sphere'
          {...register('type')}
        />
        <UI.Radio
          value='waterPlane'
          checked={watch('type') === 'waterPlane'}
          label='Water'
          {...register('type')}
        />
      </UI.RadioGroup>
      cameraPosition
      <div>
        <input
          type='range'
          min='-5'
          max='5'
          step='0.1'
          {...register('cameraPositionX')}
        />
        <label>cameraPositionX ({cameraPositionX})</label>
      </div>
      <div>
        <input
          type='range'
          min='-5'
          max='5'
          step='0.1'
          {...register('cameraPositionY')}
        />
        <label>cameraPositionY ({cameraPositionY})</label>
      </div>
      <div>
        <input
          type='range'
          min='-5'
          max='5'
          step='0.1'
          {...register('cameraPositionZ')}
        />
        <label>cameraPositionZ ({cameraPositionZ})</label>
      </div>
      cameraQuaternion
      <div>
        <input
          type='range'
          min='-5'
          max='5'
          step='0.1'
          {...register('cameraQuaternionX')}
        />
        <label>cameraQuaternionX ({cameraQuaternionX})</label>
      </div>
      <div>
        <input
          type='range'
          min='-5'
          max='5'
          step='0.1'
          {...register('cameraQuaternionY')}
        />
        <label>cameraQuaternionY ({cameraQuaternionY})</label>
      </div>
      <div>
        <input
          type='range'
          min='-5'
          max='5'
          step='0.1'
          {...register('cameraQuaternionZ')}
        />
        <label>cameraQuaternionZ ({cameraQuaternionZ})</label>
      </div>
      cameraZoom
      <div>
        <input
          type='range'
          min='0.1'
          max='3'
          step='0.1'
          {...register('cameraZoom')}
        />
        <label>cameraZoom ({cameraZoom})</label>
      </div>
    </div>
  )
}
