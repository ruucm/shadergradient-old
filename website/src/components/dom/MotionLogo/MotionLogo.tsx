import * as React from 'react'
import { motion } from 'framer-motion'

import styles from '../../../pages/home/Home.module.scss'
import animationData from '../../../media/motionlogo-lottie.json'
import animationData_colored from '../../../media/colored-motionlogo.json'
import Lottie from 'react-lottie'

export function MotionLogo() {
  const whiteLogoOption = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  const coloredLogoOption = {
    loop: true,
    autoplay: true,
    animationData: animationData_colored,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        zIndex: 0,
      }}
    ></div>
  )
}

MotionLogo.defaultProps = {}
