// @ts-ignore
import { motion } from 'https://framer.com/m/framer/framer-motion.js'
// @ts-ignore
import confetti from 'https://framer.com/m/framer/confetti.js'
// @ts-ignore
// import { Render } from 'https://framer.com/m/Render-iv35.js@6Z6W3WMpN4iOXkV8T0Ix'

const Page = () => {
  // console.log('Render', Render)
  return (
    <>
      <motion.div
        style={{
          background: 'green',
          width: 100,
          height: 100,
        }}
        whileTap={{ scale: 1.5, rotate: 90 }}
        onTap={confetti}
      >
        hello!
      </motion.div>
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
