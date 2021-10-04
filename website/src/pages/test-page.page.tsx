import Hey from 'https://framer.com/m/Hey-LsPa.js@BoSIfatlBoVrv0y68511'
import { UI } from 'shadergradient'

const Page = () => {
  return (
    <>
      Hey
      <Hey />
      {/* <UI.ShapeControls /> */}
      <div className='h-[66px] flex justify-around items-center'>
        <UI.PropertyControls />
      </div>
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
