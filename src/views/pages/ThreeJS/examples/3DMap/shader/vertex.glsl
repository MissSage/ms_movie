uniform float uTime; // 时间变量
varying vec2 vUv;
void main() {
  vUv = uv;
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  float offset = sin(modelPosition.x + modelPosition.y + modelPosition.z + uTime);
  // 对线条进行错位偏移
  modelPosition.xyz += offset * 0.2 * normal;
  gl_Position = projectionMatrix * viewMatrix * modelPosition;
}