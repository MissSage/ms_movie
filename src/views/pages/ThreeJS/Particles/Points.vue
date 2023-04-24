<!-- 
球与粒子
 -->
<template>
  <div ref="refDiv" class="viewDiv"></div>
</template>
<script lang="ts" setup>
import * as THREE from 'three'
import { OrbitControls } from '@three-ts/orbit-controls'
import { useGUI } from '@/hooks'
const refDiv = ref<HTMLDivElement>()
// 场景
const scene = new THREE.Scene()
// 相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
// 通过设置position来进行移动
camera.position.z = 5
// 渲染器
const renderer = new THREE.WebGLRenderer()
renderer.shadowMap.enabled = true
// 几何
const geometry = new THREE.SphereGeometry(3, 30, 30)

// 载入纹理
const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load('/data/snow.png')
// 材质
const material = new THREE.PointsMaterial({
  map: texture,
  alphaMap: texture,
  depthWrite: false,
  transparent: true,
  blending: THREE.AdditiveBlending,
  size: 0.1,
  sizeAttenuation: true,
})
// 点要素
const points = new THREE.Points(geometry, material)
scene.add(points)

// 坐标轴
const controls = new OrbitControls(camera, renderer.domElement)
// 允许拖动后再滑动一段
controls.enableDamping = true
const axisHelper = new THREE.AxesHelper(5)
scene.add(axisHelper)

const gui = useGUI()

gui.gui.add(controls as any, 'autoRotate')
gui.gui.add(controls as any, 'autoRotateSpeed', 0.1, 10, 0.01)
gui.gui.add(material as any, 'size', 0.01, 0.1, 0.001)
gui.gui.add(material as any, 'sizeAttenuation')
gui.gui.add(material as any, 'depthWrite')
gui.gui.add(material as any, 'transparent')
// 更新动画
let requestId = -1
const run = () => {
  requestId = requestAnimationFrame(run)
  // moveXRepetitive()
  // rotateX()
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
  scene.remove(points)
  geometry.dispose()
  material.dispose()
  scene.remove(axisHelper)
  axisHelper.dispose()
  controls.dispose()
  camera.clear()
  renderer.dispose()
  scene.clear()
})
</script>
<style lang="scss" scoped>
.viewDiv {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
