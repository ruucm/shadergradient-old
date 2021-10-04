import { motion } from 'framer-motion'
import Link from 'next/link'

import React, { useEffect, useRef, useState } from 'react'
import {
  SnapItem,
  SnapList,
  useDragToScroll,
  useScroll,
} from 'react-snaplist-carousel'
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
import { LazyGradient } from '@/components/dom/LazyGradient'

import noiseTest from '../../../public/img/noise-test.png'

const DOM = () => {
  // for logo animation
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

  const [isMobile, setIsMobile] = useState(false)

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
  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    setMode('full')
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
              Beautiful, customizable, and moving gradient component, available
              as React component, Figma plugin, and Framer package (beta). Made
              with WebGL shaders.
              <br />
              <br /> Fully supported on Chrome.
            </motion.p>

            {isMobile === true ? (
              <motion.div
                className={styles.mobileOnly}
                style={{ color: PRESETS[current].color }}
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 1.5, transition: 2 },
                }}
              >
                <Link href='/about'>→ about</Link>
                <Link href='/customize'>→ customize</Link>
              </motion.div>
            ) : null}
          </motion.div>

          {/* Preset Slider */}
          <motion.div
            className={styles.slider}
            style={{
              display: mode === 'about' ? 'none' : 'block',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 2, transition: 2 },
            }}
          >
            <div className={styles.sliderHeader}>
              <p>Current Theme</p>
              <Link href='/customize'>→ Customize </Link>
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
  const [load, setLoad] = useState(false)
  const [delayed, setDelayed] = useState(false)
  const current = useUIStore((state: any) => state.current)
  const firstLoad = useUIStore((state: any) => state.firstLoad)
  const setFirstLoad = useUIStore((state: any) => state.setFirstLoad)

  const delayRender = async (delay) => {
    setTimeout(() => {
      setDelayed(true)
      console.log(delayed)
    }, delay)

    const loadGradient = await import('../../components/dom/LazyGradient')

    setLoad(true)
  }

  const firstLoadingChecker = async () => {
    if (load === true && delayed === true && firstLoad === 'never') {
      await setFirstLoad('firstLoad')
      setTimeout(async () => {
        setFirstLoad('firstLoadDone')
      }, 500)
    }
  }

  useEffect(() => {
    if (delayed === false) {
      delayRender(9000)
    }
  }, [])

  useEffect(() => {
    firstLoadingChecker()
  }, [load, delayed])

  useEffect(() => {
    console.log(firstLoad)
  }, [firstLoad])

  return (
    <>
      <DOM />

      <Loading loadStatus={firstLoad} />

      <LazyGradient r3f loaded={firstLoad !== 'never'} />
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
