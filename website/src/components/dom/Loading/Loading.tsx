import * as React from 'react'
import { motion, useAnimation } from 'framer-motion'
import styles from '../../../pages/home/Home.module.scss'
import Lottie from 'react-lottie'
import loadingAnimationData from '../../../media/whitelongloading.json'

import { useUIStore } from '@/helpers/store'

export function Loading() {
  const firstLoad = useUIStore((state: any) => state.firstLoad)
  const setFirstLoad = useUIStore((state: any) => state.setFirstLoad)
  const loadingPercentage = useUIStore((state: any) => state.loadingPercentage)

  const loadingAnim = useAnimation()
  const loadingOption = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
  const [delayed, setDelayed] = React.useState(false)
  const delay = async () => {
    setTimeout(() => {
      setDelayed(true)
    }, 5000)
  }

  React.useEffect(() => {
    delay()
  }, [])

  React.useEffect(() => {
    console.log(loadingPercentage)
    if (loadingPercentage === 100) {
      setFirstLoad('firstLoadDone')
    }
  }, [loadingPercentage])

  return (
    <motion.div
      className={styles.loading}
      animate={loadingAnim}
      style={{
        display:
          firstLoad === 'firstLoadDone' && delayed === true ? 'none' : 'flex',
      }}
    >
      <motion.div className={styles.loadingTextWrapper}>
        <Lottie
          options={loadingOption}
          height={100}
          width={550}
          isClickToPauseDisabled={true}
        />
        <motion.p
          className={styles.loadingText}
          initial={{ opacity: 0.3 }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.7,
            delay: 0,
            ease: 'easeInOut',
          }}
        >
          This{' '}
        </motion.p>
        <motion.p
          className={styles.loadingText}
          initial={{ opacity: 0.3 }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.7,
            delay: 0.3,
            ease: 'easeInOut',
          }}
        >
          is{' '}
        </motion.p>
        <motion.p
          className={styles.loadingText}
          initial={{ opacity: 0.3 }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.7,
            delay: 0.6,
            ease: 'easeInOut',
          }}
        >
          ShaderGradient,{' '}
        </motion.p>
        <motion.p
          className={styles.loadingText}
          initial={{ opacity: 0.3 }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.7,
            delay: 0.9,
            ease: 'easeInOut',
          }}
        >
          beautiful,{' '}
        </motion.p>
        <motion.p
          className={styles.loadingText}
          initial={{ opacity: 0.3 }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.7,
            delay: 1.2,
            ease: 'easeInOut',
          }}
        >
          customizable,{' '}
        </motion.p>
        <motion.p
          className={styles.loadingText}
          initial={{ opacity: 0.3 }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.7,
            delay: 1.5,
            ease: 'easeInOut',
          }}
        >
          and{' '}
        </motion.p>
        <div className={styles.loadingText}>
          <MovingLetters letter='m' letterDelay={1.8} />
          <MovingLetters letter='o' letterDelay={1.9} />
          <MovingLetters letter='v' letterDelay={2.0} />
          <MovingLetters letter='i' letterDelay={2.1} />
          <MovingLetters letter='n' letterDelay={2.2} />
          <MovingLetters letter='g' letterDelay={2.3} />
        </div>
        <motion.p
          className={styles.loadingText && styles.gradientText}
          initial={{ opacity: 0.3 }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.7,
            delay: 2.6,
            ease: 'easeInOut',
          }}
        >
          gradients.{' '}
        </motion.p>
        <Lottie
          options={loadingOption}
          height={100}
          width={550}
          isClickToPauseDisabled={true}
        />
      </motion.div>
    </motion.div>
  )
}

Loading.defaultProps = {}

const MovingLetters = ({ letterDelay, letter }) => {
  return (
    <motion.p
      className={styles.loadingTextMotion}
      initial={{ opacity: 0.3, scale: 0.95 }}
      animate={{
        opacity: 1,
        scale: 1.1,
      }}
      transition={{
        duration: 0.7,
        delay: 1.8,
        ease: 'easeInOut',
        scale: {
          repeatType: 'reverse',
          repeat: Infinity,
          delay: letterDelay,
          duration: 0.7,
        },
      }}
    >
      {letter}
    </motion.p>
  )
}
