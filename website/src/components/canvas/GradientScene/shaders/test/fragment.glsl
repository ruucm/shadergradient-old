#pragma glslify: halftone = require('glsl-halftone')

uniform float uC1r;
uniform float uC1g;
uniform float uC1b;
uniform float uC2r;
uniform float uC2g;
uniform float uC2b;
uniform float uC3r;
uniform float uC3g;
uniform float uC3b;

varying vec3 vNormal;
varying vec2 vUv;

void main() {
  vec3 color1 = vec3(uC1r, uC1g, uC1b);
  vec3 color2 = vec3(uC2r, uC2g, uC2b);
  vec3 color3 = vec3(uC3r, uC3g, uC3b);

  vec2 st = vUv;
  gl_FragColor.rgb =
      halftone(color1 * vNormal.x + color2 * vNormal.y + color3 * vNormal.z, st, 500.0);
}
