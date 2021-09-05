import { Gradient } from 'shadergradient'

const Page = () => {
  return (
    <>
      <Gradient r3f />
      {/* <GUIGradient /> */}
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
