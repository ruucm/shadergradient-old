import { Footer } from '@/components/dom/Footer'
import { LazyGradient } from '@/components/dom/LazyGradient'
import { MenuWrapper } from '@/components/dom/MenuWrapper'
import { PreviewSwitch } from '@/components/dom/PreviewSwitch'
import { PreviewWrapper } from '@/components/dom/PreviewWrapper'
import { useUIStore } from '@/helpers/store'
import { motion } from 'framer-motion'
import Link from 'next/link'
import React, { useRef, useState } from 'react'
import { UI, useQueryState } from 'shadergradient'
import styles from '../home/Home.module.scss'
import { MyItem } from '../home/my-item'
import PRESETS from '../presets.json'
import cx from 'classnames'
import { useOnClickOutside } from '@/hooks/use-onclick-outside'

const DOM = () => {
  const mode = useUIStore((state: any) => state.mode)
  const setMode = useUIStore((state: any) => state.setMode)
  const current = useUIStore((state: any) => state.current)
  const setCurrent = useUIStore((state: any) => state.setCurrent)
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
    var body = document.getElementById('__next')
    var canvasElement = body?.getElementsByTagName('canvas')

    if (body?.style && canvasElement[0]?.style) {
      body.style.background = 'black'
      canvasElement[0].style.position = 'static'
    }
  }, [])

  React.useEffect(() => {
    PRESETS[current].title.substring(1, 2)
  }, [current])

  if (embedMode === 'off')
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
              onClick={(e) => {
                e.stopPropagation() // ignore parent click

                activeTab === 'colors'
                  ? setActiveTab('none')
                  : setActiveTab('colors')
              }}
            />

            <UI.ControlTypeTitle
              title='Effects'
              active={activeTab === 'effects'}
              onClick={(e) => {
                e.stopPropagation() // ignore parent click

                activeTab === 'effects'
                  ? setActiveTab('none')
                  : setActiveTab('effects')
              }}
            />

            <UI.ControlTypeTitle
              title='Camera'
              active={activeTab === 'camera'}
              onClick={(e) => {
                e.stopPropagation() // ignore parent click

                activeTab === 'camera'
                  ? setActiveTab('none')
                  : setActiveTab('camera')
              }}
            />
            <PreviewSwitch mode={mode} setMode={setMode} display={!isMobile} />
          </div>

          <div
            className={cx(styles.controlWrapper, 'p-3.5 md:p-4')}
            style={{ padding: activeTab === 'none' ? 0 : null }}
          >
            {activeTab === 'shape' && <UI.ShapeControls />}
            {activeTab === 'colors' && <UI.ColorControls />}
            {activeTab === 'effects' && <UI.EffectControls />}
            {activeTab === 'camera' && <UI.CameraControls />}
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
  else return <></>
}

const Controls = ({ isMobile, children, activeTab, setActiveTab }) => {
  const mode = useUIStore((state: any) => state.mode)
  const setMode = useUIStore((state: any) => state.setMode)

  const ref = useRef(null)
  useOnClickOutside(ref, () => setActiveTab('none'))

  return (
    <div ref={ref} onClick={() => setActiveTab('shape')}>
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
    </div>
  )
}

// canvas components goes here
const R3F = ({ r3f }) => {
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
