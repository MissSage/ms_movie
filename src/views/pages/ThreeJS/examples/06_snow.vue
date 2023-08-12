<!-- 
漫天雪花
 -->
<template>
  <div></div>
</template>
<script lang="ts" setup>
import * as THREE from 'three'
import snow from '../icons/snow.svg'
// 场景
const scene:THREE.Scene|undefined = inject('scene')
// 相机
const camera:THREE.Camera|undefined = inject('camera')
// 通过设置position来进行移动
camera?.position.set(0, 0, 80)

// 几何
const createPoints = (url: string, size = 0.5) => {
  const geometry = new THREE.BufferGeometry()
  // 几何顶点位置
  const count = 10000
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 200
    colors[i] = Math.random()
  }
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  // 载入纹理
  const textureLoader = new THREE.TextureLoader()
  const texture = textureLoader.load(url)
  // 材质
  const material = new THREE.PointsMaterial({
    map: texture,
    alphaMap: texture,
    depthWrite: false,
    transparent: true,
    blending: THREE.AdditiveBlending,
    size: size,
    sizeAttenuation: true,
    // 启用顶点设置
    vertexColors: true,
  })
  geometry.deleteAttribute('uv')
  // 点要素
  const points = new THREE.Points(geometry, material)

  scene?.add(points)
  return points
}

const points = createPoints(snow, 0.5)
const points1 = createPoints(snow, 0.5)
const points2 = createPoints(snow, 1.5)
// 更新动画
let requestId = -1
const clock = new THREE.Clock()
const run = () => {
  requestId = requestAnimationFrame(run)
  let time = clock.getElapsedTime()
  points.rotation.x = time * 0.3
  points1.rotation.x = time * 0.3
  points1.rotation.y = time * 0.2
  points2.rotation.x = time * 0.2
  points2.rotation.y = time * 0.1
}
onMounted(() => {
  run()
})
onBeforeUnmount(() => {
  cancelAnimationFrame(requestId)
  scene?.remove(points)
  scene?.remove(points1)
  scene?.remove(points2)
  points1.clear()
  points2.clear()
  points.clear()
})
</script>
<style lang="scss" scoped>
.viewDiv {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
