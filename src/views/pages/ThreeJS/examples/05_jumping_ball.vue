<template>
  <div></div>
</template>
<script lang="ts" setup>
import * as THREE from 'three'
const scene: THREE.Scene | undefined = inject('scene')
const group = new THREE.Object3D()
scene?.add(group)
// 创建球体
const sphereGeometry = new THREE.SphereGeometry(1, 20, 20)
const material = new THREE.MeshStandardMaterial()
const sphere = new THREE.Mesh(sphereGeometry, material)
// 开启球体的阴影投射
sphere.castShadow = true
group?.add(sphere)

// 创建平面
const planeGeometry = new THREE.PlaneGeometry(10, 10)
const plane = new THREE.Mesh(planeGeometry, material)
plane.position.set(0, -1, 0)
plane.rotation.x = -Math.PI / 2
// 开启接收阴影
plane.receiveShadow = true
group?.add(plane)

// 灯光
// 环境光
const light = new THREE.AmbientLight(0xffffff, 0.5)
group?.add(light)
// 聚光灯光源
const pointLight = new THREE.PointLight(0xff0000, 0.5)
// 开启光线投射
pointLight.castShadow = true
// 设置阴影贴图模糊度
pointLight.shadow.radius = 20
// 设置阴影贴图的分辨率
pointLight.shadow.mapSize.set(512, 512)

// 创建小球
const smallBall = new THREE.Mesh(
  new THREE.SphereGeometry(0.1, 20, 20),
  new THREE.MeshBasicMaterial({ color: 0xff0000 }),
)
smallBall.position.set(2, 2, 2)
// 给小球设置成点光源
smallBall.add(pointLight)
group?.add(smallBall)

const camera: THREE.Camera | undefined = inject('camera')
// 通过设置position来进行移动
camera?.position.set(0, 0, 5)
const clock = new THREE.Clock()
const runCallBack = () => {
  let time = clock.getElapsedTime()
  smallBall.position.x = Math.sin(time) * 3
  smallBall.position.z = Math.cos(time) * 3
  smallBall.position.y = 2 + Math.sin(time * 10)
}
// 更新动画
let requestId = -1
const run = () => {
  requestId = requestAnimationFrame(run)
  runCallBack()
}
const stop = () => {
  cancelAnimationFrame(requestId)
}
onMounted(() => {
  run()
})
onBeforeUnmount(() => {
  stop()
  group.clear()
  scene?.remove(group)
  material.dispose()
  sphereGeometry.dispose()
  planeGeometry.dispose()
  light.dispose()
  pointLight.dispose()
})
</script>
<style lang="scss" scoped>
.viewDiv {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
