import { useForm } from 'react-hook-form'
import { UI } from 'shadergradient'

const ControlsTitle = 'font-semibold text-primary w-control-title'

const Page = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    // mode: "onChange"
    defaultValues: {
      type: 'plane',
      postProcessing: 'threejs',
      animate: 'on',
      currentTime: 0.2,
      speed: 1.8,
      bumpScale: 1.3,
      rotationX: 0,
      rotationY: 90,
      rotationZ: 180,
    },
  })
  const onSubmit = (data) => console.log(data)

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='inline-block p-4 bg-controls-panel'
      >
        <UI.InputPanel title='Type'>
          <UI.Radio
            value='plane'
            check={watch('type') === 'plane'}
            label='Plane'
            {...register('type')}
          />
          <UI.Radio
            value='sphere'
            check={watch('type') === 'sphere'}
            label='Sphere'
            {...register('type')}
          />
          <UI.Radio
            value='waterPlane'
            check={watch('type') === 'waterPlane'}
            label='Water'
            {...register('type')}
          />
        </UI.InputPanel>

        <UI.Spacing className='h-3' />

        <UI.InputPanel title='Animate'>
          <UI.Radio
            value='on'
            check={watch('animate') === 'on'}
            label='On'
            {...register('animate')}
          />
          <UI.Radio
            value='off'
            check={watch('animate') === 'off'}
            label='Off'
            {...register('animate')}
          />
        </UI.InputPanel>

        <UI.Spacing className='h-3' />

        <UI.InputPanel title='Current Time'>
          <UI.Slider
            defaultValue={0.2}
            setValue={setValue}
            step={0.1}
            min={0}
            max={9}
            {...register('currentTime')}
          />
        </UI.InputPanel>

        <UI.Spacing className='h-3' />

        <UI.InputPanel title='Speed'>
          <UI.Slider
            defaultValue={1.8}
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
            defaultValue={1.3}
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
      </form>
    </>
  )
}

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'Index',
    },
  }
}
