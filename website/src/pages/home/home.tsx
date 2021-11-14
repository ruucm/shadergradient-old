import { Footer } from '@/components/dom/Footer'
import { GradientScene } from '@/components/canvas/GradientScene'
import { Loading } from '@/components/dom/Loading'
import { MenuWrapper } from '@/components/dom/MenuWrapper'
import { PreviewSwitch } from '@/components/dom/PreviewSwitch'
import { PreviewWrapper } from '@/components/dom/PreviewWrapper'
import { MotionLogo } from '@/components/dom/MotionLogo'

import { useUIStore } from '@/helpers/store'
import { motion } from 'framer-motion'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import {
  SnapItem,
  SnapList,
  useDragToScroll,
  useScroll,
} from 'react-snaplist-carousel'
import styles from './Home.module.scss'
import { MenuItem } from './menu-item'
import { MyItem } from './my-item'
import { links } from '@/consts'
import { PRESETS } from 'shadergradient'

const DOM = () => {
  // for logo animation

  const mode = useUIStore((state: any) => state.mode)
  const setMode = useUIStore((state: any) => state.setMode)
  const current = useUIStore((state: any) => state.current)
  const loadingPercentage = useUIStore((state: any) => state.loadingPercentage)
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
          <div className='flex flex-col gap-0.2 p-3.5 '>
            <motion.div
              className='text-xl font-medium text-primary'
              initial={{ paddingLeft: 0 }}
              whileHover={{
                paddingLeft: 7,
                transition: { duration: 0.3 },
              }}
            >
              <Link href='/about'>About →</Link>
            </motion.div>
            {links.map((item, id) => (
              <MenuItem key={id} title={item.title} link={item.link} />
            ))}
            <PreviewSwitch mode={mode} setMode={setMode} />
          </div>
        </MenuWrapper>
      )}

      {/* Loading Spinner */}
      {loadingPercentage < 100 && (
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <MotionLogo color={false} />
        </div>
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
          <MotionLogo color={false} />
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
                          // console.log(index, current)
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

  return (
    <>
      <DOM />
      {/* {process.env.NODE_ENV === 'production' && (
        <Loading loadStatus={firstLoad} />
      )} */}
      <GradientScene r3f />
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
