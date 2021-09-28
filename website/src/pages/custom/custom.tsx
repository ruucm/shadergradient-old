import { Environment } from '@react-three/drei'
import { motion } from 'framer-motion'

import { Gradient, UI } from 'shadergradient'
import { useUIStore } from '@/helpers/store'

import React, { useState, useEffect } from 'react'
import { updateGradientState } from '@/helpers/store'
import useQueryState from '@/hooks/useQueryState'

import styles from '../home/Home.module.scss'
import PRESETS from '../presets.json'

import { MyItem } from '../home/my-item'
import { ControlsTab } from './controlsTab'
import { PreviewSwitch } from '@/components/dom/PreviewSwitch'
import { PreviewWrapper } from '@/components/dom/PreviewWrapper'
import { MenuWrapper } from '@/components/dom/MenuWrapper'
import { Footer } from '@/components/dom/Footer'

import { act } from '@react-three/fiber'
var hideBtnAnim
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
    // const zoomMotion = () => animate(zoom, 0.4, { duration: 1 })
    // zoomMotion()
    // console.log(zoom)
  }, [])

  React.useEffect(() => {
    PRESETS[current].title.substring(1, 2)
  }, [current])

  return (
    <>
      {/* Go Back */}
      <div className={styles.content}>
        <motion.a href='/' style={{ color: PRESETS[current].color }}>
          ← ShaderGradient
        </motion.a>
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
            // display: 'flex',
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

  // shape
  const [type] = useQueryState('type')
  const [animate] = useQueryState('animate')
  const [uTime] = useQueryState('uTime')
  const [uSpeed] = useQueryState('uSpeed')
  const [uStrength] = useQueryState('uStrength')
  const [rotationX] = useQueryState('rotationX')
  const [rotationY] = useQueryState('rotationY')
  const [rotationZ] = useQueryState('rotationZ')

  // camera
  const [cameraZoom] = useQueryState('cameraZoom')
  const [cameraPositionX] = useQueryState('cameraPositionX')
  const [cameraPositionY] = useQueryState('cameraPositionY')
  const [cameraPositionZ] = useQueryState('cameraPositionZ')

  // colors
  const [color1] = useQueryState('color1')
  const [color2] = useQueryState('color2')
  const [color3] = useQueryState('color3')

  return (
    <>
      {/* <Gradient
        environment={<Environment preset='city' background={false} />}
        lights={null}
        rotation={[(Math.PI / 3) * 2, 0, (Math.PI / 7) * 12]}
        cameraPosition={{ x: 0, y: 1.7, z: 4 }}
        // cameraRotation={{ x: 0, y: 0, z: 0 }}
        cameraQuaternion={{ x: -Math.PI / 6, y: 0, z: 0 }}
        cameraZoom={2.2}
        animate={true}
        // @ts-ignore
        type={PRESETS[current].type}
      /> */}
      <Gradient
        r3f
        // environment={<Environment preset='city' background={false} />}
        rotation={[
          (rotationX / 360) * Math.PI,
          (rotationY / 360) * Math.PI,
          (rotationZ / 360) * Math.PI,
        ]}
        cameraPosition={{
          x: cameraPositionX,
          y: cameraPositionY,
          z: cameraPositionZ,
        }}
        cameraRotation={{ x: 0, y: 0, z: 0 }}
        animate={animate === 'on'}
        cameraZoom={PRESETS[current].zoom}
        uTime={uTime}
        uStrength={uStrength}
        uSpeed={uSpeed}
        colors={[color1, color2, color3]}
        // @ts-ignore
        type={PRESETS[current].type}
      />
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
