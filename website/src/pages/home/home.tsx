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

//gap between theme items
const itemGap = '40px'

const presets = [
  { title: 'Halo', color: 'white' },
  { title: 'Breeze', color: 'white' },
  { title: 'Dawn', color: 'black' },
  { title: 'Aurora', color: 'black' },
  { title: 'Tropical', color: 'black' },
  { title: 'Halo', color: 'white' },
  { title: 'Halo', color: 'white' },
  { title: 'Halo', color: 'white' },
]

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
        top: '15vh',
        left: '40vw',
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
    }
  }, [mode])

  return (
    <>
      <motion.div
        className={styles.aboutModal}
        style={{ color: 'white', display: mode === 'about' ? 'block' : 'none' }}
      >
        <div className={styles.title}>
          <motion.h1>
            ShaderGradient allows creators to bring liveliness to their digital
            spaces with customizable, moving gradients. Our custom shader
            calculates and draws colors and movements in 3d to enable natural
            expressions. You can control shape, color(shader), lightings and
            perspectives blah bah. A shader is a set of instructions that
            calculates and draws every single pixel on the screen. Our custom
            shaders generate a moving 3d object and colors on it.
          </motion.h1>
        </div>
        <a
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setMode('full')
          }}
        >
          ← back to main
        </a>
      </motion.div>
      <motion.div
        className={styles.bodyWrapper}
        // animate={{ opacity: 1 }}
        // transition={{ duration: 0.5 }}
        // initial={{ opacity: 0 }}
        style={{
          color: presets[current].color,
          display: mode !== 'about' ? 'block' : 'none',
        }}
      >
        <div className={styles.leftWrapper}>
          <div className={styles.title}>
            <motion.h1>ShaderGradient</motion.h1>
            <motion.h2 style={{ fontSize: 20, width: '30vw' }}>
              Make your products alive <br />
              with vivid gradients and movement
            </motion.h2>
            <motion.p
              style={{ fontSize: 12, width: '15vw', marginTop: '50px' }}
            >
              Our gradients are made from 3d object with a fragment shader to
              make a lively gradient that will make your products pops out.
            </motion.p>
          </div>

          <div className={styles.slider} style={{}}>
            <div className={styles.sliderHeader}>
              <p>Current Theme</p>
              <Link href='/customize'>
                <a>Customize →</a>
              </Link>
            </div>
            <div className={styles.sliderWrapper}>
              <SnapList ref={snapList} direction='horizontal'>
                {presets.map((item, index) => {
                  return (
                    <SnapItem
                      key={index}
                      margin={{ left: itemGap, right: itemGap }}
                      snapAlign='start'
                    >
                      <MyItem
                        onClick={() => goToSnapItem(index)}
                        visible={current === index}
                        color={presets[current].color}
                      >
                        {index < 10 ? '0' + index.toString() : index.toString()}{' '}
                        {item.title}
                      </MyItem>
                    </SnapItem>
                  )
                })}
                <SnapItem
                  margin={{ left: itemGap, right: '30vw' }}
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
          <div className={styles.menu}>
            <div className={styles.menuItems}>
              <motion.a
                initial={{ paddingLeft: 0 }}
                whileHover={{
                  paddingLeft: 10,
                  transition: { duration: 0.3 },
                }}
                onClick={() => {
                  setMode('about')
                }}
              >
                About →
              </motion.a>
              <motion.a
                initial={{ paddingLeft: 0 }}
                whileHover={{
                  paddingLeft: 10,
                  transition: { duration: 0.3 },
                }}
                href=''
              >
                Figma →
              </motion.a>
              <motion.a
                initial={{ paddingLeft: 0 }}
                whileHover={{
                  paddingLeft: 10,
                  transition: { duration: 0.3 },
                }}
                href=''
              >
                Git →
              </motion.a>
              <motion.a
                initial={{ paddingLeft: 0 }}
                whileHover={{
                  paddingLeft: 10,
                  transition: { duration: 0.3 },
                }}
                href=''
              >
                Framer →
              </motion.a>
            </div>
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
                    setMode('mobile')
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
                    setMode('web')
                  }}
                ></motion.div>
              </div>
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
        cameraPosition={{ x: 0, y: 2, z: 4 }}
        // cameraRotation={{ x: 0, y: 0, z: 0 }}
        cameraQuaternion={{ x: -Math.PI / 6, y: 0, z: 0 }}
        cameraZoom={mode !== 'about' ? 2.2 : 0.4}
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
