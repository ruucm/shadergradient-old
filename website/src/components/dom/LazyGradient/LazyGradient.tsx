import * as React from 'react'
import { Environment } from '@react-three/drei'

import { Gradient } from 'shadergradient'
import * as animationData_colored from '@/media/colored-motionlogo.json'

export function LazyGradient({
  r3f,
  loaded = true,
  environment = <Environment preset='city' background={false} />,
  lights = null,
  cameraQuaternion = { x: -Math.PI / 6, y: 0, z: 0 },
  cameraPosition = { x: 0, y: 1.7, z: 4 },
  cameraRotation = { x: 0, y: 0, z: 0 },
  animate = true,
  cameraZoom = 2.2,
  rotation = [(Math.PI / 3) * 2, 0, (Math.PI / 7) * 12],
  type = 'plane',
  uTime = 0.2,
  uStrength = 1.6,
  uSpeed = 0.4,
  colors = ['#ff430a', '#FFD600', '#0029FF'],
}) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData_colored,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  return (
    <>
      {loaded && (
        <Gradient
          r3f
          environment={environment}
          lights={lights}
          rotation={[rotation[0], rotation[1], rotation[2]]}
          cameraPosition={cameraPosition}
          cameraRotation={cameraRotation}
          cameraQuaternion={cameraQuaternion}
          cameraZoom={cameraZoom}
          animate={animate}
          uTime={uTime}
          uStrength={uStrength}
          uSpeed={uSpeed}
          colors={colors}
          // @ts-ignore
          type={type}
        />
      )}
    </>
  )
}

LazyGradient.defaultProps = {}
