import * as React from 'react'
import { motion, useAnimation } from 'framer-motion'
import styles from '../../../pages/home/Home.module.scss'
import Lottie from 'react-lottie'
import * as animationData_colored from '../../../media/colored-motionlogo.json'

export function Loading({ loadStatus }) {
  const loadingAnim = useAnimation()

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData_colored,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

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
      <motion.div className={styles.logoWrapper}>
        <Lottie options={defaultOptions} height={80} width={80} />
      </motion.div>
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
        {/* <motion.p
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
              delay: 4,
              duration: 0.7,
            },
          }}
        >
          m
        </motion.p>
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
              delay: 4.1,
              duration: 0.7,
            },
          }}
        >
          o
        </motion.p>
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
              delay: 4.2,
              duration: 0.7,
            },
          }}
        >
          v
        </motion.p>
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
              delay: 4.3,
              duration: 0.7,
            },
          }}
        >
          i
        </motion.p>
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
              delay: 4.4,
              duration: 0.7,
            },
          }}
        >
          n
        </motion.p>
        <motion.p
          className={styles.loadingTextMotion}
          style={{ marginRight: '0.3em' }}
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
              delay: 4.5,
              duration: 0.7,
            },
          }}
        >
          g
        </motion.p> */}
        <div
          style={{
            width: 'fit-content',
            height: 'fit-content',
            display: 'inline-block',
            marginRight: '0.3em',
          }}
        >
          <MovingLetters delay={4} letter='m' style={null} />
          <MovingLetters delay={4.1} letter='o' style={null} />
          <MovingLetters delay={4.2} letter='v' style={null} />
          <MovingLetters delay={4.3} letter='i' style={null} />
          <MovingLetters delay={4.4} letter='n' style={null} />
          <MovingLetters delay={4.5} letter='g' />
        </div>
        <motion.p
          className={styles.loadingText}
          initial={{ opacity: 0, y: 20 }}
          style={
            {
              // background: '-webkit-linear-gradient(#eee, #333)',
              // backgroundClip: 'text',
              // textFillColor: 'transparent',
            }
          }
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

const MovingLetters = ({ letter, delay, style = null }) => {
  return (
    <motion.p
      className={styles.loadingTextMotion}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      style={style}
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
          delay: delay,
          duration: 0.7,
        },
      }}
    >
      {letter}
    </motion.p>
  )
}
