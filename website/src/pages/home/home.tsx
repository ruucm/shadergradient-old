import React, { useEffect, useRef, useState } from 'react'
import { PRESETS, useUIStore, GradientWithQueries } from '@shadergradient'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { SnapItem, SnapList } from 'react-snaplist-carousel'
import styles from './Home.module.scss'
import { MenuItem } from './menu-item'
import { MyItem } from './my-item'
import { Loading } from '@/components/dom/Loading'
import { MenuWrapper } from '@/components/dom/MenuWrapper'
import { MotionLogo } from '@/components/dom/MotionLogo'
import { PreviewSwitch } from '@/components/dom/PreviewSwitch'
import { PreviewWrapper } from '@/components/dom/PreviewWrapper'
import { TextAnimation } from '@/components/dom/TextAnimation'
import { isDev, links } from '@/consts'

const DOM = () => {
  const mode = useUIStore((state) => state.mode)
  const setMode = useUIStore((state) => state.setMode)
  const activePreset = useUIStore((state) => state.activePreset)
  const setActivePreset = useUIStore((state) => state.setActivePreset)
  const loadingPercentage = useUIStore((state) => state.loadingPercentage)

  const snapList = useRef(null)

  const [isMobile, setIsMobile] = useState(false)

  // const goToSnapItem = useScroll({ ref: snapList })
  const itemGap = '40px'

  // const { isDragging } = useDragToScroll({ ref: snapList })

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
  return (
    <>
      {!isDev && (
        <Loading
          activePreset={activePreset}
          loadingPercentage={loadingPercentage}
          // referer={referer}
        />
      )}
      <MotionLogo
        color={false}
        activePreset={activePreset}
        loadingPercentage={loadingPercentage}
      />
      {/* Home */}
      <motion.div
        className={styles.bodyWrapper}
        style={{
          color: mode === 'full' ? PRESETS[activePreset].color : '#FF430A',
          display: 'block',
        }}
      >
        {/* <motion.div
          style={{
            width: '100vw',
            height: '100vh',
            background: 'rgb(255, 67, 10)',
            display: loadingPercentage < 100 ? 'block' : 'none',
          }}
        /> */}
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
                <Link href='/about'>About ???</Link>
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
            <TextAnimation
              content='ShaderGradient'
              delay={0}
              color='white'
              fontSize={60}
            />
            <TextAnimation
              content='beautiful, customizable, and moving gradients for your digital products'
              delay={800}
              color='white'
              fontSize={20}
            />

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: 1, duration: 1 },
              }}
              style={{ fontSize: 13, width: '25vw', marginTop: '50px' }}
            >
              {/* Available as React component, Figma plugin, and Framer package
              (beta). Made with WebGL shaders.
              <br /> Fully supported on Chrome. */}
              Bring liveliness to your products from your favorite design tools,
              like Figma and Framer. Also availalbe as a React component.
              Creative coding is not only for the genius developers.
            </motion.p>

            {isMobile === true ? (
              <motion.div
                className={styles.mobileOnly}
                style={{ color: PRESETS[activePreset].color }}
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 1.5, transition: 2 },
                }}
              >
                <Link href='/about'>??? about</Link>
                <Link href='/customize'>??? customize</Link>
              </motion.div>
            ) : null}
          </motion.div>

          {/* Preset Slider */}
          <motion.div
            className={styles.slider}
            style={{
              display: mode === 'about' ? 'none' : 'block',
            }}
            initial={{ opacity: 0, y: 30, display: 'none' }}
            animate={{
              opacity: 1,
              y: 0,
              display: 'block',
              transition: { delay: 3, transition: 1 },
            }}
          >
            <div
              className={styles.sliderWrapper}
              style={{
                borderBottom:
                  mode === 'full'
                    ? '2px solid ' + PRESETS[activePreset].color
                    : '2px solid #FF430A',
                height: isMobile ? 'fit-content' : 60 * 1.6,
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
                          // goToSnapItem(index)
                          setActivePreset(index)
                        }}
                        visible={activePreset === index}
                        color={
                          mode === 'full'
                            ? PRESETS[activePreset].color
                            : '#FF430A'
                        }
                        isMobile={isMobile}
                        btnOn={true}
                        index={index}
                      >
                        {index < 10
                          ? '0' + index.toString() + ' ' + item.title
                          : index.toString() + ' ' + item.title}
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
                      // goToSnapItem(0)
                    }}
                  >
                    ???
                  </button>
                </SnapItem>
              </SnapList>
            </div>
          </motion.div>
        </div>
      </motion.div>
      <PreviewWrapper mode={mode} setMode={setMode} />
    </>
  )
}

const Page = () => {
  return (
    <>
      <DOM />
      <GradientWithQueries r3f />
    </>
  )
}

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'Index',
    },
  }
}
