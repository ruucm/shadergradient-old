import * as React from 'react'
import { motion, useAnimation } from 'framer-motion'
import styles from '../../../pages/home/Home.module.scss'

import { useUIStore } from '@/helpers/store'

export function Loading() {
  const firstLoad = useUIStore((state: any) => state.firstLoad)
  const setFirstLoad = useUIStore((state: any) => state.setFirstLoad)
  const loadingAnim = useAnimation()

  const delay = () => {
    setTimeout(() => {
      setFirstLoad('firstLoadDone')
    }, 5000)
  }

  React.useEffect(() => {
    delay()
  }, [])

  return (
    <motion.div
      className={styles.loading}
      animate={loadingAnim}
      style={{ display: firstLoad === 'firstLoadDone' ? 'none' : 'flex' }}
    >
      <motion.div className={styles.loadingTextWrapper}>
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
