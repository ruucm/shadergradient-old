import { Environment } from '@react-three/drei'
import { motion, useAnimation, useMotionValue } from 'framer-motion'
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
import { MyItem } from './my-item'
import PRESETS from '../presets.json'

//gap between theme items
const itemGap = '40px'

const Page = () => {
  const snapList = useRef(null)

  const current = useVisibleElements(
    { debounce: 10, ref: snapList },
    ([element]) => element
  )
  const goToSnapItem = useScroll({ ref: snapList })
  const { isDragging } = useDragToScroll({ ref: snapList })

  const [mode, setMode] = React.useState('full')

  const previewAnim = useAnimation()

  React.useEffect(() => {
    // console.log(current)
  }, [current])

  React.useEffect(() => {
    console.log(mode)
    if (mode === 'mobile') {
      previewAnim.start({
        width: '20vw',
        height: '70vh',
        background: 'none',
        boxShadow: '0 0 0 1000px white',
        borderRadius: 15,
        top: '5vh',
        left: '40vw',
      })
    } else if (mode === 'web') {
      previewAnim.start({
        width: '55vw',
        height: '70vh',
        background: 'none',
        boxShadow: '0 0 0 1000px white',
        borderRadius: 15,
        top: '5vh',
        left: '22.5vw',
      })
    } else if (mode === 'full') {
      previewAnim.start({
        width: '100vw',
        height: '100vh',
        boxShadow: '0 0 0 0 white',
        borderRadius: 0,
        position: 'absolute',
        top: 0,
        left: 0,
        background: 'none',
        zIndex: 0,
      })
    } else if (mode === 'about') {
      // setZoom()
    }
  }, [mode])

  return (
    <>
      <div
        className={styles.menu}
        style={{
          top: '34px',
          right: '-470px',
          boxShadow:
            mode === 'mobile' || mode === 'web'
              ? '-4px 4px 62px 0px rgba(0, 0, 0, 0.05)'
              : 'none',
          background: mode === 'about' ? '#141414' : 'white',
        }}
      >
        <div className={styles.menuItems}>
          <motion.a
            initial={{ paddingLeft: 0 }}
            whileHover={{
              paddingLeft: 7,
              transition: { duration: 0.3 },
            }}
            style={{ color: mode === 'about' ? 'white' : '#ff430a' }}
            onClick={() => {
              if (mode !== 'about') {
                setMode('about')
              } else {
                setMode('full')
              }
            }}
          >
            {mode === 'about' ? '← Main' : 'About →'}
          </motion.a>
          <motion.a
            initial={{ paddingLeft: 0 }}
            whileHover={{
              paddingLeft: 7,
              transition: { duration: 0.3 },
            }}
            href=''
          >
            Figma →
          </motion.a>
          <motion.a
            initial={{ paddingLeft: 0 }}
            whileHover={{
              paddingLeft: 7,
              transition: { duration: 0.3 },
            }}
            href='https://www.npmjs.com/package/shadergradient'
          >
            Git →
          </motion.a>
          <motion.a
            initial={{ paddingLeft: 0 }}
            whileHover={{
              paddingLeft: 7,
              transition: { duration: 0.3 },
            }}
            href=''
          >
            Framer →
          </motion.a>
          <div className={styles.preview}>
            <p>preview</p>
            <div className={styles.previewWrapper}>
              <motion.div
                style={{
                  width: '17px',
                  height: '31px',
                  borderRadius: '4px',
                  background: '#ff430a',
                  cursor: 'pointer',
                  opacity: mode === 'mobile' ? 1 : 0.17,
                }}
                whileHover={{
                  opacity: 1,
                  transition: { duration: 0.3 },
                }}
                onClick={() => {
                  if (mode !== 'mobile') {
                    setMode('mobile')
                  } else {
                    setMode('full')
                  }
                }}
              ></motion.div>
              <motion.div
                style={{
                  width: '47px',
                  height: '31px',
                  borderRadius: '4px',
                  background: '#ff430a',
                  cursor: 'pointer',
                  opacity: mode === 'web' ? 1 : 0.17,
                }}
                whileHover={{
                  opacity: 1,
                  transition: { duration: 0.3 },
                }}
                onClick={() => {
                  if (mode !== 'web') {
                    setMode('web')
                  } else {
                    setMode('full')
                  }
                }}
              ></motion.div>
            </div>
          </div>
        </div>
      </div>
      <motion.div
        className={styles.aboutModal}
        style={{
          color: '#FF430A',
          display: mode === 'about' ? 'block' : 'none',
          fontSize: 20,
        }}
      >
        <div className={styles.title}>
          <motion.h1
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            initial={{ opacity: 0 }}
          >
            A shader is a set of instructions that calculates and draws every
            single pixel on the screen. We{"'"}ve made shaders that constantly
            animate the shape, color, and light of the 3d object. The shaders
            create a natural movement and expression of the gradient that can
            make your digital products vibrant and lively. <br />
          </motion.h1>

          <motion.h1
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            initial={{ opacity: 0 }}
          >
            You can control properties related to shape, color, light, and
            camera. The three colors you pick are connected to the very top
            left, very top right, and the very bottom of the fluctuating plane.
            Explore more about each property by experimenting on{' '}
            <a href='/custom'>→ customize</a> page.
          </motion.h1>
          <motion.h1
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            initial={{ opacity: 0 }}
          >
            Made by two creatives, <a href=''>Ruucm</a> &{' '}
            <a href=''>stone.skipper</a> with 17 Sunday afternoons.
          </motion.h1>
        </div>
      </motion.div>
      <motion.div
        className={styles.bodyWrapper}
        style={{
          color: mode === 'full' ? PRESETS[current].color : '#FF430A',
          display: mode !== 'about' ? 'block' : 'none',
        }}
      >
        <div className={styles.leftWrapper}>
          <div
            className={styles.title}
            style={{ display: mode !== 'full' ? 'none' : 'block' }}
          >
            <motion.h1>ShaderGradient</motion.h1>
            <motion.h2 style={{ fontSize: 20, width: '30vw' }}>
              No more static gradients
              <br />
              Add liveliness in your products
            </motion.h2>
            <motion.p
              style={{ fontSize: 12, width: '15vw', marginTop: '50px' }}
            >
              Customizable gradient tool inspired by natural lights and
              atmospheres. Made with WebGL shaders.
              <br />
              <br /> Fully supported on Chrome.
              <br /> Sorry Safari.
            </motion.p>
          </div>

          <div className={styles.slider} style={{}}>
            <div className={styles.sliderHeader}>
              <p>Current Theme</p>
              <a href='/custom'>Customize →</a>
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
              <SnapList ref={snapList} direction='horizontal'>
                {PRESETS.map((item, index) => {
                  return (
                    <SnapItem
                      key={index}
                      margin={{ left: itemGap, right: itemGap }}
                      snapAlign='start'
                    >
                      <MyItem
                        onClick={() => goToSnapItem(index)}
                        visible={current === index}
                        color={
                          mode === 'full' ? PRESETS[current].color : '#FF430A'
                        }
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

          <div className={styles.footer}>
            Made as side project from <a href=''>→ Ruucm</a> and{' '}
            <a href='https://seungmee-lee.com'>→ stone.skipper</a>
            <br />
            Any inquiry? <a href=''>→ contact here</a>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{
          width: '100vw',
          height: '100vh',
          boxShadow: '0 0 0 0 white',
          borderRadius: 0,
          position: 'absolute',
          top: 0,
          left: 0,
          background: 'transparent',
          zIndex: 0,
        }}
        animate={previewAnim}
        transition={{
          duration: 0.5,
        }}
      ></motion.div>

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
        // cameraZoom={zoom}
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
