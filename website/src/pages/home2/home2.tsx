import React, { useEffect, useRef, useState } from 'react'
import { PRESETS } from '@shadergradient'
import { motion } from 'framer-motion'
import Link from 'next/link'

import styles from './Home.module.scss'
import { GradientScene } from '@/components/canvas/GradientScene'
import { Links } from '@/components/dom/Links'
import { PresetTitle } from '@/components/dom/PresetTitle'
import { PreviewBtn } from '@/components/dom/PreviewBtn'
import { PreviewWrapper } from '@/components/dom/PreviewBtn/PreviewWrapper'
import { TextAnimation, TextHover } from '@/components/dom/TextAnimation'
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
    <>
      <PreviewWrapper mode={mode} setMode={setMode} />

      <div className={styles.contentWrapper}>
        <div className={styles.header}>
          <TextLogo
            color={mode !== 'full' ? '#FF430A' : PRESETS[current].color}
          />
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
            It's made with lines of codes, so you can create your own with just
            a few clicks.
          </div>
          <div className={styles.customizeBtnWrapper}>
            <Link href='/customize2'>
              <motion.div
                className={styles.customizeBtn}
                style={{
                  color: PRESETS[current].color,
                  borderBottom: '2px solid ' + PRESETS[current].color,
                }}
              >
                <TextHover
                  fontSize={20}
                  color={PRESETS[current].color}
                  content='Try it by yourself →'
                  delay={0}
                />
              </motion.div>
            </Link>
          </div>
          <Links color={PRESETS[current].color} />
        </div>
        <div className={styles.footer}>
          <PreviewBtn
            mode={mode}
            setMode={setMode}
            color={mode !== 'full' ? '#FF430A' : PRESETS[current].color}
          />
        </div>
      </div>
    </>
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
      title: 'ShaderGradient',
    },
  }
}
