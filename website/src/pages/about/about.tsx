import { Environment } from '@react-three/drei'
import { motion, useAnimation, useMotionValue, animate } from 'framer-motion'
import Link from 'next/link'

import { Gradient, UI } from 'shadergradient'
import * as React from 'react'
// import React, { useState, useContext } from 'react'

import styles from '../home/Home.module.scss'
import PRESETS from '../presets.json'

import { PreviewSwitch } from '@/components/dom/PreviewSwitch'
import { PreviewWrapper } from '@/components/dom/PreviewWrapper'
import { MenuWrapper } from '@/components/dom/MenuWrapper'
import { MenuItem } from '../home/menu-item'

var zoom, setZoom
// zoom = 2.2

const Page = () => {
  const zoomInterval = setInterval(() => {
    if (zoom > 0.3) {
      setZoom(zoom - 0.1)
    }
    // console.log(zoom)
  }, 500)
  // const zoomControl = () => {
  //   animate(zoom, 0.4)
  // }
  // React.useEffect(() => {
  //   console.log('??')
  // }, [])

  // zoomControl()
  return (
    <>
      <Menu />
      <motion.div
        className={styles.aboutModal}
        style={{
          color: '#FF430A',
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
            <Link href='/custom'>→ customize</Link> page.
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
      <Gradient
        r3f
        environment={<Environment preset='city' background={false} />}
        lights={null}
        rotation={[(Math.PI / 3) * 2, 0, (Math.PI / 7) * 12]}
        cameraPosition={{ x: 0, y: 0, z: 8 }}
        cameraQuaternion={{ x: -Math.PI / 6, y: 0, z: 0 }}
        cameraZoom={zoom}
        // cameraZoom={0.4}
        animate={true}
        // type={PRESETS[current].type}
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
function Menu() {
  const [mode, setMode] = React.useState('about')
  ;[zoom, setZoom] = React.useState(2.2)

  React.useEffect(() => {
    console.log(zoom)
  }, [zoom])
  return (
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
  )
}
