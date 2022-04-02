import * as React from 'react'
import { PRESETS } from '@shadergradient'
import { motion } from 'framer-motion'
import { TextAnimation } from '../TextAnimation'
import styles from './PresetTitle.module.scss'
import { useUIStore } from '@/helpers/store'

export function PresetTitle({ color, title, description, index }) {
  const current = useUIStore((state: any) => state.current)
  const setCurrent = useUIStore((state: any) => state.setCurrent)

  return (
    <div className={styles.presetWrapper} style={{}}>
      <div
        className={styles.presetTitle}
        style={{ display: index === current ? 'flex' : 'none' }}
      >
        <TextAnimation
          delay={0}
          font='Lora'
          color={color}
          fontSize={120}
          content={title}
        />
        <div className={styles.slideBtns} style={{ color: color }}>
          <motion.div
            className={styles.slideBtn}
            whileHover={{
              backgroundColor: 'rgba(255,255,255,0.15)',
            }}
            onClick={() => {
              if (current !== 0) {
                setCurrent(current - 1)
              } else {
                setCurrent(PRESETS.length - 1)
              }
            }}
          >
            ↓
          </motion.div>
          <motion.div
            className={styles.slideBtn}
            whileHover={{
              backgroundColor: 'rgba(255,255,255,0.15)',
            }}
            onClick={() => {
              if (current !== PRESETS.length - 1) {
                setCurrent(current + 1)
              } else {
                setCurrent(0)
              }
            }}
          >
            ↑
          </motion.div>
        </div>
      </div>
    </div>
  )
}
