precision mediump float;
varying vec2 vUv;
varying float vElevation;
uniform float uTime;
uniform float uScale;

#define PI 3.1415926535897932384626433832795;

void main() {
  float deep= (vElevation + 1.0) / 2.0;
  gl_FragColor = vec4(1.0 * deep, 1.0 * deep, 0.0, 1.0);
}