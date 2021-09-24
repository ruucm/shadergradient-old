import { FormContext } from '@/helpers/form-provider'
import { useContext } from 'react'
import { UI } from 'shadergradient'

export function CameraControls() {
  const { register, watch, setValue } = useContext(FormContext)

  const {
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
    <>
      {/* Positions */}
      <UI.InputPanel title='Camera Position X'>
        <UI.Slider
          defaultValue={cameraPositionX}
          setValue={setValue}
          step={0.1}
          min={-5}
          max={5}
          {...register('cameraPositionX')}
        />
      </UI.InputPanel>
      <UI.Spacing className='h-3' />

      <UI.InputPanel title='Camera Position Y'>
        <UI.Slider
          defaultValue={cameraPositionY}
          setValue={setValue}
          step={0.1}
          min={-5}
          max={5}
          {...register('cameraPositionY')}
        />
      </UI.InputPanel>
      <UI.Spacing className='h-3' />

      <UI.InputPanel title='Camera Position Z'>
        <UI.Slider
          defaultValue={cameraPositionZ}
          setValue={setValue}
          step={0.1}
          min={-5}
          max={5}
          {...register('cameraPositionZ')}
        />
      </UI.InputPanel>
      <UI.Spacing className='h-3' />

      {/* Zoom */}
      <UI.InputPanel title='Camera Zoom'>
        <UI.Slider
          defaultValue={cameraZoom}
          setValue={setValue}
          step={0.1}
          min={0}
          max={3}
          {...register('cameraZoom')}
        />
      </UI.InputPanel>
      <UI.Spacing className='h-3' />
    </>
  )
}
