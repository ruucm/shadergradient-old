import * as React from 'react'
import { motion, useAnimation } from 'framer-motion'
import styles from '../../../pages/home/Home.module.scss'
import * as animationData_colored from '../../../media/colored-motionlogo.json'
import { MotionLogo } from '@/components/dom/MotionLogo'

export function Loading({ loadStatus }) {
  const loadingAnim = useAnimation()

  const loadingSequence = async () => {
    if (loadStatus === 'firstLoad') {
      loadingAnim.start({
        opacity: 0,
        transition: { duration: 0.5 },
      })
      loadingAnim.start({
        display: 'none',
        transition: { duration: 0, delay: 0.5 },
      })
    }
  }

  React.useEffect(() => {
    loadingSequence()
  }, [loadStatus])
  return (
    <motion.div
      className={styles.loading}
      animate={loadingAnim}
      initial={{ opacity: 1 }}
      style={{ display: loadStatus === 'firstLoadDone' ? 'none' : 'flex' }}
    >
      <MotionLogo color={true} />

      <motion.div className={styles.loadingTextWrapper}>
        <motion.p
          className={styles.loadingText}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 0.5,
            ease: 'easeInOut',
          }}
        >
          This{' '}
        </motion.p>
        <motion.p
          className={styles.loadingText}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 1,
            ease: 'easeInOut',
          }}
        >
          is{' '}
        </motion.p>
        <motion.p
          className={styles.loadingText}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1.5,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 1.5,
            ease: 'easeInOut',
          }}
        >
          ShaderGradient,{' '}
        </motion.p>
        <motion.p
          className={styles.loadingText}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 2.5,
            ease: 'easeInOut',
          }}
        >
          beautiful,{' '}
        </motion.p>
        <motion.p
          className={styles.loadingText}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 3,
            ease: 'easeInOut',
          }}
        >
          customizable,{' '}
        </motion.p>
        <motion.p
          className={styles.loadingText}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 3.5,
            ease: 'easeInOut',
          }}
        >
          and{' '}
        </motion.p>
        <div className={styles.loadingText}>
          <MovingLetters letter='m' letterDelay={4} />
          <MovingLetters letter='o' letterDelay={4.1} />
          <MovingLetters letter='v' letterDelay={4.2} />
          <MovingLetters letter='i' letterDelay={4.3} />
          <MovingLetters letter='n' letterDelay={4.4} />
          <MovingLetters letter='g' letterDelay={4.5} />
        </div>
        <motion.p
          className={styles.loadingText && styles.gradientText}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 4,
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
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1.1,
      }}
      transition={{
        duration: 0.7,
        delay: 4,
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
