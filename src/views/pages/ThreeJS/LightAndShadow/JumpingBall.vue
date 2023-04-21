<template>
  <div ref="refDiv" class="viewDiv"></div>
</template>
<script lang="ts" setup>
import * as THREE from 'three'
import { OrbitControls } from '@three-ts/orbit-controls'

const refDiv = ref<HTMLDivElement>()
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()
// 点光源
// 1. 材质要满足能够对光照有反应
// 2. 开启阴影计算： renderer.shadowMap.enabled = true
renderer.shadowMap.enabled = true
// 3. 设置光照投射阴影： pointLight.castShadow = true
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
const pointLight = new THREE.PointLight(0xff0000, 0.5)
// pointLight.position.set(2, 2, 2)
// 开启光线投射
pointLight.castShadow = true
// 设置阴影贴图模糊度
pointLight.shadow.radius = 20
// 设置阴影贴图的分辨率
pointLight.shadow.mapSize.set(512, 512)
// scene.add(pointLight)

// 创建小球
const smallBall = new THREE.Mesh(
  new THREE.SphereGeometry(0.1, 20, 20),
  new THREE.MeshBasicMaterial({ color: 0xff0000 }),
)
smallBall.position.set(2, 2, 2)
smallBall.add(pointLight)
scene.add(smallBall)

const controlds = new OrbitControls(camera, renderer.domElement)
controlds.enableDamping = true
const axisHelper = new THREE.AxesHelper(5)
scene.add(axisHelper)
// 通过设置position来进行移动
camera.position.set(0, 0, 5)
const clock = new THREE.Clock()
const run = () => {
  requestAnimationFrame(run)
  let time = clock.getElapsedTime()
  smallBall.position.x = Math.sin(time) * 3
  smallBall.position.z = Math.cos(time) * 3
  smallBall.position.y = 2 + Math.sin(time * 10)
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

onMounted(() => {
  init()
  window.addEventListener('resize', () => {
    // 更新渲染器
    resizeDiv()
  })
  window.addEventListener('dblclick', () => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      renderer.domElement.requestFullscreen()
    }
  })
})
</script>
<style lang="scss" scoped>
.viewDiv {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
