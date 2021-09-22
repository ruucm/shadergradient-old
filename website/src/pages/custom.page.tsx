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
import styles from './home/Home.module.scss'
import { MyItem } from './home/my-item'
import PRESETS from './presets.json'

const Page = () => {
  const snapList = useRef(null)

  // const current = useVisibleElements(
  //   { debounce: 10, ref: snapList },
  //   ([element]) => element
  // )
  const goToSnapItem = useScroll({ ref: snapList })
  const { isDragging } = useDragToScroll({ ref: snapList })

  const [mode, setMode] = React.useState('full')
  const [setting, setSetting] = React.useState('none')
  const [current, setCurrent] = React.useState(0)
  const previewAnim = useAnimation()
  const menuAnim = useAnimation()

  React.useEffect(() => {
    if (setting === 'none') {
      menuAnim.start({
        top: '34px',
        right: '-470px',
        transition: { duration: 0.3 },
      })
    } else {
      menuAnim.start({
        right: '34px',
        transition: { duration: 0.3 },
      })
    }
  }, [setting])

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

  var zoom = 2.2

  return (
    <>
      <div className={styles.content}>
        <motion.a href='/' style={{ color: PRESETS[current].color }}>
          ← ShaderGradient
        </motion.a>
      </div>

      <motion.div
        className={styles.menu}
        initial={{
          top: '34px',
          right: '-470px',
        }}
        animate={menuAnim}
      >
        <div className={styles.menuItems}>
          {/* <div className={styles.icon} onClick={() => {}}>
            {setting === 'none' ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='24px'
                viewBox='0 0 24 24'
                width='24px'
                fill='#ff430a'
              >
                <path d='M0 0h24v24H0V0z' fill='none' />
                <path d='M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z' />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='24px'
                viewBox='0 0 24 24'
                width='24px'
                fill='#ff430a'
              >
                <path d='M0 0h24v24H0V0z' fill='none' />
                <path d='M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z' />
              </svg>
            )}
          </div> */}
          <motion.a
            style={{ opacity: setting === 'shape' ? 1 : 0.3 }}
            whileHover={{
              opacity: 1,
              transition: { duration: 0.3 },
            }}
            onClick={() => {
              if (setting !== 'shape') {
                setSetting('shape')
              } else {
                setSetting('none')
              }
            }}
          >
            Shape
          </motion.a>
          <motion.a
            style={{ opacity: setting === 'shader' ? 1 : 0.3 }}
            whileHover={{
              opacity: 1,
              transition: { duration: 0.3 },
            }}
            onClick={() => {
              if (setting !== 'shader') {
                setSetting('shader')
              } else {
                setSetting('none')
              }
            }}
          >
            Color
          </motion.a>
          <motion.a
            style={{ opacity: setting === 'light' ? 1 : 0.3 }}
            whileHover={{
              opacity: 1,
              transition: { duration: 0.3 },
            }}
            onClick={() => {
              if (setting !== 'light') {
                setSetting('light')
              } else {
                setSetting('none')
              }
            }}
          >
            Light
          </motion.a>
          <motion.a
            style={{ opacity: setting === 'camera' ? 1 : 0.3 }}
            whileHover={{
              opacity: 1,
              transition: { duration: 0.3 },
            }}
            onClick={() => {
              if (setting !== 'camera') {
                setSetting('camera')
              } else {
                setSetting('none')
              }
            }}
          >
            Camera
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
        <div className={styles.controlWrapper}>
          <div
            className={styles.controlItems}
            style={{ display: setting === 'shape' ? 'block' : 'none' }}
          >
            <div className={styles.item}>
              <p>type</p>
              <div>placeholder</div>
            </div>
            <div className={styles.item}>
              <p>bump scale</p>
              <div>placeholder</div>
            </div>
            <div className={styles.item}>
              <p>rotation</p>
              <div>placeholder</div>
            </div>
            <div className={styles.item}>
              <p>animate</p>
              <div>placeholder</div>
            </div>
            <div className={styles.item}>
              <p>time control</p>
              <div>placeholder</div>
            </div>
            <div className={styles.item}>
              <p>speed</p>
              <div>placeholder</div>
            </div>
          </div>
          <div
            className={styles.controlItems}
            style={{ display: setting === 'shader' ? 'block' : 'none' }}
          >
            <div className={styles.item}>
              <p>color1</p>
              <div>placeholder</div>
            </div>
            <div className={styles.item}>
              <p>color2</p>
              <div>placeholder</div>
            </div>
            <div className={styles.item}>
              <p>color3</p>
              <div>placeholder</div>
            </div>
            <div className={styles.item}>
              <p>grain texture</p>
              <div>placeholder</div>
            </div>
            <div className={styles.item}>
              <p>reflection</p>
              <div>placeholder</div>
            </div>
          </div>

          <div
            className={styles.controlItems}
            style={{ display: setting === 'light' ? 'block' : 'none' }}
          >
            <div className={styles.item}>
              <p>lighting type</p>
              <div>placeholder</div>
            </div>
            <div className={styles.item}>
              <p>environment</p>
              <div>placeholder</div>
            </div>
            <div className={styles.item}>
              <p>intensity</p>
              <div>placeholder</div>
            </div>
          </div>
          <div
            className={styles.controlItems}
            style={{ display: setting === 'camera' ? 'block' : 'none' }}
          >
            <div className={styles.item}>
              <p>position</p>
              <div>placeholder</div>
            </div>
            <div className={styles.item}>
              <p>rotation</p>
              <div>placeholder</div>
            </div>
            <div className={styles.item}>
              <p>zoom</p>
              <div>placeholder</div>
            </div>
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
      <Gradient
        r3f
        environment={<Environment preset='city' background={false} />}
        lights={null}
        rotation={[(Math.PI / 3) * 2, 0, (Math.PI / 7) * 12]}
        cameraPosition={{ x: 0, y: 1.7, z: 4 }}
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
