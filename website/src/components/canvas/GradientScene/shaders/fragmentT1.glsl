// #pragma glslify: snoise2 = require(glsl-noise/simplex/2d)

// void main() {
//   float brightness = snoise2(gl_FragCoord.xy);

//   gl_FragColor = vec4(vec3(brightness), 1.);
// }

varying vec3 vNormal;
void main(void) { gl_FragColor = vec4(vNormal, 1.); }
