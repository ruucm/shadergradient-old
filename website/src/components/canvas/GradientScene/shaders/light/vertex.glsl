#pragma glslify: cnoise3 = require(glsl-noise/classic/3d)

uniform float uTime;
uniform float uSpeed;
uniform float uNoiseDensity;
uniform float uNoiseStrength;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vViewPosition;

void main() {
  float t = uTime * uSpeed;
  float distortion = cnoise3((normal + t) * uNoiseDensity) * uNoiseStrength;

  vec3 pos = position + (normal * distortion);

  vUv = uv;
  vNormal = normal;
  vViewPosition = -position.xyz;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
}
