import { Environment } from '@react-three/drei'
import { motion, useAnimation, animate } from 'framer-motion'
import Link from 'next/link'

import React, { useRef } from 'react'
import {
  SnapItem,
  SnapList,
  useDragToScroll,
  useScroll,
  useVisibleElements,
} from 'react-snaplist-carousel'
import { Gradient } from 'shadergradient'
import styles from './Home.module.scss'
import PRESETS from '../presets.json'

import { MyItem } from './my-item'
import { MenuItem } from './menu-item'
import { PreviewSwitch } from '@/components/dom/PreviewSwitch'
import { PreviewWrapper } from '@/components/dom/PreviewWrapper'
import { MenuWrapper } from '@/components/dom/MenuWrapper'
import { Footer } from '@/components/dom/Footer'

//gap between theme items

const Page = () => {
  const snapList = useRef(null)

  const current = useVisibleElements(
    { debounce: 10, ref: snapList },
    ([element]) => element
  )
  const goToSnapItem = useScroll({ ref: snapList })
  const itemGap = '40px'

  const { isDragging } = useDragToScroll({ ref: snapList })

  const [mode, setMode] = React.useState('full')

  const [isMobile, setIsMobile] = React.useState(false)

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
      {isMobile === true ? (
        <div className={styles.mobileOnly}>
          <Link href='/about'>→ about</Link>
          <Link href='/custom'>→ customize</Link>
        </div>
      ) : (
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
              // onClick={() => {
              //   if (mode !== 'about') {
              //     setMode('about')
              //   } else {
              //     setMode('full')
              //   }
              // }}
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
          // display: mode !== 'about' ? 'block' : 'none',
          display: 'block',
        }}
      >
        <div className={styles.leftWrapper}>
          <div
            className={styles.title}
            style={{ display: mode !== 'full' ? 'none' : 'block' }}
          >
            <motion.h1>ShaderGradient</motion.h1>
            <motion.h2>
              No more static gradients.
              <br />
              Add liveliness in your products.
            </motion.h2>
            <motion.p
              style={{ fontSize: 12, width: '25vw', marginTop: '50px' }}
            >
              Customizable gradient tool inspired by natural lights and
              atmospheres. Made with WebGL shaders.
              <br />
              <br /> Fully supported on Chrome. Sorry Safari.
            </motion.p>
          </div>

          {/* Preset Slider */}
          <div className={styles.slider} style={{}}>
            <div className={styles.sliderHeader}>
              <p>Current Theme</p>
              <Link href='/custom'>→ Customize </Link>
              <Link href='customize'>→ TestLink </Link>
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
                        onClick={() => goToSnapItem(index)}
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
          </div>
        </div>
      </motion.div>
      <Footer />

      <PreviewWrapper mode={mode} setMode={setMode} />
      <Gradient
        r3f
        environment={<Environment preset='city' background={false} />}
        lights={null}
        rotation={[(Math.PI / 3) * 2, 0, (Math.PI / 7) * 12]}
        cameraPosition={
          mode !== 'about' ? { x: 0, y: 1.7, z: 4 } : { x: 0, y: 0, z: 8 }
        }
        // cameraRotation={{ x: 0, y: 0, z: 0 }}
        cameraQuaternion={{ x: -Math.PI / 6, y: 0, z: 0 }}
        cameraZoom={mode !== 'about' ? 2.2 : 0.4}
        animate={true}
        // @ts-ignore
        type={PRESETS[current].type}
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
