import { Footer } from '@/components/dom/Footer'
import { GradientScene } from '@/components/canvas/GradientScene'
import { PreviewWrapper } from '@/components/dom/PreviewWrapper'
import { PreviewSwitch } from '@/components/dom/PreviewSwitch'
import { MotionLogo } from '@/components/dom/MotionLogo'

import { useUIStore } from '@/helpers/store'
import { motion } from 'framer-motion'
import Link from 'next/link'
import React, { useState } from 'react'
import { useQueryState } from 'shadergradient'
import styles from '../home/Home.module.scss'
import { MyItem } from '../home/my-item'
import PRESETS from '../presets.json'
import { Controls } from './comps/Controls'

const DOM = () => {
  const mode = useUIStore((state: any) => state.mode)
  const setMode = useUIStore((state: any) => state.setMode)
  const current = useUIStore((state: any) => state.current)
  const setCurrent = useUIStore((state: any) => state.setCurrent)
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

  // create an event listener
  React.useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    setMode('full')
  }, [])

  React.useEffect(() => {
    PRESETS[current].title.substring(1, 2)
  }, [current])

  if (embedMode === 'off')
    return (
      <>
        {loadingPercentage < 100 && (
          <div className={styles.loadingSpinner}>
            <MotionLogo color={false} />
          </div>
        )}
        <div
          className={styles.bodyWrapper}
          style={{ opacity: loadingPercentage < 100 ? 0.1 : 1 }}
        >
          {/* Go Back */}
          <div className={styles.content}>
            <motion.div style={{ color: PRESETS[current].color }}>
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
              color: mode === 'full' ? PRESETS[current].color : '#FF430A',
              top: isMobile ? '10vh' : null,
            }}
          >
            {/* <div className={styles.sliderHeader}>
            <p>Current Theme</p>
          </div> */}
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
                    style={{ display: current === index ? 'block' : 'none' }}
                  >
                    <MyItem
                      color={
                        mode === 'full' ? PRESETS[current].color : '#FF430A'
                      }
                      onClick={() => {}}
                      visible={current === index}
                      isMobile={isMobile}
                    >
                      {index < 10 ? '0' + index.toString() : index.toString()}{' '}
                      {PRESETS[index].title}
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
                    if (current !== 0) {
                      setCurrent(current - 1)
                    } else {
                      setCurrent(PRESETS.length - 1)
                    }
                    console.log(current)
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
                    if (current !== PRESETS.length - 1) {
                      setCurrent(current + 1)
                    } else {
                      setCurrent(0)
                    }
                    console.log(current)
                  }}
                >
                  ↑
                </motion.div>
              </div>
            </div>
          </div>

          <Footer style={{ color: PRESETS[current].color }} />
        </div>
      </>
    )
  else return <></>
}

// canvas components goes here
const R3F = ({ r3f }) => {
  return (
    <>
      <GradientScene r3f />
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
