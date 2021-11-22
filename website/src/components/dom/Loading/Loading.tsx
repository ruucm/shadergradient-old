import * as React from 'react'
import { motion } from 'framer-motion'
import styles from '../../../pages/home/Home.module.scss'

export function Loading() {
  return <motion.div className={styles.loading}>loading</motion.div>
}

Loading.defaultProps = {}
