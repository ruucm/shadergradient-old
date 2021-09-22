import { useForm } from 'react-hook-form'
import { UI } from 'shadergradient'

const ControlsTitle = 'font-semibold text-primary w-control-title'

const Page = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // mode: "onChange"
    defaultValues: { type: 'plane', postProcessing: 'threejs', animate: 'on' },
  })
  const onSubmit = (data) => console.log(data)

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='inline-block p-4 bg-controls-panel'
      >
        <UI.RadioGroup title='Type'>
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
        </UI.RadioGroup>

        <UI.Spacing className='h-3' />

        <UI.RadioGroup title='Animate'>
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
        </UI.RadioGroup>

        <UI.Spacing className='h-3' />

        <UI.RadioGroup title='Current Time'>
          <UI.Radio
            value='threejs'
            check={watch('postProcessing') === 'threejs'}
            {...register('postProcessing')}
          />
          <UI.Radio
            value='r3f'
            check={watch('postProcessing') === 'r3f'}
            {...register('postProcessing')}
          />
        </UI.RadioGroup>

        <UI.Spacing className='h-3' />

        <UI.RadioGroup title='Speed'>
          <UI.Radio
            value='threejs'
            check={watch('postProcessing') === 'threejs'}
            {...register('postProcessing')}
          />
          <UI.Radio
            value='r3f'
            check={watch('postProcessing') === 'r3f'}
            {...register('postProcessing')}
          />
        </UI.RadioGroup>

        <UI.Spacing className='h-3' />

        <UI.RadioGroup title='Bump Scale'>
          <UI.Radio
            value='threejs'
            check={watch('postProcessing') === 'threejs'}
            {...register('postProcessing')}
          />
          <UI.Radio
            value='r3f'
            check={watch('postProcessing') === 'r3f'}
            {...register('postProcessing')}
          />
        </UI.RadioGroup>

        <UI.Spacing className='h-3' />

        <UI.RadioGroup title='Rotation'>
          <UI.Radio
            value='threejs'
            check={watch('postProcessing') === 'threejs'}
            {...register('postProcessing')}
          />
          <UI.Radio
            value='r3f'
            check={watch('postProcessing') === 'r3f'}
            {...register('postProcessing')}
          />
        </UI.RadioGroup>
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
