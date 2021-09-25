import { Environment } from '@react-three/drei'
import { motion, useAnimation, useMotionValue } from 'framer-motion'
import { FormContext } from '@/helpers/form-provider'

import { Gradient, UI } from 'shadergradient'
import React, { useState, useContext } from 'react'

import styles from '../home/Home.module.scss'
import PRESETS from '../presets.json'

import { MyItem } from '../home/my-item'
import { ControlsTab } from './controlsTab'
import { PreviewSwitch } from '@/components/dom/PreviewSwitch'
import { PreviewWrapper } from '@/components/dom/PreviewWrapper'
import { MenuWrapper } from '@/components/dom/MenuWrapper'
import { Footer } from '@/components/dom/Footer'

import { act } from '@react-three/fiber'

const Page = () => {
  const ctx: any = useContext(FormContext)

  const [mode, setMode] = React.useState('full')
  const [current, setCurrent] = React.useState(0)
  const [activeTab, setActiveTab] = useState('none')

  const {
    type,
    animate,
    movements,
    speed,
    bumpScale,
    rotationX,
    rotationY,
    rotationZ,
    cameraPositionX,
    cameraPositionY,
    cameraPositionZ,
    cameraQuaternionX,
    cameraQuaternionY,
    cameraQuaternionZ,
    cameraZoom,
  }: any = ctx?.watch()

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
        mode={mode}
        setMode={setMode}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <PreviewWrapper mode={mode} setMode={setMode} />

      {/* Current Preset */}
      <div
        className={styles.slider}
        style={{ color: mode === 'full' ? PRESETS[current].color : '#FF430A' }}
      >
        <div className={styles.sliderHeader}>
          <p>Current Theme</p>
        </div>
        <div
          className={styles.sliderWrapper}
          style={{
            width: 'fit-content',
            display: 'flex',
          }}
        >
          <MyItem
            color={mode === 'full' ? PRESETS[current].color : '#FF430A'}
            onClick={{}}
            visible={{}}
          >
            {current < 10 ? '0' + current.toString() : current.toString()}{' '}
            {PRESETS[current].title}
          </MyItem>
          <div className={styles.slideBtns}>
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
          </div>
        </div>
      </div>

      <Footer />

      <Gradient
        r3f
        environment={<Environment preset='city' background={false} />}
        lights={null}
        rotation={[(Math.PI / 3) * 2, 0, (Math.PI / 7) * 12]}
        // cameraPosition={{ x: 0, y: 1.7, z: 4 }}
        // cameraQuaternion={{ x: -Math.PI / 6, y: 0, z: 0 }}
        // cameraZoom={mode !== 'about' ? 2.2 : 0.4}

        cameraRotation={{ x: 0, y: 0, z: 0 }}
        cameraPosition={{
          x: cameraPositionX,
          y: cameraPositionY,
          z: cameraPositionZ,
        }}
        cameraQuaternion={{
          x: cameraQuaternionX,
          y: cameraQuaternionY,
          z: cameraQuaternionZ,
        }}
        type={PRESETS[current].type}
        animate={animate === 'on'}
        cameraZoom={PRESETS[current].zoom}
        uTime={movements}
      />
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

function Controls({ mode, setMode, activeTab, setActiveTab }) {
  return (
    <MenuWrapper
      mode={mode}
      setMode={setMode}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    >
      <div className={styles.menuItems}>
        <UI.ControlTypeTitle
          title='Shape'
          active={activeTab === 'shape'}
          onClick={() => {
            activeTab === 'shape' ? setActiveTab('none') : setActiveTab('shape')
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
          title='Light'
          active={activeTab === 'light'}
          onClick={() => {
            activeTab === 'light' ? setActiveTab('none') : setActiveTab('light')
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
        <PreviewSwitch mode={mode} setMode={setMode} />
      </div>

      <div className={styles.controlWrapper}>
        {activeTab === 'shape' && (
          <UI.ShapeControls FormContext={FormContext} />
        )}
        {activeTab === 'camera' && (
          <UI.CameraControls FormContext={FormContext} />
        )}
      </div>
    </MenuWrapper>
  )
}
