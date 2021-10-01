import { motion, useAnimation, animate } from 'framer-motion'
import Link from 'next/link'
import { Environment } from '@react-three/drei'

import React, { useEffect, useRef, Suspense, lazy } from 'react'
import {
  SnapItem,
  SnapList,
  useDragToScroll,
  useScroll,
  useVisibleElements,
} from 'react-snaplist-carousel'
// import { Gradient } from 'shadergradient'
import { useUIStore } from '@/helpers/store'
import Lottie from 'react-lottie'
import * as animationData from '@/media/motionlogo-lottie.json'

import styles from './Home.module.scss'
import PRESETS from '../presets.json'

import { MyItem } from './my-item'
import { MenuItem } from './menu-item'
import { PreviewSwitch } from '@/components/dom/PreviewSwitch'
import { PreviewWrapper } from '@/components/dom/PreviewWrapper'
import { MenuWrapper } from '@/components/dom/MenuWrapper'
import { Footer } from '@/components/dom/Footer'
import { Loading } from '@/components/dom/Loading'
import { LazyGradient } from '@/components/dom/LazyGradient/LazyGradient'
const DOM = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
  const mode = useUIStore((state: any) => state.mode)
  const setMode = useUIStore((state: any) => state.setMode)
  const current = useUIStore((state: any) => state.current)
  const setCurrent = useUIStore((state: any) => state.setCurrent)

  const snapList = useRef(null)

  // const current = useVisibleElements(
  //   { debounce: 10, ref: snapList },
  //   ([element]) => element
  // )
  // // sync current state with the store
  // useEffect(() => {
  //   setCurrent(current)
  // }, [current])

  const [isMobile, setIsMobile] = React.useState(false)

  const goToSnapItem = useScroll({ ref: snapList })
  const itemGap = '40px'

  const { isDragging } = useDragToScroll({ ref: snapList })

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 641) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }

  // create an event listener
  React.useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
  }, [])

  return (
    <>
      {/* Menu */}
      {isMobile === true ? null : (
        <MenuWrapper mode={mode}>
          <div className={styles.menuItems}>
            <motion.div
              className='font-medium text-primary text-xl'
              initial={{ paddingLeft: 0 }}
              whileHover={{
                paddingLeft: 7,
                transition: { duration: 0.3 },
              }}
              style={{
                color: '#ff430a',
                lineHeight: '1.7em',
                fontWeight: 500,
              }}
              onClick={() => {
                if (mode !== 'about') {
                  setMode('about')
                } else {
                  setMode('full')
                }
              }}
            >
              <Link href='/about'>About →</Link>
            </motion.div>
            <MenuItem title='Figma →' link='' />
            <MenuItem
              title='Git →'
              link='https://www.npmjs.com/package/shadergradient'
            />
            <MenuItem title='Framer →' link='' />
            <PreviewSwitch mode={mode} setMode={setMode} />
          </div>
        </MenuWrapper>
      )}

      {/* Home */}
      <motion.div
        className={styles.bodyWrapper}
        style={{
          color: mode === 'full' ? PRESETS[current].color : '#FF430A',
          display: 'block',
        }}
      >
        <div className={styles.leftWrapper}>
          <motion.div className={styles.logoWrapper}>
            <Lottie options={defaultOptions} height={80} width={80} />
          </motion.div>
          <motion.div
            className={styles.title}
            style={{ display: mode !== 'full' ? 'none' : 'block' }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
            >
              ShaderGradient
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: 1, duration: 1 },
              }}
            >
              No more static gradients.
              <br />
              Add liveliness in your products.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: 1.5, duration: 1 },
              }}
              style={{ fontSize: 12, width: '25vw', marginTop: '50px' }}
            >
              Customizable gradient tool inspired by natural lights and
              atmospheres. Made with WebGL shaders.
              <br />
              <br /> Fully supported on Chrome. Sorry Safari.
            </motion.p>

            {isMobile === true ? (
              <div
                className={styles.mobileOnly}
                style={{ color: PRESETS[current].color }}
              >
                <Link href='/about'>→ about</Link>
                <Link href='/custom'>→ customize</Link>
              </div>
            ) : null}
          </motion.div>

          {/* Preset Slider */}
          <motion.div
            className={styles.slider}
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 2, transition: 2 },
            }}
          >
            <div className={styles.sliderHeader}>
              <p>Current Theme</p>
              <Link href='/custom'>→ Customize </Link>
            </div>
            <div
              className={styles.sliderWrapper}
              style={{
                borderBottom:
                  mode === 'full'
                    ? '2px solid ' + PRESETS[current].color
                    : '2px solid #FF430A',
              }}
            >
              <SnapList
                ref={snapList}
                direction={isMobile ? 'vertical' : 'horizontal'}
              >
                {PRESETS.map((item, index) => {
                  return (
                    <SnapItem
                      key={index}
                      margin={{
                        left: isMobile ? '0px' : itemGap,
                        right: isMobile ? '0px' : itemGap,
                      }}
                      snapAlign={isMobile ? 'end' : 'start'}
                    >
                      <MyItem
                        onClick={() => {
                          goToSnapItem(index)
                          setCurrent(index)
                          console.log(index, current)
                        }}
                        visible={current === index}
                        color={
                          mode === 'full' ? PRESETS[current].color : '#FF430A'
                        }
                        isMobile={isMobile}
                      >
                        {index < 10 ? '0' + index.toString() : index.toString()}{' '}
                        {item.title}
                      </MyItem>
                    </SnapItem>
                  )
                })}
                <SnapItem
                  margin={{ left: itemGap, right: '70vw' }}
                  snapAlign='start'
                >
                  <button
                    style={{ display: isMobile ? 'none' : 'block' }}
                    onClick={() => {
                      goToSnapItem(0)
                    }}
                  >
                    ←
                  </button>
                </SnapItem>
              </SnapList>
            </div>
          </motion.div>
        </div>
      </motion.div>
      <Footer />

      <PreviewWrapper mode={mode} setMode={setMode} />
    </>
  )
}

const Page = () => {
  const [load, setLoad] = React.useState(false)
  const [delayed, setDelayed] = React.useState(false)

  const delayRender = async (delay) => {
    setTimeout(() => {
      setDelayed(true)
      console.log(delayed)
    }, delay)

    const loadGradient = await import('../../components/dom/LazyGradient')
    setLoad(true)
  }
  React.useEffect(() => {
    delayRender(10000)
  }, [])

  return (
    <>
      <DOM />
      {/* <R3F r3f /> */}
      <Loading over={load === true && delayed == true} />

      {load === true && delayed === true ? <LazyGradient r3f /> : null}
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
