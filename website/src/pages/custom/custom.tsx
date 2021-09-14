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
      <div
        className={styles.menu}
        style={{
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
            onClick={() => {
              if (mode !== 'about') {
                setMode('about')
              } else {
                setMode('full')
              }
            }}
          >
            {mode === 'about' ? '← to main' : 'About →'}
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
