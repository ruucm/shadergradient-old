import React, { useEffect, useRef, useState } from 'react'
import { PRESETS } from '@shadergradient'
import { motion } from 'framer-motion'
import Link from 'next/link'

import styles from './Home.module.scss'
import { GradientScene } from '@/components/canvas/GradientScene'
import { Links } from '@/components/dom/Links'
import { PresetTitle } from '@/components/dom/PresetTitle'
import { TextAnimation } from '@/components/dom/TextAnimation'
import { TextLogo } from '@/components/dom/TextLogo'

import { useUIStore } from '@/helpers/store'

const DOM = () => {
  const mode = useUIStore((state: any) => state.mode)
  const setMode = useUIStore((state: any) => state.setMode)
  const current = useUIStore((state: any) => state.current)
  const loadingPercentage = useUIStore((state: any) => state.loadingPercentage)
  const setCurrent = useUIStore((state: any) => state.setCurrent)

  const [isMobile, setIsMobile] = useState(false)

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 641) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }

  // create an event listener
  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    setMode('full')
  }, [])

  console.log('loadingPercentage', loadingPercentage)
  return (
    <div className={styles.contentWrapper}>
      <div className={styles.header}>
        <TextLogo />
      </div>
      <div className={styles.content}>
        <div className={styles.presetTitleWrapper}>
          {PRESETS.map((item, index) => {
            return (
              <PresetTitle
                index={index}
                color={item.color}
                key={index}
                title={
                  index < 10
                    ? '0' + index.toString() + ' ' + item.title
                    : index.toString() + ' ' + item.title
                }
                description={''}
              ></PresetTitle>
            )
          })}
        </div>

        <div
          className={styles.paragraph}
          style={{ color: PRESETS[current].color }}
        >
          All visuals are created with ShaderGradient,
          <br /> a new way of creating beautiful, moving gradients. <br />
          It's made with lines of codes, so you can create your own with just a
          few clicks.
        </div>
        <div className={styles.customizeBtnWrapper}>
          <motion.div
            className={styles.customizeBtn}
            style={{
              color: PRESETS[current].color,
              borderBottom: '2px solid ' + PRESETS[current].color,
            }}
          >
            <Link href=''>Try it by yourself →</Link>
          </motion.div>
        </div>
        <Links color={PRESETS[current].color} />
      </div>
      <div className={styles.footer}></div>
    </div>
  )
}

const Page = () => {
  return (
    <>
      <DOM />
      <GradientScene r3f />
    </>
  )
}

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'Index',
    },
  }
}
