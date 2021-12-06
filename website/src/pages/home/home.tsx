import { GradientScene } from '@/components/canvas/GradientScene'
import { Loading } from '@/components/dom/Loading'
import { MenuWrapper } from '@/components/dom/MenuWrapper'
import { MotionLogo } from '@/components/dom/MotionLogo'
import { PreviewSwitch } from '@/components/dom/PreviewSwitch'
import { PreviewWrapper } from '@/components/dom/PreviewWrapper'
import { links } from '@/consts'
import { useUIStore } from '@/helpers/store'
import { motion } from 'framer-motion'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import {
  SnapItem,
  SnapList,
  useDragToScroll,
  useScroll,
  useVisibleElements,
} from 'react-snaplist-carousel'
import { PRESETS } from 'shadergradient'
import styles from './Home.module.scss'
import { MenuItem } from './menu-item'
import { MyItem } from './my-item'

const DOM = ({ referer }) => {
  // for logo animation

  const mode = useUIStore((state: any) => state.mode)
  const setMode = useUIStore((state: any) => state.setMode)
  const current = useUIStore((state: any) => state.current)
  const loadingPercentage = useUIStore((state: any) => state.loadingPercentage)
  const setCurrent = useUIStore((state: any) => state.setCurrent)

  const snapList = useRef(null)

  const [isMobile, setIsMobile] = useState(false)
  const visible = useVisibleElements(
    { debounce: 10, ref: snapList },
    ([element]) => element
  )
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

  console.log('loadingPercentage', loadingPercentage)

  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        duration: 2,
        staggerChildren: 0.05,
      },
    },
  }

  const letters = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  }

  const title = 'ShaderGradient'
  const descript1 =
    'beautiful, customizable, and moving gradients for your digital products'

  return (
    <>
      {/* Loadings */}
      <Loading
        current={current}
        loadingPercentage={loadingPercentage}
        referer={referer}
      />
      <MotionLogo
        color={false}
        current={current}
        loadingPercentage={loadingPercentage}
      />
      {/* Home */}
      <motion.div
        className={styles.bodyWrapper}
        style={{
          color: mode === 'full' ? PRESETS[current].color : '#FF430A',
          display: 'block',
        }}
      >
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

        <div className={styles.leftWrapper}>
          <motion.div
            className={styles.title}
            animate={{
              y: mode !== 'full' ? -290 : 0,
              opacity: mode !== 'full' ? 0 : 1,
            }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1 style={{ opacity: 1, y: 0 }} variants={sentence}>
              {title.split('').map((char, index) => {
                return (
                  <motion.span
                    key={char + '-' + index}
                    variants={letters}
                    style={{ display: 'inline-block' }}
                    transition={{ duration: 0.8 }}
                  >
                    {char}
                  </motion.span>
                )
              })}
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              variants={sentence}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 1 },
              }}
            >
              {descript1.split(' ').map((word, index) => (
                <>
                  <span
                    key={word + '-' + index}
                    style={{ display: 'inline-block' }}
                  >
                    {word.split('').map((char, index) => (
                      <motion.span
                        key={char + '-' + index}
                        variants={letters}
                        style={{
                          display: 'inline-block',
                        }}
                        transition={{ duration: 0.8 }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                  <span> </span>
                </>
              ))}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: 0.5, duration: 1 },
              }}
              style={{ fontSize: 13, width: '25vw', marginTop: '50px' }}
            >
              Available as React component, Figma plugin, and Framer package
              (beta). Made with WebGL shaders.
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
              transition: { delay: 1, transition: 2 },
            }}
          >
            <div
              className={styles.sliderWrapper}
              style={{
                borderBottom:
                  mode === 'full'
                    ? '2px solid ' + PRESETS[current].color
                    : '2px solid #FF430A',
                height: 60 * 1.6,
              }}
            >
              <SnapList
                ref={snapList}
                tabIndex={0}
                direction={isMobile ? 'vertical' : 'horizontal'}
                onScroll={(info) => {
                  console.log(info)
                  setCurrent(visible)
                }}
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
                        }}
                        visible={current === index || visible === index}
                        color={
                          mode === 'full' ? PRESETS[current].color : '#FF430A'
                        }
                        isMobile={isMobile}
                        btnOn={true}
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
      {/* <Footer /> */}

      <PreviewWrapper mode={mode} setMode={setMode} />
    </>
  )
}

const Page = ({ referer }) => {
  return (
    <>
      <DOM referer={referer} />
      <GradientScene r3f />
    </>
  )
}

export default Page

export async function getServerSideProps(context) {
  return {
    props: {
      title: 'Shader Gradient',
      referer: context.req.headers.referer,
    },
  }
}
