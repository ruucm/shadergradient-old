import { Environment } from '@react-three/drei'
import { motion } from 'framer-motion'
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
const itemGap = '50px'

const presets = [
  { title: 'Halo', text: 'black' },
  { title: 'Breeze', text: 'black' },
  { title: 'Dawn', text: 'black' },
  { title: 'Aurora', text: 'black' },
  { title: 'Tropical', text: 'black' },
]

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
              <Link href='/customize'>
                <a>→ Customize</a>
              </Link>
            </div>
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
                      visible={visible === index}
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
          <div className={styles.footer}>
            Made as side project from <a href=''>Ruucm</a> and{' '}
            <a href='https://seungmee-lee.com'>stone.skipper</a>
            <br />
            Any inquiry? <a href=''>contact here</a>
          </div>
        </div>

        <div className={styles.rightWrapper}>
          <div className={styles.mobileBorderWrapper}>
            <div></div>
            <div></div>
          </div>
          <div className={styles.links}>
            <div className={styles.iconWrapper}>
              <a href=''>
                <p>Figma</p>
                <div className={styles.icon}></div>
              </a>
            </div>
            <div className={styles.iconWrapper}>
              <a href=''>
                <p>Framer</p>
                <div className={styles.icon}></div>
              </a>
            </div>
            <div className={styles.iconWrapper}>
              <a href='https://www.npmjs.com/package/shadergradient'>
                <p>Github</p>
                <div className={styles.icon}></div>
              </a>
            </div>
            <div className={styles.iconWrapper}>
              <a href=''>
                <p>More info</p>
                <div className={styles.icon}></div>
              </a>
            </div>
          </div>
          <div className={styles.svgWrapper}>
            {' '}
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
          </div>

          <div className={styles.mobileContent}>
            <svg xmlns='http://www.w3.org/2000/svg' width='28' height='24'>
              <path
                d='M 2.5 20.313 L 25.5 20.313 L 25.5 22 L 2.5 22 Z'
                fill='hsl(0, 0%, 0%)'
              ></path>
              <path
                d='M 2.5 2 L 25.5 2 L 25.5 3.688 L 2.5 3.688 Z'
                fill='hsl(0, 0%, 0%)'
              ></path>
              <path
                d='M 2.5 10.875 L 25.5 10.875 L 25.5 12.563 L 2.5 12.563 Z'
                fill='hsl(0, 0%, 0%)'
              ></path>
            </svg>
            <p>
              <br />
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
              <br /> current slide - {visible}
            </p>
          </div>
        </div>
      </div>

      <Gradient
        r3f
        environment={<Environment preset='city' background={false} />}
        lights={null}
        rotation={[(Math.PI / 3) * 2, 0, 0]}
        cameraPosition={{ x: 0, y: 2, z: 4 }}
        cameraRotation={{ x: 0, y: 0, z: 0 }}
        cameraQuaternion={{ x: -Math.PI / 6, y: 0, z: 0 }}
        cameraZoom={1.5}
      />
      {/* <GUIGradient /> */}
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
