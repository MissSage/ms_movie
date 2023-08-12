<!-- 
鼠标悬浮切换物体样式
 -->
<template>
  <div class="three-box">
    <div ref="refDiv" class="viewDiv"></div>
    <router-view></router-view>
  </div>
</template>
<script lang="ts" setup>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
const refDiv = ref<HTMLDivElement>(document.createElement('div'))
// 场景
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x000000)
// 相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  3000,
)
// 通过设置position来进行移动
camera.position.set(0, 0, 10)
// 渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
})
// 开启灯光与阴影
// 1. 材质要满足能够对光照有反应
// 2. 开启阴影计算： renderer.shadowMap.enabled = true
renderer.shadowMap.enabled = true
// 3. 设置光照投射阴影： directionalLight.castShadow = true
// 4. 设置物体投射阴影： sphere.castShadow = true
// 5. 设置物体接收阴影： plane.receiveShadow = true

// 坐标轴
const controls = new OrbitControls(camera, renderer.domElement)
// 允许拖动后再滑动一段
controls.enableDamping = true
controls.enablePan = true
// 坐标辅助器
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
const stop = () => {
  cancelAnimationFrame(requestId)
}
// 重置画布大小
const resizeDiv = () => {
  if (!refDiv.value) return
  // 更新摄像头
  camera.aspect = refDiv.value.clientWidth / refDiv.value.clientHeight
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

provide('scene', scene)
provide('camera', camera)
provide('renderer', renderer)
provide('controls', controls)
const observer = new ResizeObserver(resizeDiv)
onMounted(() => {
  init()
  observer.observe(refDiv.value)
  refDiv.value?.addEventListener('dblclick', requestFullscreen)
})
onBeforeUnmount(() => {
  stop()
  observer.disconnect()
  refDiv.value?.removeEventListener('dblclick', requestFullscreen)
  scene.remove(axisHelper)
  axisHelper.dispose()
  controls.dispose()
  camera.clear()
  renderer.dispose()
  scene.clear()
})
</script>
<style lang="scss" scoped>
.three-box,
.viewDiv {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: var(--el-bg-color-page);
}
</style>
