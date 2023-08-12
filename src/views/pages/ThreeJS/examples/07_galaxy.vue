<!-- 
银河
 -->
<template>
  <div></div>
</template>
<script lang="ts" setup>
import * as THREE from 'three'
import snow from '../icons/snow.svg'
// 场景
const scene: THREE.Scene | undefined = inject('scene')
const camera: THREE.Camera | undefined = inject('camera')
camera?.position.set(0, 0, 10)
const group = new THREE.Object3D()
scene?.add(group)
// 载入纹理
const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load(snow)
// 几何
const params = {
  size: 0.1,
  radius: 5,
  color: '#ff6030',
  branch: 3,
  count: 1000,
  curveRatio: 0.3,
  endColor: '#1b3984',
}
// 材质
const material = new THREE.PointsMaterial({
  map: texture,
  alphaMap: texture,
  depthWrite: false,
  transparent: true,
  blending: THREE.AdditiveBlending,
  size: params.size,
  sizeAttenuation: true,
  // 启用顶点设置
  vertexColors: true,
})
const createPoints = () => {
  const geometry = new THREE.BufferGeometry()
  // 几何顶点位置
  const count = params.count
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const centerColor = new THREE.Color(params.color)
  const endColor = new THREE.Color(params.endColor)
  for (let i = 0; i < count; i++) {
    const branchAngle = (i % params.branch) * ((2 * Math.PI) / params.branch)

    // 当前点距离圆心的距离
    const distance = Math.pow(Math.random(), 3) * params.radius
    const current = i * 3
    const randomX =
      (Math.pow(Math.random() * 2 - 1, 3) * (params.radius - distance)) /
      params.radius
    const randomY =
      (Math.pow(Math.random() * 2 - 1, 3) * (params.radius - distance)) /
      params.radius
    const randomZ =
      (Math.pow(Math.random() * 2 - 1, 3) * (params.radius - distance)) /
      params.radius
    positions[current] =
      Math.cos(branchAngle + distance * params.curveRatio) * distance + randomX
    positions[current + 1] = 0 + randomY
    positions[current + 2] =
      Math.sin(branchAngle + distance * params.curveRatio) * distance + randomZ
    const mixColor = centerColor.clone()
    mixColor.lerp(endColor, distance / params.radius)
    colors[current] = mixColor.r
    colors[current + 1] = mixColor.g
    colors[current + 2] = mixColor.b
  }
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  geometry.deleteAttribute('uv')
  // 点要素
  const points = new THREE.Points(geometry, material)

  group.add(points)
}
createPoints()
createPoints()
createPoints()
onBeforeUnmount(() => {
  scene?.remove(group)
  texture.dispose()
  material.dispose()
})
</script>
<style lang="scss" scoped>
.viewDiv {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: black;
}
</style>
