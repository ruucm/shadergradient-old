import { GUIGradient } from '@/components/dom/gui-gradient'
import { FormContext } from '@/helpers/form-provider'
import { useContext } from 'react'
import { Gradient } from 'shadergradient'

const Page = () => {
  const ctx: any = useContext(FormContext)
  const { type, postProcessing } = ctx?.watch()

  return (
    <>
      <Gradient r3f type={type} postProcessing={postProcessing} />
      <GUIGradient />
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
