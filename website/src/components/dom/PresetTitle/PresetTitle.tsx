import * as React from 'react'
import { PRESETS, useUIStore } from '@shadergradient'
import { motion } from 'framer-motion'
import { TextAnimation } from '../TextAnimation'
import styles from './PresetTitle.module.scss'
// import { useUIStore } from '@/helpers/store'

export function PresetTitle({
  color,
  title,
  description,
  index,
  size = 'big',
}) {
  const activePreset = useUIStore((state) => state.activePreset)
  const setActivePreset = useUIStore((state) => state.setActivePreset)

  return (
    <div className={styles.presetWrapper} style={{}}>
      <div
        className={styles.presetTitle}
        style={{ display: index === activePreset ? 'flex' : 'none' }}
      >
        <TextAnimation
          delay={0}
          font='"Lora", serif'
          color={color}
          fontSize={size === 'big' ? 120 : 50}
          content={title}
        />
        <div className={styles.slideBtns} style={{ color: color }}>
          <motion.div
            className={styles.slideBtn}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{
              backgroundColor: 'rgba(255,255,255,0.15)',
            }}
            onClick={() => {
              if (activePreset !== 0) {
                setActivePreset(activePreset - 1)
              } else {
                setActivePreset(PRESETS.length - 1)
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
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => {
              if (activePreset !== PRESETS.length - 1) {
                setActivePreset(activePreset + 1)
              } else {
                setActivePreset(0)
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
