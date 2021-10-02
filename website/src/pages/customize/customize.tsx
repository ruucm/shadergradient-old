import { motion } from 'framer-motion'
import Link from 'next/link'

import { UI } from 'shadergradient'
import { useUIStore } from '@/helpers/store'

import React, { useState, useEffect } from 'react'
import { updateGradientState } from '@/helpers/store'
import useQueryState from '@/hooks/useQueryState'

import styles from '../home/Home.module.scss'
import PRESETS from '../presets.json'

import { MyItem } from '../home/my-item'
import { PreviewSwitch } from '@/components/dom/PreviewSwitch'
import { PreviewWrapper } from '@/components/dom/PreviewWrapper'
import { MenuWrapper } from '@/components/dom/MenuWrapper'
import { Footer } from '@/components/dom/Footer'
import { LazyGradient } from '@/components/dom/LazyGradient'

const DOM = () => {
  const mode = useUIStore((state: any) => state.mode)
  const setMode = useUIStore((state: any) => state.setMode)
  const current = useUIStore((state: any) => state.current)
  const setCurrent = useUIStore((state: any) => state.setCurrent)
  const [isMobile, setIsMobile] = React.useState(false)
  const [activeTab, setActiveTab] = useState('none')

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
    var body = document.getElementById('__next')
    body.style.background = 'black'
    var canvasElement = body.getElementsByTagName('canvas')
    canvasElement[0].style.position = 'static'
  }, [])

  React.useEffect(() => {
    PRESETS[current].title.substring(1, 2)
  }, [current])

  return (
    <>
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
      >
        <div className={styles.menuItems}>
          <UI.ControlTypeTitle
            title='Shape'
            active={activeTab === 'shape'}
            onClick={() => {
              activeTab === 'shape'
                ? setActiveTab('none')
                : setActiveTab('shape')
            }}
          />

          <UI.ControlTypeTitle
            title='Colors'
            active={activeTab === 'colors'}
            onClick={() => {
              activeTab === 'colors'
                ? setActiveTab('none')
                : setActiveTab('colors')
            }}
          />

          <UI.ControlTypeTitle
            title='Effects'
            active={activeTab === 'effects'}
            onClick={() => {
              activeTab === 'effects'
                ? setActiveTab('none')
                : setActiveTab('effects')
            }}
          />

          <UI.ControlTypeTitle
            title='Camera'
            active={activeTab === 'camera'}
            onClick={() => {
              activeTab === 'camera'
                ? setActiveTab('none')
                : setActiveTab('camera')
            }}
          />
          <PreviewSwitch mode={mode} setMode={setMode} display={!isMobile} />
        </div>

        <div
          className={styles.controlWrapper}
          style={{ padding: activeTab === 'none' ? 0 : null }}
        >
          {activeTab === 'shape' && (
            <UI.ShapeControls useQueryState={useQueryState} />
          )}
          {activeTab === 'colors' && (
            <UI.ColorControls useQueryState={useQueryState} />
          )}
          {activeTab === 'effects' && (
            <UI.EffectControls useQueryState={useQueryState} />
          )}
          {activeTab === 'camera' && (
            <UI.CameraControls useQueryState={useQueryState} />
          )}
        </div>
      </Controls>
      <PreviewWrapper mode={mode} setMode={setMode} />

      {/* Current Preset */}
      <div
        className={styles.slider}
        style={{
          color: mode === 'full' ? PRESETS[current].color : '#FF430A',
          top: isMobile ? '10vh' : null,
        }}
      >
        <div className={styles.sliderHeader}>
          <p>Current Theme</p>
        </div>
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
                  color={PRESETS[current].color}
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
              className={styles.slideDown}
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
              className={styles.slideUp}
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

      <Footer />
    </>
  )
}

const Controls = ({ isMobile, children, activeTab, setActiveTab }) => {
  const mode = useUIStore((state: any) => state.mode)
  const setMode = useUIStore((state: any) => state.setMode)

  return (
    <>
      {isMobile === true ? (
        <div className={styles.controlMobile}>
          <motion.div
            className={styles.hideBtn}
            onClick={() => {
              setActiveTab('none')
            }}
            animate={{
              opacity: activeTab === 'none' ? 0 : 1,
              marginTop: activeTab === 'none' ? '5px' : '-35px',
              transition: { duration: 0.5 },
            }}
          >
            <div>
              <p>✕</p>
            </div>
          </motion.div>
          {children}
        </div>
      ) : (
        <MenuWrapper
          mode={mode}
          setMode={setMode}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        >
          {children}
        </MenuWrapper>
      )}
    </>
  )
}

// canvas components goes here
const R3F = ({ r3f }) => {
  const current = useUIStore((state: any) => state.current)

  useEffect(() => {
    // update Gradient if there are query params (history nav)
    window.location.search && updateGradientState(window.location.search)
    document.documentElement.classList.add('remix')
    return () => {
      document.documentElement.classList.remove('remix')
    }
  }, [])

  useEffect(() => {
    updateGradientState(PRESETS[current].url)
  }, [current])

  // shape
  const [type] = useQueryState('type')
  const [animate] = useQueryState('animate')
  const [uTime] = useQueryState('uTime')
  const [uSpeed] = useQueryState('uSpeed')
  const [uStrength] = useQueryState('uStrength')
  const [rotationX] = useQueryState('rotationX')
  const [rotationY] = useQueryState('rotationY')
  const [rotationZ] = useQueryState('rotationZ')

  // colors
  const [color1] = useQueryState('color1')
  const [color2] = useQueryState('color2')
  const [color3] = useQueryState('color3')

  // effects
  const [grain] = useQueryState('grain')
  const [lightType] = useQueryState('lightType')
  const [envPreset] = useQueryState('envPreset')
  const [reflection] = useQueryState('reflection')
  const [brightness] = useQueryState('brightness')

  // camera
  const [cameraZoom] = useQueryState('cameraZoom')
  const [cameraPositionX] = useQueryState('cameraPositionX')
  const [cameraPositionY] = useQueryState('cameraPositionY')
  const [cameraPositionZ] = useQueryState('cameraPositionZ')

  return (
    <>
      <LazyGradient r3f />
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
      title: 'Shader Gradient',
    },
  }
}
