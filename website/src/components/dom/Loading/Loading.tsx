import * as React from 'react'
import { motion, useAnimation } from 'framer-motion'
import styles from '../../../pages/home/Home.module.scss'
import Lottie from 'react-lottie'
import animationData from '../../../media/motionlogo-lottie.json'
export function Loading({ over }) {
  const loadingAnim = useAnimation()

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  React.useEffect(() => {
    if (over === true) {
      loadingAnim.start({
        opacity: 0,
      })
    }
  }, [over])
  return (
    <motion.div
      className={styles.loading}
      animate={loadingAnim}
      initial={{ originY: 1 }}
    >
      <motion.div className={styles.bodyWrapper}>
        <motion.div className={styles.leftWrapper}>
          <motion.div className={styles.title}>
            {/* <motion.h1>ShaderGradient</motion.h1> */}
          </motion.div>
        </motion.div>
        {/* <p>collecting lights...</p> */}
      </motion.div>
      <div
        style={{
          display: 'flex',
          width: '100vw',
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: '30vh',
            height: '30vh',
            borderRadius: '15vh',
            backgroundColor: 'rgba(255,255,255,0.05)',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Lottie options={defaultOptions} height={100} width={100} />
          Loading ... <br />
        </div>
      </div>
    </motion.div>
  )
}

Loading.defaultProps = {}
