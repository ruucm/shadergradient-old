import { formatColor, hexToRgb } from '@/utils'
import { extend } from '@react-three/fiber'
import * as THREE from 'three'
import { fragmentShader } from './shaders/fragmentShader'
import { vertexShader } from './shaders/vertexShader'
import { vertexShaderSphere } from './shaders/vertexShaderSphere'

const settings = {
  meshCount: 50,
  type: 'plane',
  color1r: 0.8,
  color1g: 0.3,
  color1b: 0.43,
  color2r: 0.1,
  color2g: 0.5,
  color2b: 1.0,
  color3r: 0.6,
  color3g: 0.71,
  color3b: 0.56,
  roughness: 0.14,
  metalness: 0.2,
  normalScale: 0.01,
  rotation: 0,
  intensity: 0.3,

  // default settings
  speed: 0.2,
  density: 1.5,
  strength: 0.2,
  frequency: 3.0,
  amplitude: 5.0,
}

var uniforms = {
  uTime: { value: 0 },
  uSpeed: { value: settings.speed },
  uNoiseDensity: { value: settings.density },
  uNoiseStrength: { value: settings.strength },
  uFrequency: { value: settings.frequency },
  uAmplitude: { value: settings.amplitude },
  uIntensity: { value: settings.intensity },
  type: { value: settings.type },
  uC1r: { value: settings.color1r },
  uC1g: { value: settings.color1g },
  uC1b: { value: settings.color1b },
  uC2r: { value: settings.color2r },
  uC2g: { value: settings.color2g },
  uC2b: { value: settings.color2b },
  uC3r: { value: settings.color3r },
  uC3g: { value: settings.color3g },
  uC3b: { value: settings.color3b },
  meshCount: { value: settings.meshCount },
  roughness: { value: settings.roughness },
  metalness: { value: settings.metalness },
  normalScale: { value: settings.normalScale },
  rotation: { value: settings.rotation },
  colors: { value: undefined },
}

export class GradientMaterial extends THREE.MeshPhysicalMaterial {
  constructor() {
    super({
      roughness: settings.roughness,
      metalness: settings.metalness,
      side: THREE.DoubleSide,
      clearcoat: 1.0,
      clearcoatRoughness: 0.5,

      normalScale: new THREE.Vector2(
        settings.normalScale,
        settings.normalScale
      ),

      // update the uniform values via userData
      userData: uniforms,
      // @ts-ignore
      onBeforeCompile: (shader) => {
        const colors = this.userData.colors.value
        const uC1 = hexToRgb(colors[0])
        const uC2 = hexToRgb(colors[1])
        const uC3 = hexToRgb(colors[2])

        const meshType = this.userData.meshType

        console.log('meshType', meshType)

        shader.uniforms.uTime = uniforms.uTime
        shader.uniforms.uSpeed = uniforms.uSpeed
        shader.uniforms.uNoiseDensity = uniforms.uNoiseDensity
        shader.uniforms.uNoiseStrength = uniforms.uNoiseStrength
        shader.uniforms.uIntensity = uniforms.uIntensity
        shader.uniforms.uFrequency = uniforms.uFrequency
        shader.uniforms.uAmplitude = uniforms.uAmplitude

        shader.uniforms.uC1r = { value: formatColor(uC1?.r) }
        shader.uniforms.uC1g = { value: formatColor(uC1?.g) }
        shader.uniforms.uC1b = { value: formatColor(uC1?.b) }
        shader.uniforms.uC2r = { value: formatColor(uC2?.r) }
        shader.uniforms.uC2g = { value: formatColor(uC2?.g) }
        shader.uniforms.uC2b = { value: formatColor(uC2?.b) }
        shader.uniforms.uC3r = { value: formatColor(uC3?.r) }
        shader.uniforms.uC3g = { value: formatColor(uC3?.g) }
        shader.uniforms.uC3b = { value: formatColor(uC3?.b) }
        shader.uniforms.rotation = uniforms.rotation
        shader.uniforms.meshCount = uniforms.meshCount
        // material.roughness = settings.roughness
        // material.metalness = settings.metalness;
        // material.normalScale = uniforms.normalScale;
        // console.log(material);

        shader.vertexShader =
          meshType === 'sphere' ? vertexShaderSphere : vertexShader
        shader.fragmentShader = fragmentShader
      },
    })
  }

  get texture1() {
    // @ts-ignore
    return this.uniforms.texture1.value
  }
  set texture1(v) {
    // @ts-ignore
    return (this.uniforms.texture1.value = v)
  }

  get uStrength() {
    // @ts-ignore
    return this.userData.uNoiseStrength.value
  }
  set uStrength(v) {
    // @ts-ignore
    return (this.userData.uNoiseStrength.value = v)
  }

  get uSpeed() {
    // @ts-ignore
    return this.userData.uSpeed.value
  }
  set uSpeed(v) {
    // @ts-ignore
    return (this.userData.uSpeed.value = v)
  }

  get colors() {
    // @ts-ignore
    return this.userData.colors.value
  }
  set colors(v) {
    // @ts-ignore
    return (this.userData.colors.value = v)
  }

  get meshType() {
    // @ts-ignore
    return this.userData.meshType
  }
  set meshType(v) {
    // @ts-ignore
    return (this.userData.meshType = v)
  }
}

extend({ GradientMaterial })
