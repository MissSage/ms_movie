<template>
  <div ref="refDiv" class="viewDiv"></div>
</template>
<script lang="ts" setup>
import * as THREE from 'three'
import { OrbitControls } from '@three-ts/orbit-controls'
import { useGUI } from '@/hooks/gui/useGUI'
const refDiv = ref<HTMLDivElement>()
let requestId = -1
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()
// 聚光灯
// 1. 材质要满足能够对光照有反应
// 2. 开启阴影计算： renderer.shadowMap.enabled = true
renderer.shadowMap.enabled = true
// 3. 设置光照投射阴影： spotLight.castShadow = true
// 4. 设置物体投射阴影： sphere.castShadow = true
// 5. 设置物体接收阴影： plane.receiveShadow = true

// 创建球体
const sphereGeometry = new THREE.SphereGeometry(1, 20, 20)
const material = new THREE.MeshStandardMaterial()
const sphere = new THREE.Mesh(sphereGeometry, material)
// 开启球体的阴影投射
sphere.castShadow = true
scene.add(sphere)

// 创建平面
const planeGeometry = new THREE.PlaneGeometry(10, 10)
const plane = new THREE.Mesh(planeGeometry, material)
plane.position.set(0, -1, 0)
plane.rotation.x = -Math.PI / 2
// 开启接收阴影
plane.receiveShadow = true
scene.add(plane)

// 灯光
// 环境光
const light = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(light)
// 聚光灯光源
const spotLight = new THREE.SpotLight(0xffffff, 0.5)
spotLight.position.set(5, 5, 5)
// 开启光线投射
spotLight.castShadow = true

// 设置透视相机的属性
spotLight.shadow.camera.near = 0.5
spotLight.shadow.camera.far = 500
// 设置阴影贴图模糊度
spotLight.shadow.radius = 20
spotLight.angle = Math.PI / 6
spotLight.distance = 0
spotLight.penumbra = 0
spotLight.decay = 2
// 设置阴影贴图的分辨率
spotLight.shadow.mapSize.set(4096, 4096)
scene.add(spotLight)

// 添加gui属性调节器
const gui = useGUI()
gui.gui
  .add(spotLight.position as any, 'x')
  .min(-20)
  .max(20)
  .step(0.1)
  .onChange(() => {
    spotLight.shadow.camera.updateProjectionMatrix()
  })
gui.gui
  .add(spotLight as any, 'angle')
  .min(0)
  .max(Math.PI / 2)
  .step(0.01)
gui.gui
  .add(spotLight as any, 'distance')
  .min(0)
  .max(10)
  .step(0.01)
gui.gui
  .add(spotLight as any, 'penumbra')
  .min(0)
  .max(1)
  .step(0.01)
gui.gui
  .add(spotLight as any, 'decay')
  .min(0)
  .max(5)
  .step(0.01)
const controlds = new OrbitControls(camera, renderer.domElement)
controlds.enableDamping = true
const axisHelper = new THREE.AxesHelper(5)
scene.add(axisHelper)
// 通过设置position来进行移动
camera.position.set(0, 10, 10)
const run = () => {
  requestId = requestAnimationFrame(run)
  // moveXRepetitive()
  // rotateX()
  // 设置enableDamping需要调用update方法
  controlds.update()
  renderer.render(scene, camera)
}
const resizeDiv = () => {
  if (!refDiv.value) return
  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight
  // 更新摄像头的投影矩阵
  camera.updateProjectionMatrix()
  renderer.setSize(refDiv.value.clientWidth, refDiv.value.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
}
const init = () => {
  resizeDiv()
  refDiv.value?.appendChild(renderer.domElement)
  run()
}
const requestFullscreen = () => {
  if (document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    refDiv.value?.requestFullscreen()
  }
}
onMounted(() => {
  init()
  window.addEventListener('resize', resizeDiv)
  window.addEventListener('dblclick', requestFullscreen)
})
onBeforeUnmount(() => {
  cancelAnimationFrame(requestId)
  window.removeEventListener('resize', resizeDiv)
  window.removeEventListener('dblclick', requestFullscreen)
  scene.clear()
  camera.clear()
  light.dispose()
  spotLight.dispose()
  controlds.dispose()
  material.dispose()
  sphereGeometry.dispose()
  sphere.clear()
  planeGeometry.dispose()
  renderer.dispose()
})
</script>
<style lang="scss" scoped>
.viewDiv {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
