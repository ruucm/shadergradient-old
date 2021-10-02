import Hey from 'https://framer.com/m/Hey-LsPa.js@BoSIfatlBoVrv0y68511'

const Page = () => {
  return (
    <>
      Hey
      <Hey />
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
