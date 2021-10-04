import * as React from 'react'
import { motion } from 'framer-motion'
import styles from '../../../pages/home/Home.module.scss'
import animationData from '../../../media/motionlogo-lottie.json'
import animationData_colored from '../../../media/colored-motionlogo.json'
import Lottie from 'react-lottie'

export function MotionLogo({ color }) {
  const whiteLogoOption = {
    loop: true,
    autoplay: true,
    animationData: JSON.parse(JSON.stringify(animationData)),
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  const coloredLogoOption = {
    loop: true,
    autoplay: true,
    animationData: JSON.parse(JSON.stringify(animationData_colored)),
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
  return (
    <motion.div className={styles.logoWrapper}>
      <Lottie
        options={color === true ? coloredLogoOption : whiteLogoOption}
        height={80}
        width={80}
      />
    </motion.div>
  )
}

MotionLogo.defaultProps = {}
