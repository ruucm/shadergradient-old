import React, { useEffect, useState } from 'react'
import { PRESETS, useUIStore, GradientWithQueries } from '@shadergradient'
import { motion } from 'framer-motion'
import Link from 'next/link'

import styles from './Home.module.scss'
import { AboutBtn } from '@/components/dom/AboutBtn'
import { Links } from '@/components/dom/Links'
import { PresetTitle } from '@/components/dom/PresetTitle'
import { PreviewBtn } from '@/components/dom/PreviewBtn'
import { PreviewWrapper } from '@/components/dom/PreviewBtn/PreviewWrapper'
import { TextHover } from '@/components/dom/TextAnimation'
import { TextLogo } from '@/components/dom/TextLogo'

const DOM = () => {
  const mode = useUIStore((state: any) => state.mode)
  const setMode = useUIStore((state: any) => state.setMode)
  const loadingPercentage = useUIStore((state: any) => state.loadingPercentage)
  const activePreset = useUIStore((state) => state.activePreset)
  const setActivePreset = useUIStore((state) => state.setActivePreset)
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
            color={mode !== 'full' ? '#FF430A' : PRESETS[activePreset].color}
          />
          <AboutBtn
            color={mode !== 'full' ? '#FF430A' : PRESETS[activePreset].color}
          />
        </div>
        <div
          className={styles.content}
          style={{ display: mode === 'full' ? 'block' : 'none' }}
        >
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
                  size='big'
                ></PresetTitle>
              )
            })}
          </div>

          <div
            className={styles.paragraph}
            style={{ color: PRESETS[activePreset].color }}
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
                  color: PRESETS[activePreset].color,
                  borderBottom: '2px solid ' + PRESETS[activePreset].color,
                }}
              >
                <TextHover
                  fontSize={20}
                  color={PRESETS[activePreset].color}
                  content='Try it by yourself →'
                  delay={0}
                />
              </motion.div>
            </Link>
          </div>
          <Links color={PRESETS[activePreset].color} />
        </div>
        <div className={styles.footer}>
          <PreviewBtn
            mode={mode}
            setMode={setMode}
            color={mode !== 'full' ? '#FF430A' : PRESETS[activePreset].color}
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
      <GradientWithQueries r3f />
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
