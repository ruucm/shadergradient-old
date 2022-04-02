import { initialCurrent } from '@shadergradient'
import { motion } from 'framer-motion'
import Lottie from 'react-lottie'
import loadingAnimationData from '../../../media/threelineloading.json'
import styles from './MotionLogo.module.scss'

export function MotionLogo({ color = true, activePreset, loadingPercentage }) {
  const loadingOption = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimationData,
    // animationData: JSON.parse(JSON.stringify(loadingAnimationData)),
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  if (activePreset !== initialCurrent && loadingPercentage < 100)
    return (
      <div className={styles.loadingSpinner}>
        <motion.div className={styles.logoWrapper}>
          <Lottie
            options={loadingOption}
            height={200}
            width={200}
            isClickToPauseDisabled={true}
          />
        </motion.div>
      </div>
    )

  return <></>
}
