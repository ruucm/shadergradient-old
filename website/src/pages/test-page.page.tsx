import dynamic from 'next/dynamic'
import { useForm } from 'react-hook-form'
import { UI } from 'shadergradient'

const Box = dynamic(() => import('@/components/canvas/Box'), {
  ssr: false,
})

const Page = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // mode: "onChange"
    defaultValues: { Fruits: 'Banana' },
  })
  const onSubmit = (data) => console.log(data)
  const fruitsValue = watch('Fruits')
  console.log('fruitsValue', fruitsValue)

  return (
    <>
      <div style={{ height: 300 }} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <UI.RadioGroup>
          <UI.Radio
            label='Apple'
            value='Apple'
            checked={fruitsValue === 'Apple'}
            {...register('Fruits', { required: true })}
          />
          <UI.Radio
            label='Banana'
            value='Banana'
            checked={fruitsValue === 'Banana'}
            {...register('Fruits', { required: true })}
          />
        </UI.RadioGroup>

        <input type='submit' />
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
