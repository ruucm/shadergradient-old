// varying float noise;
// varying vec3 vNormal;
// void main(void) { gl_FragColor = vec4(vNormal * noise, 1.); }

// ------------------------- SIMPLE SHADER -------------------------------
varying vec3 vNormal;
void main(void) { gl_FragColor = vec4(vNormal, 1.); }

// ------------------------- GRADIENT SHADER -------------------------------
// varying vec3 vNormal;
// varying float displacement;

// // uniform vec2 u_resolution;
// // uniform float u_time;

// vec3 cosPalette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
//   return a + b * cos(6.28318 * (c * t + d));
// }

// void main() {
//   float distort = vNormal.z;

//   vec3 brightness = vec3(0.5, 0.5, 0.5);
//   vec3 contrast = vec3(0.5, 0.5, 0.5);
//   vec3 oscilation = vec3(1.0, 1.0, 1.0);
//   vec3 phase = vec3(0.0, 0.1, 0.2);

//   // Pass the distortion as input of cospalette
//   // vec3 color = cosPalette(distort, brightness, contrast, oscilation,
//   // phase);
//   vec3 color = vec3(distort, distort, 0.502);

//   gl_FragColor = vec4(color, 1.0);
// }
// ------------------------- DEBUG SHADER -------------------------------
// varying vec3 vNormal;
// void main(void) {
//   float bug = 1.0;
//   vec4 col = vec4(vNormal, 1.);

//   // if (something)
//   col.x += bug;

//   gl_FragColor = col;
// }
