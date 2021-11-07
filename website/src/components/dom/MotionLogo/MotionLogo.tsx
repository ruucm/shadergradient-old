import * as React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import styles from '../../../pages/home/Home.module.scss'
import animationData from '../../../media/motionlogo-lottie.json'
import loadingAnimationData from '../../../media/threelineloading.json'

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

  const loadingOption = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimationData,
    // animationData: JSON.parse(JSON.stringify(loadingAnimationData)),
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
        options={loadingOption}
        height={200}
        width={200}
        isClickToPauseDisabled={true}
      />
      {/* loading */}
    </motion.div>
  )
}

MotionLogo.defaultProps = {}
