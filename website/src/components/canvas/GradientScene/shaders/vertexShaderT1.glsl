// #pragma glslify: snoise2 = require(glsl-noise/simplex/2d)
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)
#pragma glslify: cnoise3 = require(glsl-noise/classic/3d) 
// #pragma glslify: pnoise3 = require(glsl-noise/periodic/3d) 

varying vec3 vNormal;

uniform float uTime;
uniform float uSpeed;
uniform float uNoiseDensity;
uniform float uNoiseStrength;
uniform float uFrequency;
uniform float uAmplitude;

varying vec3 vPos;
varying float vDistort;
varying vec3 vViewPosition;

mat3 rotation3dY(float angle) {
  float s = sin(angle);
  float c = cos(angle);

  return mat3(c, 0.0, -s, 0.0, 1.0, 0.0, s, 0.0, c);
}

vec3 rotateY(vec3 v, float angle) { return rotation3dY(angle) * v; }

void main() {
  float t = uTime * uSpeed;
  float distortion = cnoise3((normal + t) * uNoiseDensity) * uNoiseStrength;

  vec3 pos = position + (normal * distortion);
  float angle = sin(uv.y * uFrequency + t) * uAmplitude;
  pos = rotateY(pos, angle);

  vPos = pos;
  vDistort = distortion;

  vNormal = normal;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
}
