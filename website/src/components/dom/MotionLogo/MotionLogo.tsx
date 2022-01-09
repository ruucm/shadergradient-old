import { motion } from "framer-motion"
import styles from "./MotionLogo.module.scss"
import loadingAnimationData from "../../../media/threelineloading.json"

import Lottie from "react-lottie"
import { initialCurrent } from "@/consts"

export function MotionLogo({ color = true, current, loadingPercentage }) {
  const loadingOption = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimationData,
    // animationData: JSON.parse(JSON.stringify(loadingAnimationData)),
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  }

  if (current !== initialCurrent && loadingPercentage < 100)
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
