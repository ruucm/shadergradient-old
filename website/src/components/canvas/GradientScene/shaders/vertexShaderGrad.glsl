#pragma glslify: cnoise3 = require(glsl-noise/classic/3d) 
#pragma glslify: pnoise3 = require(glsl-noise/periodic/3d)


mat3 rotation3dY(float angle) {
  float s = sin(angle);
  float c = cos(angle);

  return mat3(c, 0.0, -s, 0.0, 1.0, 0.0, s, 0.0, c);
}

vec3 rotateY(vec3 v, float angle) { return rotation3dY(angle) * v; }

varying vec3 vNormal;
varying float displacement;
varying vec3 vPos;
varying float vDistort;

uniform float uTime;
uniform float uSpeed;
uniform float uNoiseDensity;
uniform float uNoiseStrength;
uniform float uFrequency;

#define STANDARD
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
#ifdef USE_TANGENT
varying vec3 vTangent;
varying vec3 vBitangent;
#endif
#endif
#include <clipping_planes_pars_vertex>
#include <color_pars_vertex>
#include <common>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <morphtarget_pars_vertex>
#include <shadowmap_pars_vertex>
#include <skinning_pars_vertex>
#include <uv2_pars_vertex>
#include <uv_pars_vertex>

void main() {

#include <beginnormal_vertex>
#include <color_vertex>
#include <defaultnormal_vertex>
#include <morphnormal_vertex>
#include <skinbase_vertex>
#include <skinnormal_vertex>
#include <uv2_vertex>
#include <uv_vertex>
#ifndef FLAT_SHADED
  vNormal = normalize(transformedNormal);
#ifdef USE_TANGENT
  vTangent = normalize(transformedTangent);
  vBitangent = normalize(cross(vNormal, vTangent) * tangent.w);
#endif
#endif
#include <begin_vertex>
  float t = uTime * uSpeed;
  float distortion =
      pnoise3((normal + t) * uNoiseDensity, vec3(10.0)) * uNoiseStrength;

  // Disturb each vertex along the direction of its normal
  vec3 pos = position + (normal * distortion);

  // Create a sine wave from top to bottom of the sphere
  // To increase the amount of waves, we'll use uFrequency
  //   float angle = sin(uv.y * uFrequency + t) * uNoiseStrength;
  float displacement = 0.75 * cnoise3(0.43 * position * uFrequency + t);

  //   pos = rotateY(pos, angle);
  pos = position + normal * displacement * uNoiseStrength;
  vPos = pos;

  //--------add displacement------------

#include <clipping_planes_vertex>
#include <displacementmap_vertex>
#include <logdepthbuf_vertex>
#include <morphtarget_vertex>
#include <project_vertex>
#include <skinning_vertex>
  vViewPosition = -mvPosition.xyz;
#include <fog_vertex>
#include <shadowmap_vertex>
#include <worldpos_vertex>
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
}
