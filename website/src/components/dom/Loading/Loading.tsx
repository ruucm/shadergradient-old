import { useState } from 'react'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import styles from './Loading.module.scss'
import { useInterval } from '@/hooks/useInterval'
import { initialCurrent, initialLoadingTime } from '@/consts'

const title = 'ShaderGradient '
const descript1 = 'beautiful, '
const descript2 = 'customizable, '
const descript3 = 'and moving gradients'

const sentence = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      staggerChildren: 0.04,
    },
  },
}

const letters = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
}

export function Loading({ current, loadingPercentage, referer }) {
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
            exit={{ scale: 4, opacity: 0, filter: 'blur(30px)' }}
            transition={{ duration: 1 }}
          >
            {time > 0 && (
              <div className={styles.leftWrapper}>
                <motion.div
                  className={styles.title}
                  initial='hidden'
                  animate='show'
                >
                  <motion.h1
                    variants={sentence}
                    initial='hidden'
                    animate='visible'
                    onAnimationComplete={(definition) => {
                      console.log('Completed animating', definition)
                    }}
                  >
                    <div style={{ textAlign: 'left' }}>
                      {title.split('').map((char, index) => {
                        return (
                          <motion.span
                            key={char + '-' + index}
                            variants={letters}
                            style={{ display: 'inline-block' }}
                            transition={{ duration: 0.8 }}
                          >
                            {char}
                          </motion.span>
                        )
                      })}
                    </div>
                    {descript1.split('').map((char, index) => {
                      return (
                        <motion.span
                          key={char + '-' + index}
                          variants={letters}
                          style={{ display: 'inline-block' }}
                          transition={{ duration: 0.8 }}
                        >
                          {char}
                        </motion.span>
                      )
                    })}

                    <br />
                    {descript2.split('').map((char, index) => {
                      return (
                        <motion.span
                          key={char + '-' + index}
                          variants={letters}
                          style={{ display: 'inline-block' }}
                          transition={{ duration: 0.8 }}
                        >
                          {char}
                        </motion.span>
                      )
                    })}
                    <br />
                    {descript3.split(' ').map((word, index) => (
                      <span key={word + '-' + index}>
                        <span
                          key={word + '-' + index}
                          style={{ display: 'inline-block' }}
                        >
                          {word.split('').map((char, index) => (
                            <motion.span
                              key={char + '-' + index}
                              variants={letters}
                              style={{
                                display: 'inline-block',
                              }}
                              transition={{ duration: 0.8 }}
                            >
                              {char}
                            </motion.span>
                          ))}
                        </span>
                        <span> </span>
                      </span>
                    ))}
                  </motion.h1>
                </motion.div>
              </div>
            )}
          </motion.div>
        )}
    </AnimatePresence>
  )
}
