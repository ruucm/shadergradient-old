import * as React from 'react'
import { Environment, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import {
  Gradient,
  updateGradientState,
  useQueryState,
  PRESETS,
} from 'shadergradient'

export function GradientScene({ currentTheme }) {
  React.useEffect(() => {
    const gradientURL = PRESETS[currentTheme].url
    updateGradientState(gradientURL)
  }, [currentTheme])

  // performance
  const [pixelDensity] = useQueryState('pixelDensity')

  // shape
  const [type] = useQueryState('type')
  const [animate] = useQueryState('animate')
  const [uTime] = useQueryState('uTime')
  const [uSpeed] = useQueryState('uSpeed')
  const [uStrength] = useQueryState('uStrength')
  const [positionX] = useQueryState('positionX')
  const [positionY] = useQueryState('positionY')
  const [positionZ] = useQueryState('positionZ')
  const [rotationX] = useQueryState('rotationX')
  const [rotationY] = useQueryState('rotationY')
  const [rotationZ] = useQueryState('rotationZ')

  // colors
  const [color1] = useQueryState('color1')
  const [color2] = useQueryState('color2')
  const [color3] = useQueryState('color3')

  // effects
  const [grain] = useQueryState('grain')
  const [lightType] = useQueryState('lightType')
  const [envPreset] = useQueryState('envPreset')
  const [reflection] = useQueryState('reflection')
  const [brightness] = useQueryState('brightness')

  // camera
  const [cameraZoom] = useQueryState('cameraZoom')
  const [cameraPositionX] = useQueryState('cameraPositionX')
  const [cameraPositionY] = useQueryState('cameraPositionY')
  const [cameraPositionZ] = useQueryState('cameraPositionZ')

  return (
    <Canvas
      style={{
        height: 304,
      }}
      gl={{ preserveDrawingBuffer: true }} // to capture the canvas
      id='r3f-canvas'
      dpr={pixelDensity}
    >
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={false}
      />
      <Gradient
        rotation={[
          (rotationX / 360) * Math.PI,
          (rotationY / 360) * Math.PI,
          (rotationZ / 360) * Math.PI,
        ]}
        position={[positionX, positionY, positionZ]}
        cameraPosition={{
          x: cameraPositionX,
          y: cameraPositionY,
          z: cameraPositionZ,
        }}
        environment={<Environment preset='city' />}
        cameraRotation={{ x: 0, y: 0, z: 0 }}
        type={type}
        animate={animate === 'on'}
        cameraZoom={cameraZoom}
        uTime={uTime}
        uStrength={uStrength}
        uSpeed={uSpeed}
        colors={[color1, color2, color3]}
        grain={grain}
        lightType={lightType}
        envPreset={envPreset}
        reflection={reflection}
        brightness={brightness}
        postProcessing={'threejs'} // turn on postpocessing
      />
    </Canvas>
  )
}

GradientScene.defaultProps = {}
