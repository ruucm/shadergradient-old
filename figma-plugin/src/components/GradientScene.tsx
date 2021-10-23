import * as React from 'react'
import { Environment, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Gradient, updateGradientState, useQueryState } from 'shadergradient'

export function GradientScene() {
  React.useEffect(() => {
    // const gradientURL = PRESETS[0].url
    const gradientURL =
      '?animate=on&brightness=1.2&cameraPositionX=0.4&cameraPositionY=2&cameraPositionZ=-3.3&cameraZoom=2.6&color1=#CC4C6E&color2=#1980FF&color3=#99B58F&envPreset=city&grain=on&lightType=env&reflection=0.1&rotationX=90&rotationY=0&rotationZ=230&type=plane&uSpeed=0.3&uStrength=1.6&uTime=0.2&pixelDensity=1&embedMode=off&positionX=0&positionY=0&positionZ=0' // halo + cameraPositions
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
