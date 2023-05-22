precision mediump float;
varying vec2 vUv;
varying float vElevation;

uniform float uTime;
uniform float uFrequency;
uniform float uScale;
uniform float uNoiseFrequency;
uniform float uNoiseScale;
uniform float uXZScale;
// 随机函数
float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}
// 噪音函数
float noise(in vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);

    // Four corners in 2D of a tile
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
  vec2 u = f * f * (3.0 - 2.0 * f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners percentages
  return mix(a, b, u.x) +
    (c - a) * u.y * (1.0 - u.x) +
    (d - b) * u.x * u.y;
}
void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vUv = uv;
  float elevation = sin(modelPosition.x * uFrequency) * sin(modelPosition.z * uFrequency * uXZScale);
  elevation += -abs(noise(vec2(modelPosition.xz * uNoiseFrequency + uTime))) * uNoiseScale;
  vElevation = elevation;
  elevation *= uScale;
  modelPosition.y += elevation;
  gl_Position = projectionMatrix * viewMatrix * modelPosition;
}