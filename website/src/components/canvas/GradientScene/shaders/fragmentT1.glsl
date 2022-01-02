// #define FOG_START 100
// #define FOG_END 500

// uniform mat4 projection;
// uniform mat4 view;
// uniform mat4 model;

// attribute vec3 position;
// varying float fogAmount;

// #pragma glslify: fog_linear = require(glsl-fog/linear)

// varying vec3 vNormal;
// // void main(void) { gl_FragColor = vec4(vNormal, 1.); }


// void main() {
//   gl_Position = projection * view * model * vec4(positon, 1.0);
//   float fogDistance = length(gl_Position.xyz);
//   fogAmount = fog_linear(fogDistance, FOG_START, FOG_END);

//   gl_FragColor = vec4(vNormal, 1.);
// }


// #ifdef GL_ES
// precision highp float;
// #endif
 
// // varying vec2 st; // Texcoords
 
// void main() {
//     // Distance to nearest point in a grid of
//     // (frequency x frequency) points over the unit square
//     float frequency = 10.0;
//     vec2 nearest = 2.0*fract(frequency * 0.5) - 1.0;
//     float dist = length(nearest);
//     float radius = 0.5;
//     vec3 white = vec3(1.0, 1.0, 1.0);
//     vec3 black = vec3(0.0, 0.0, 0.0);
//     vec3 fragcolor = mix(black, white, step(radius, dist));
//     gl_FragColor = vec4(fragcolor, 1.0);
// }



precision highp float;
 
#ifdef GL_OES_standard_derivatives
#extension GL_OES_standard_derivatives : enable
#endif
 
varying vec2 vUv;
varying vec3 vNormal;
varying float vDistort;

uniform vec2 iResolution;
uniform sampler2D u_sampler;

uniform float uC1r;
uniform float uC1g;
uniform float uC1b;
uniform float uC2r;
uniform float uC2g;
uniform float uC2b;
uniform float uC3r;
uniform float uC3g;
uniform float uC3b;
 
#pragma glslify: halftone = require('glsl-halftone') 


vec3 cosPalette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
  return a + b * cos(6.28318 * (c * t + d));
}   
 
void main() {
  //sample from texture; optionally using manual bilinear filtering 
  vec4 texcolor = texture2D(u_sampler, vUv);
 
  //aspect corrected texture coordinates 
  vec2 st = vec2(0.2, 0.5);
  st.x *= iResolution.x / iResolution.y;



  vec3 brightness = vec3(0.5, 0.5, 0.5);
  vec3 contrast = vec3(0.5, 0.5, 0.5);
  vec3 oscilation = vec3(1.0, 1.0, 1.0);
  vec3 phase = vec3(0.0, 0.1, 0.2);

  // Pass the distortion as input of cospalette
  vec3 color = cosPalette(vDistort, brightness, contrast, oscilation, phase);

 
  //apply halftone effect 
  // gl_FragColor.rgb = halftone(vec3(uC1r, uC1g, uC1b), st);
  // gl_FragColor.rgb = halftone(vec3(uC1r, uC1g, uC1b) * vNormal, st);
  // gl_FragColor.rgb = vec3(uC1r, uC1g, uC1b) * vNormal;
  // gl_FragColor.rgb = color;
  gl_FragColor.rgb = vec3(uC1r, uC1g, uC1b) * color;
  gl_FragColor.a = 1.;


  // gl_FragColor = vec4(vNormal, 1.);
}