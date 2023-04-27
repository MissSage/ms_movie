<template>
  <div ref="refDiv" class="viewDiv"></div>
</template>
<script lang="ts" setup>
import * as THREE from 'three'
import { OrbitControls } from '@three-ts/orbit-controls'

const refDiv = ref<HTMLDivElement>()
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 300)
const renderer = new THREE.WebGLRenderer()
renderer.shadowMap.enabled = true
camera.position.set(0, 0, 20)
scene.add(camera)

// 球
const sphereGeometry = new THREE.SphereGeometry(1, 20, 20)
const sphereMaterial = new THREE.MeshStandardMaterial()
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
sphere.castShadow = true
scene.add(sphere)

// 平面
const floorGeometry = new THREE.PlaneGeometry(20, 20)
const floorMaterial = new THREE.MeshStandardMaterial()
const floor = new THREE.Mesh(floorGeometry, floorMaterial)
floor.position.set(0, -5, 0)
floor.rotation.x = -Math.PI / 2
floor.receiveShadow = true
scene.add(floor)

// 环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

// 平等光
const dirLight = new THREE.DirectionalLight(0xffffff, 0.5)
dirLight.castShadow = true
scene.add(dirLight)

// 坐标轴
const controls = new OrbitControls(camera, renderer.domElement)
// 允许拖动后再滑动一段
controls.enableDamping = true
const axisHelper = new THREE.AxesHelper(5)
scene.add(axisHelper)

// 更新动画
let requestId = -1
// const clock = new THREE.Clock()
const run = () => {
  requestId = requestAnimationFrame(run)
  // let time = clock.getElapsedTime()
  // 设置enableDamping需要调用update方法
  controls.update()
  renderer.render(scene, camera)
}

// 重置画布大小
const resizeDiv = () => {
  if (!refDiv.value) return
  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight
  // 更新摄像头的投影矩阵
  camera.updateProjectionMatrix()
  // 更新渲染器宽高
  renderer.setSize(refDiv.value.clientWidth, refDiv.value.clientHeight)
  // 更新渲染器像素比
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
  scene.remove(axisHelper)
  scene.remove(sphere)
  scene.remove(floor)
  scene.remove(camera)
  scene.remove(ambientLight)
  scene.remove(dirLight)
  axisHelper.dispose()
  controls.dispose()
  camera.clear()
  renderer.dispose()
  scene.clear()
  sphereMaterial.dispose()
  floorMaterial.dispose()
  ambientLight.dispose()
  dirLight.dispose()
})
</script>
<style lang="scss" scoped>
.viewDiv {
  width: 100%;
  height: 100%;
}
</style>
