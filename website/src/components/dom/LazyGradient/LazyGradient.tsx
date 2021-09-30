import * as React from 'react'
import { Environment } from '@react-three/drei'

import cx from 'classnames'
import styles from '../../../pages/home/Home.module.scss'
import { Gradient } from 'shadergradient'
import { useUIStore } from '@/helpers/store'

import PRESETS from '../../../pages/presets.json'

export function LazyGradient({ r3f }) {
  const current = useUIStore((state: any) => state.current)

  return (
    <Gradient
      r3f
      environment={<Environment preset='city' background={false} />}
      lights={null}
      rotation={[(Math.PI / 3) * 2, 0, (Math.PI / 7) * 12]}
      cameraPosition={{ x: 0, y: 1.7, z: 4 }}
      // cameraRotation={{ x: 0, y: 0, z: 0 }}
      cameraQuaternion={{ x: -Math.PI / 6, y: 0, z: 0 }}
      cameraZoom={2.2}
      animate={true}
      // @ts-ignore
      type={PRESETS[current].type}
    />
  )
}

LazyGradient.defaultProps = {}
