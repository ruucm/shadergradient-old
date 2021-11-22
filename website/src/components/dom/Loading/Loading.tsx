import * as React from 'react'
import { motion, useAnimation } from 'framer-motion'
import styles from '../../../pages/home/Home.module.scss'
import Lottie from 'react-lottie'
import loadingAnimationData from '../../../media/whitewave.json'
import { MotionLogo } from '@/components/dom/MotionLogo'

import { useUIStore } from '@/helpers/store'

export function Loading() {
  const firstLoad = useUIStore((state: any) => state.firstLoad)
  const setFirstLoad = useUIStore((state: any) => state.setFirstLoad)
  const loadingPercentage = useUIStore((state: any) => state.loadingPercentage)

  const loadingAnim = useAnimation()
  const waveAnim = useAnimation()
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
    }, 3000)
  }

  React.useEffect(() => {
    delay()
  }, [])

  React.useEffect(() => {
    console.log(loadingPercentage)
    // if (loadingPercentage === 100) {
    //   setFirstLoad('firstLoadDone')
    // }
  }, [loadingPercentage])

  const animationSequence = async () => {
    if (loadingPercentage === 100 && delayed === true) {
      // waveAnim.start({
      //   y: -1700,
      //   scale: 2,
      //   transition: { duration: 2 },
      // })
      await loadingAnim.start({
        opacity: 0,
        transition: { duration: 0.5 },
      })
      await setFirstLoad('firstLoadDone')
    }
  }
  React.useEffect(() => {
    animationSequence()
    if (firstLoad === 'firstLoad') {
      loadingAnim.start({
        display: 'flex',
      })
      // waveAnim.start({
      //   opacity: 1,
      //   y: 0,
      //   scale: 1,
      // })
    } else if (firstLoad === 'firstLoadDone') {
      loadingAnim.start({
        display: 'none',
      })
    }
  }, [firstLoad, delayed])

  return (
    <motion.div className={styles.loading} animate={loadingAnim}>
      <div className={styles.loadingSpinner}>
        {/* <MotionLogo color={false} /> */}
        <motion.div
          style={{ width: 40, height: 40, background: '#ff430a' }}
          animate={{
            rotate: 360,
            scale: loadingPercentage === 100 && delayed === true ? 1400 : 1,
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        ></motion.div>
        <p
          style={{
            fontSize: 230,
            color: '#ff430a',
            position: 'absolute',
            opacity: 0.06,
          }}
        >
          ShaderGradient
        </p>
        {/* loading shadergradient */}
      </div>
      {/* <h2 style={{ position: 'absolute', color: 'blue' }}>
        {loadingPercentage}
      </h2>
      <div className={styles.leftWrapper}>
        <motion.div className={styles.title}>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { type: 'spring', duration: 0.5 },
            }}
          >
            ShaderGradient
          </motion.h1>
          <div style={{ lineHeight: 1.2 }}>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { type: 'spring', duration: 0.5, delay: 0.5 },
              }}
              style={{ marginTop: 30 }}
            >
              beautiful,
            </motion.h1>{' '}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { type: 'spring', duration: 0.5, delay: 1 },
              }}
            >
              customizable,
            </motion.h1>{' '}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { type: 'spring', duration: 0.5, delay: 1.5 },
              }}
            >
              and moving gradients
            </motion.h1>
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 1 }}
        animate={waveAnim}
        style={{
          position: 'absolute',
          left: 0,
          top: '50vh',
          zIndex: 100,
        }}
      >
        <Lottie
          options={loadingOption}
          width='100vw'
          isClickToPauseDisabled={true}
        />
      </motion.div> */}
      {/* <motion.div className={styles.loadingTextWrapper}>
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
      </motion.div> */}
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
