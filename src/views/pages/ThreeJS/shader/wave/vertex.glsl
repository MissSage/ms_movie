// 获取材质中传递进来的时间参数
uniform float uTime;

varying vec2 vUv;
// 高程
varying float vElevation;

void main() {
  vUv = uv;
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  // 尝试进行位置偏移
  // modelPosition.x += 1.0;
  // 旋转
  // modelPosition.z +=modelPosition.x;
  // 三角函数
  modelPosition.z += sin((modelPosition.x + uTime) * 10.0) * 0.05;
  modelPosition.z += sin((modelPosition.y + uTime) * 10.0) * 0.05;
  // 给vElevation赋值
  vElevation = modelPosition.z;

  gl_Position = projectionMatrix * viewMatrix * modelPosition;
}