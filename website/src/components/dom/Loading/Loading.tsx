import { useState } from 'react'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import styles from './Loading.module.scss'
import Lottie from 'react-lottie'
import loadingAnimationData from '@/media/whitewave.json'
import { useInterval } from '@/hooks/useInterval'
import { initialCurrent, initialLoadingTime } from '@/consts'

const variants = {
  container: {
    show: {
      transition: {
        staggerChildren: 1,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  },
}

export function Loading({ current, loadingPercentage, referer }) {
  const waveAnim = useAnimation()
  const loadingOption = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  const [time, setTime] = useState(0)
  useInterval(() => {
    setTime(time + 1)
  }, 1000)

  const splitted = referer?.split('/') || []
  const isFirstLoad = !splitted[splitted.length - 1]

  return (
    <AnimatePresence>
      {current === initialCurrent &&
        (loadingPercentage < 100 || time < initialLoadingTime) &&
        isFirstLoad && (
          <motion.div
            className={styles.loading}
            exit={{ x: -3000, opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {time > 1 && (
              <div className={styles.leftWrapper}>
                <motion.div
                  className={styles.title}
                  variants={variants.container}
                  initial='hidden'
                  animate='show'
                >
                  <motion.h1 variants={variants.item}>ShaderGradient</motion.h1>
                  <div style={{ lineHeight: 1.2 }}>
                    <motion.h1
                      variants={variants.item}
                      style={{ marginTop: 30 }}
                    >
                      beautiful,
                    </motion.h1>{' '}
                    <motion.h1 variants={variants.item}>
                      customizable,
                    </motion.h1>{' '}
                    <motion.h1 variants={variants.item}>
                      and moving gradients
                    </motion.h1>
                  </div>
                </motion.div>
              </div>
            )}
            {time > 0 && (
              <motion.div
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
              </motion.div>
            )}
          </motion.div>
        )}
    </AnimatePresence>
  )
}
