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
  const [setting, setSetting] = React.useState('none')

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
      <motion.div
        className={styles.menu}
        initial={{
          top: '34px',
          right: '-470px',
        }}
        animate={menuAnim}
      >
        <div className={styles.menuItems}>
          <div className={styles.icon} onClick={() => {}}>
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
          </div>
          <motion.a
            initial={{ opacity: 0.3 }}
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
            initial={{ opacity: 0.3 }}
            whileHover={{
              opacity: 1,
              transition: { duration: 0.3 },
            }}
            onClick={() => {}}
          >
            Shader
          </motion.a>
          <motion.a
            initial={{ opacity: 0.3 }}
            whileHover={{
              opacity: 1,
              transition: { duration: 0.3 },
            }}
            onClick={() => {}}
          >
            Light
          </motion.a>
          <motion.a
            initial={{ opacity: 0.3 }}
            whileHover={{
              opacity: 1,
              transition: { duration: 0.3 },
            }}
            onClick={() => {}}
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
        <div className={styles.controlWrapper}></div>
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
