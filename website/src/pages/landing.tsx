import React, { useRef, forwardRef } from 'react'
import { GUIGradient } from '@/components/dom/gui-gradient'
import { usePostProcessing } from '@/hooks/use-post-processing'
import { Environment } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import dynamic from 'next/dynamic'
import { Suspense, useContext } from 'react'
import { EffectComposer, Noise } from '@react-three/postprocessing'
import { FormContext } from '@/helpers/form-provider'
import { motion } from 'framer-motion'
import styles from '../styles/landing.module.css'
import {
  SnapList,
  SnapItem,
  useVisibleElements,
  useScroll,
  useDragToScroll,
  isTouchDevice,
} from 'react-snaplist-carousel'

import styled from 'styled-components'

const GradientMesh = dynamic(() => import('@/components/canvas/GradientMesh'), {
  ssr: false,
})

//gap between theme items
const itemGap = '50px'

// eslint-disable-next-line react/display-name
const MyItem = ({ onClick, children, visible }) => (
  <div
    style={{
      width: 'fit-content',
      fontSize: 70,
      opacity: visible ? 1 : 0.3,
      borderBottom: visible ? '6px solid black' : '0px solid black',
      cursor: visible ? 'default' : 'pointer',
    }}
    onClick={onClick}
  >
    {children}
  </div>
)

const Page = () => {
  const snapList = useRef(null)

  const visible = useVisibleElements(
    { debounce: 10, ref: snapList },
    ([element]) => element
  )
  const goToSnapItem = useScroll({ ref: snapList })
  const { isDragging } = useDragToScroll({ ref: snapList })

  return (
    <>
      <div className={styles.bodyWrapper}>
        <div className={styles.leftWrapper}>
          <div className={styles.title}>
            <motion.h1
              style={{
                fontSize: 70,
                fontWeight: 'bold',
              }}
            >
              ShaderGradients
            </motion.h1>
            <motion.h2 style={{ fontSize: 25, width: '30vw' }}>
              Make your products alive with vivid gradients and movement
            </motion.h2>
            <motion.p
              style={{ fontSize: 12, width: '15vw', marginTop: '50px' }}
            >
              Our gradients are made from 3d object with a fragment shader to
              make a lively gradient that will make your products pops out.
            </motion.p>
          </div>

          <div
            className={styles.slider}
            style={
              {
                // cursor: isDragging ? 'grabbing' : 'grab',
              }
            }
          >
            <div className={styles.sliderHeader}>
              <p>Select from themes</p>
              <a href=''>→ Customize</a>
            </div>
            <SnapList ref={snapList} direction='horizontal'>
              <SnapItem
                margin={{ left: '20vw', right: itemGap }}
                snapAlign='start'
              >
                <MyItem onClick={() => goToSnapItem(0)} visible={visible === 0}>
                  01 Halo
                </MyItem>
              </SnapItem>
              <SnapItem
                margin={{ left: itemGap, right: itemGap }}
                snapAlign='start'
              >
                <MyItem onClick={() => goToSnapItem(1)} visible={visible === 1}>
                  02 Breeze
                </MyItem>
              </SnapItem>
              <SnapItem
                margin={{ left: itemGap, right: itemGap }}
                snapAlign='start'
              >
                <MyItem onClick={() => goToSnapItem(2)} visible={visible === 2}>
                  03 Dawn
                </MyItem>
              </SnapItem>
              <SnapItem
                margin={{ left: itemGap, right: itemGap }}
                snapAlign='start'
              >
                <MyItem onClick={() => goToSnapItem(3)} visible={visible === 3}>
                  04 Aurora
                </MyItem>
              </SnapItem>
              <SnapItem
                margin={{ left: itemGap, right: '30vw' }}
                snapAlign='start'
              >
                <MyItem onClick={() => goToSnapItem(4)} visible={visible === 4}>
                  05 Summer
                </MyItem>
              </SnapItem>
            </SnapList>
          </div>
        </div>

        <div className={styles.rightWrapper}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='720'
            height='1335'
            className={styles.mobileClip}
          >
            <path
              d='M 0 0 L 720 0 L 720 1335 L 0 1335 Z M 222 936 C 222 944.837 229.163 952 238 952 L 487 952 C 495.837 952 503 944.837 503 936 L 503 376 C 503 367.163 495.837 360 487 360 L 238 360 C 229.163 360 222 367.163 222 376 Z'
              fill='hsl(0, 0%, 0%)'
            ></path>
            <path
              d='M 216 374 C 216 362.954 224.954 354 236 354 L 489 354 C 500.046 354 509 362.954 509 374 L 509 938 C 509 949.046 500.046 958 489 958 L 236 958 C 224.954 958 216 949.046 216 938 Z'
              fill='transparent'
              strokeWidth='2'
              stroke='hsl(0, 0%, 22%)'
            ></path>
          </svg>
          <div className={styles.mobileContent}>
            <svg xmlns='http://www.w3.org/2000/svg' width='49' height='49'>
              <path
                d='M 8 38 L 42 38 L 42 41 L 8 41 Z'
                fill='hsl(0, 0%, 0%)'
              ></path>
              <path
                d='M 8 9 L 42 9 L 42 12 L 8 12 Z'
                fill='hsl(0, 0%, 0%)'
              ></path>
              <path
                d='M 8 23 L 42 23 L 42 26 L 8 26 Z'
                fill='hsl(0, 0%, 0%)'
              ></path>
            </svg>
            <p>
              *<br />
              Hello, we are
              <br />
              Shader Gradient.
              <br />
              <br />
              Imagine your products
              <br />
              with vivid color <br />
              and movement.
            </p>
          </div>
        </div>
      </div>

      <Scene r3f />
      {/* <GUIGradient /> */}
    </>
  )
}

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'Landing',
    },
  }
}

function Scene({ r3f }) {
  const ctx: any = useContext(FormContext)
  const { postProcessing, env } = ctx?.watch()

  // const { camera } = useThree()
  // // scene.background = new THREE.Color(0x000000)
  // camera.position.set(2, 4, 1)
  // camera.fov = 100

  usePostProcessing({ on: postProcessing === 'threejs' })

  return (
    <Suspense fallback={'Loading...'}>
      {env === 'env' ? (
        <Environment
          // files={'cayley_interior_2k.hdr'}
          // path={'/hdr/'}
          preset='city'
          background={false}
        />
      ) : (
        <ambientLight intensity={1} />
      )}

      {postProcessing === 'r3f' && (
        <EffectComposer>
          <Noise opacity={0.2} />
        </EffectComposer>
      )}

      <GradientMesh />
    </Suspense>
  )
}
