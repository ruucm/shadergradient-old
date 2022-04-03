import { useState, useEffect } from 'react'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import styles from '../Loading/Loading.module.scss'

const letterContainerVariants = {
  initial: { transition: { staggerChildren: 0.015 } },
  default: { transition: { staggerChildren: 0.015 } },
  hover: { transition: { staggerChildren: 0.03 } },
}

const letterVariants = {
  initial: {
    opacity: 0,
    y: 20,
    rotate: 0,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 200,
    },
  },
  default: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 200,
    },
  },
  hover: {
    opacity: 1,
    y: -7,
    rotate: 0,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 200,
    },
  },
}

export function TextHover({
  fontSize,
  color,
  referer = '',
  content,
  delay,
  width = null,
  font = null,
}) {
  //   const splitted = referer?.split('/') || []
  const [ref, inView] = useInView()
  const controls = useAnimation()
  const [currentInView, setCurrentInView] = useState(false)

  setTimeout(() => {
    setCurrentInView(true)
  }, delay)
  return (
    <AnimatePresence>
      <motion.div
        style={{
          position: 'relative',
          wordBreak: 'break-word',
          width: width,
          fontFamily: font,
          cursor: 'pointer',
        }}
      >
        <motion.h1
          variants={letterContainerVariants}
          ref={ref}
          initial={'initial'}
          animate={'default'}
          whileHover={'hover'}

          // transition={{ delay: delay }}
        >
          <div style={{ textAlign: 'left', fontSize: fontSize, color: color }}>
            {content.split(' ').map((word: string, wordI: number) => (
              <div
                key={`word-${word}-${wordI}`}
                style={{
                  display: 'inline-block',
                }}
              >
                {Array.from(word).map((letter, index) => (
                  <motion.span
                    key={`${index}-${letter}`}
                    style={{
                      position: 'relative',
                      display: 'inline-block',
                      width: 'auto',
                    }} // Position elements
                    variants={letterVariants}
                    transition={{ duration: 0.5 }}
                  >
                    {letter === ' ' ? '\u00A0' : letter}
                  </motion.span>
                ))}
                {'\u00A0'}
              </div>
            ))}
          </div>
        </motion.h1>
      </motion.div>
    </AnimatePresence>
  )
}
