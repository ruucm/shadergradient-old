import * as React from 'react'
import { Environment, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Gradient, updateGradientState, useQueryState } from 'shadergradient'

export function GradientScene() {
  React.useEffect(() => {
    // const gradientURL = PRESETS[0].url
    const gradientURL =
      '?animate=on&brightness=1&cameraPositionX=0.4&cameraPositionY=3.2&cameraPositionZ=0&cameraZoom=1.3&color1=%235ce7ff&color2=%235ac5d3&color3=%23b9dcac&envPreset=city&grain=off&lightType=3d&reflection=0&rotationX=180&rotationY=50&rotationZ=0&type=waterPlane&uSpeed=0.2&uStrength=2&uTime=0.2&pixelDensity=1&embedMode=off&positionX=0&positionY=0&positionZ=0'
    updateGradientState(gradientURL)
  }, [])

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
