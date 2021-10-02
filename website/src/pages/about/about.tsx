import { Environment } from '@react-three/drei'
import { motion, useAnimation, useMotionValue, animate } from 'framer-motion'
import Link from 'next/link'
import { useUIStore } from '@/helpers/store'

import { Gradient, UI } from 'shadergradient'
import * as React from 'react'
import Lottie from 'react-lottie'

import styles from '../home/Home.module.scss'
import PRESETS from '../presets.json'

import { PreviewSwitch } from '@/components/dom/PreviewSwitch'
import { MenuWrapper } from '@/components/dom/MenuWrapper'
import { MenuItem } from '../home/menu-item'
import * as animationData_colored from '@/media/colored-motionlogo.json'
import { LazyGradient } from '@/components/dom/LazyGradient'

// var zoom = 2.2

const DOM = () => {
  const mode = useUIStore((state: any) => state.mode)
  const setMode = useUIStore((state: any) => state.setMode)
  const [isMobile, setIsMobile] = React.useState(false)

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData_colored,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

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

    setMode('about')
    // const zoomMotion = () => animate(zoom, 0.4, { duration: 1 })
    // zoomMotion()
    // console.log(zoom)
  }, [])

  // React.useEffect(() => {
  //   const controls = animate(zoom, 0.4, {
  //     type: 'spring',
  //     stiffness: 2000,
  //     // onComplete: {(v) => {
  //     //   console.log(v)
  //     // }},
  //   })

  //   return controls.stop
  // })

  return (
    <>
      {isMobile === true ? (
        <div
          className={styles.mobileOnly}
          style={{ color: '#ff430a', paddingLeft: '2em' }}
          onClick={() => {
            setMode('full')
          }}
        >
          <Link href='/'>← Main</Link>
        </div>
      ) : (
        <MenuWrapper mode={mode} setMode={setMode}>
          <div className={styles.menuItems}>
            <motion.div
              className='font-medium text-primary text-xl'
              initial={{ paddingLeft: 0 }}
              whileHover={{
                paddingLeft: 7,
                transition: { duration: 0.3 },
              }}
              style={{
                color: 'white',
                lineHeight: '1.7em',
                fontWeight: 500,
              }}
              onClick={() => {
                if (mode !== 'about') {
                  setMode('about')
                } else {
                  setMode('full')
                }
              }}
            >
              <Link href='/'>← Main</Link>
            </motion.div>
            <MenuItem title='Figma →' link='' />
            <MenuItem
              title='Git →'
              link='https://www.npmjs.com/package/shadergradient'
            />
            <MenuItem title='Framer →' link='' />
            <div style={{ opacity: 0.2 }}>
              <PreviewSwitch mode={mode} />
            </div>
          </div>
        </MenuWrapper>
      )}
      <motion.div className={styles.aboutModal}>
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
            <Link href='/custom'>→ customize</Link> page.
          </motion.h1>
          <motion.h1
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            initial={{ opacity: 0 }}
          >
            Made by two creatives, <a href=''>→ Ruucm</a> &{' '}
            <a href=''>→ stone.skipper</a> with 17 Sunday afternoons.
          </motion.h1>
        </div>
      </motion.div>
    </>
  )
}

// const R3F = ({ r3f }) => {
//   const current = useUIStore((state: any) => state.current)
//   const [zoom, setZoom] = React.useState(0.5)
//   const [mount, setMount] = React.useState(false)

//   React.useEffect(() => {
//     // function zoomMotion() {
//     //   if (zoom > 0.5) {
//     //     setZoom((z) => z - 0.02)
//     //   } else {
//     //     clearInterval(interval)
//     //     console.log('stop')
//     //   }
//     // }
//     // let interval = setInterval(zoomMotion, 50)
//   }, [])

//   React.useEffect(() => {
//     console.log(zoom)
//   }, [zoom])

//   return (
//     <Gradient
//       r3f
//       environment={<Environment preset='city' background={false} />}
//       lights={null}
//       rotation={[(Math.PI / 3) * 2, 0, (Math.PI / 7) * 12]}
//       cameraPosition={{ x: 0, y: 2, z: 8 }}
//       cameraZoom={zoom}
//       // cameraZoom={0.4}
//       animate={true}
//       // @ts-ignore
//       type={PRESETS[current].type}
//     />
//   )
// }

const Page = () => {
  return (
    <>
      <DOM />
      {/* <R3F r3f /> */}
      <LazyGradient
        r3f
        cameraZoom={0.5}
        cameraPosition={{ x: 0, y: 2, z: 8 }}
        rotation={[(Math.PI / 3) * 2, 0, (Math.PI / 7) * 12]}
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
