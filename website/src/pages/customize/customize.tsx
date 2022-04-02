import React, { useState } from 'react'
import { useQueryState, PRESETS, useUIStore } from '@shadergradient'
import { motion } from 'framer-motion'
import Link from 'next/link'
import styles from '../home/Home.module.scss'
import { MyItem } from '../home/my-item'
import { Controls } from './comps/Controls'
import { GradientScene } from '@/components/canvas/GradientScene'
import { Footer } from '@/components/dom/Footer'
import { PreviewWrapper } from '@/components/dom/PreviewWrapper'

const DOM = () => {
  const mode = useUIStore((state: any) => state.mode)
  const setMode = useUIStore((state: any) => state.setMode)
  const activePreset = useUIStore((state: any) => state.activePreset)

  const setActivePreset = useUIStore((state: any) => state.setActivePreset)
  const loadingPercentage = useUIStore((state: any) => state.loadingPercentage)

  const [isMobile, setIsMobile] = React.useState(false)
  const [activeTab, setActiveTab] = useState('none')

  // for embeds
  const [embedMode] = useQueryState('embedMode')

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 641) {
      setIsMobile(true)
      setActiveTab('shape')
    } else {
      setIsMobile(false)
    }
  }
  const appHeight = () => {
    const doc = document.documentElement
    doc.style.setProperty('--app-height', `${window.innerHeight}px`)
  }

  // create an event listener
  React.useEffect(() => {
    handleResize()
    appHeight()

    window.addEventListener('resize', handleResize)
    window.addEventListener('resize', appHeight)
    setMode('full')
  }, [])

  React.useEffect(() => {
    PRESETS[activePreset].title.substring(1, 2)
  }, [activePreset])

  if (embedMode === 'off')
    return (
      <>
        <div className={styles.bodyWrapper}>
          {/* Go Back */}
          <div className={styles.content}>
            <motion.div style={{ color: PRESETS[activePreset].color }}>
              <Link href='/'> ← ShaderGradient</Link>
            </motion.div>
          </div>

          {/* Property menu */}
          <Controls
            isMobile={isMobile}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          {isMobile ? null : <PreviewWrapper mode={mode} setMode={setMode} />}

          {/* Current Preset */}
          <div
            className={styles.slider}
            style={{
              color: mode === 'full' ? PRESETS[activePreset].color : '#FF430A',
              top: isMobile ? '10vh' : null,
            }}
          >
            <div
              className={styles.sliderWrapper}
              style={{
                width: 'fit-content',
              }}
            >
              {PRESETS.map((item, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      display: activePreset === index ? 'block' : 'none',
                    }}
                  >
                    <MyItem
                      color={
                        mode === 'full'
                          ? PRESETS[activePreset].color
                          : '#FF430A'
                      }
                      onClick={() => void 0}
                      visible={activePreset === index}
                      isMobile={isMobile}
                      index={index}
                    >
                      {index < 10
                        ? '0' + index.toString() + ' ' + PRESETS[index].title
                        : index.toString() + ' ' + PRESETS[index].title}
                    </MyItem>
                  </div>
                )
              })}
              <div className={styles.slideBtns}>
                <motion.div
                  className={styles.slideBtn}
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

          <Footer color={PRESETS[activePreset].color} />
        </div>
      </>
    )
  else return <></>
}

// canvas components goes here
const R3F = ({ r3f }) => {
  return (
    <>
      <GradientScene />
    </>
  )
}

const Page = () => {
  return (
    <>
      <DOM />
      <R3F r3f />
    </>
  )
}

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'Shader Gradient ─ Customize',
    },
  }
}
