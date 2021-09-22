import { useForm } from 'react-hook-form'
import { UI } from 'shadergradient'

const Page = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // mode: "onChange"
    defaultValues: { type: 'plane', postProcessing: 'threejs' },
  })
  const onSubmit = (data) => console.log(data)

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex items-center bg-controls-panel'>
          <span className='font-semibold text-primary'>Type</span>
          <UI.RadioGroup>
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
        </div>
        <UI.Spacing height='20px' />
        <UI.RadioGroup>
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
