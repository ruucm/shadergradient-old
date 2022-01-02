uniform float uC1r;
uniform float uC1g;
uniform float uC1b;
uniform float uC2r;
uniform float uC2g;
uniform float uC2b;
uniform float uC3r;
uniform float uC3g;
uniform float uC3b;

struct Vertex {
  float x;
  float y;
  vec3 color;
};
uniform Vertex vertices[4];
varying vec2 vUv;
varying vec3 fNormal;
vec3 overlayBlending(vec3 color1, vec3 color2) {
  float r = (uC1r >= 0.5) ? 1.0 - 2.0 * (1.0 - uC1r) * (1.0 - color2.r)
                          : (2.0 * uC1r * color2.r);
  float g = (uC1g >= 0.5) ? 1.0 - 2.0 * (1.0 - uC1g) * (1.0 - color2.g)
                          : (2.0 * uC1g * color2.g);
  float b = (color1.b >= 0.5) ? 1.0 - 2.0 * (1.0 - color1.b) * (1.0 - color2.b)
                              : (2.0 * color1.b * color2.b);
  return vec3(r, g, b);
}
vec3 screenBlending(vec3 color1, vec3 color2) {
  float r = 1.0 - (1.0 - color2.r) * (1.0 - uC1r);
  float g = 1.0 - (1.0 - color2.g) * (1.0 - uC1g);
  float b = 1.0 - (1.0 - color2.b) * (1.0 - color1.b);
  return vec3(r, g, b);
}
#define PI 3.14159365
#define TAU 6.28318531
const vec3 wref = vec3(1, 1, 1);
float xyzF(float t) {
  return mix(pow(t, 1. / 3.), 7.787037 * t + 0.139731, step(t, 0.00885645));
}
float xyzR(float t) {
  return mix(t * t * t, 0.1284185 * (t - 0.139731), step(t, 0.20689655));
}
vec3 rgb2lch(in vec3 c) {
  c *= mat3(0.4124, 0.3576, 0.1805, 0.2126, 0.7152, 0.0722, 0.0193, 0.1192,
            0.9505);
  c.x = xyzF(c.x / wref.x);
  c.y = xyzF(c.y / wref.y);
  c.z = xyzF(c.z / wref.z);
  vec3 lab = vec3(max(0., 116.0 * c.y - 16.0), 500.0 * (c.x - c.y),
                  200.0 * (c.y - c.z));
  return vec3(lab.x, length(vec2(lab.y, lab.z)), atan(lab.z, lab.y));
}
vec3 lch2rgb(in vec3 c) {
  c = vec3(c.x, cos(c.z) * c.y, sin(c.z) * c.y);
  float lg = 1. / 116. * (c.x + 16.);
  vec3 xyz = vec3(wref.x * xyzR(lg + 0.002 * c.y), wref.y * xyzR(lg),
                  wref.z * xyzR(lg - 0.005 * c.z));
  vec3 rgb = xyz * mat3(3.2406, -1.5372, -0.4986, -0.9689, 1.8758, 0.0415,
                        0.0557, -0.2040, 1.0570);
  return rgb;
}
float lerpAng(in float a, in float b, in float x) {
  float ang = mod(mod((a - b), TAU) + PI * 3., TAU) - PI;
  return ang * x + b;
}
vec3 lerpLch(in vec3 a, in vec3 b, in float x) {
  float hue = lerpAng(a.z, b.z, x);
  return vec3(mix(b.xy, a.xy, x), hue);
}
const float gamma = 2.4;
vec3 lin2srgb(vec3 c) { return pow(c, vec3(1.0 / gamma)); }
vec3 cosPalette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
  return a + b * cos(6.28318 * (c * t + d));
}
void main() {
  vec3 color = vec3(0, 0, 0);
  float sumDistance = 0.0;
  float distort = fNormal.z;
  for (int i = 0; i < 4; i++) {
    float currentDistance =
        pow(vertices[i].y - vUv.y, 2.0) + pow(vertices[i].x - vUv.x, 2.0);
    sumDistance += currentDistance;
  }
  float t = 0.0;
  for (int i = 0; i < 4; i++) {
    float currentDistance =
        pow(vertices[i].y - vUv.y, 2.0) + pow(vertices[i].x - vUv.x, 2.0);
    float inverseDistance = 1.0 / (currentDistance / sumDistance);
    t += inverseDistance;
  }
  vec3 brightness = vec3(0.5, 0.5, 0.5);
  vec3 contrast = vec3(0.5, 0.5, 0.5);
  vec3 oscilation = vec3(1.0, 1.0, 1.0);
  vec3 phase = vec3(0.0, 0.1, 0.2);
  for (int i = 0; i < 4; i++) {
    float currentDistance =
        pow(vertices[i].y - vUv.y, 2.0) + pow(vertices[i].x - vUv.x, 2.0);
    float inverseDistance = 1.0 / (currentDistance / sumDistance);
    float weight = inverseDistance / t;
    weight = smoothstep(0.0, 1.0, weight);
    color = screenBlending(color + distort / 30.0, vertices[i].color * weight);
  }
  color = lin2srgb(color);
  gl_FragColor = vec4(color.rgb, 1.0);
}
