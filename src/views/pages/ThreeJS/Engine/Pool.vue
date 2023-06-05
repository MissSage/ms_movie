<template>
  <div ref="refDiv" class="viewDiv"></div>
</template>
<script lang="ts" setup>
import * as THREE from 'three'
import { OrbitControls } from '@three-ts/orbit-controls'
import { Water } from 'three/examples/jsm/objects/Water2'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
// 水池
const refDiv = ref<HTMLDivElement>()

/********************************* 场景 */
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  300,
)
const renderer = new THREE.WebGLRenderer()
renderer.shadowMap.enabled = true
camera.position.set(0, 0, 2)
scene.add(camera)

/******************************* 光源 */
// 环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

// 平行光
const dirLight = new THREE.DirectionalLight(0xffffff, 0.5)
dirLight.castShadow = true
scene.add(dirLight)

/***************************** 坐标轴 */
const controls = new OrbitControls(camera, renderer.domElement)
// 允许拖动后再滑动一段
controls.enableDamping = true
const axisHelper = new THREE.AxesHelper(5)
scene.add(axisHelper)

// const params = {
//   uFrequency: 14,
//   uScale: 0.03,
//   uXZScale: 1.5,
//   uNoiseFrequency: 10,
//   uNoiseScale: 1.5,
// }
// 水波
const water = new Water(new THREE.PlaneGeometry(1, 1, 1024, 1024), {
  color: '#ffffff',
  scale: 1,
  flowDirection: new THREE.Vector2(1, 1),
  textureHeight: 1024,
  textureWidth: 1024,
})
water.rotation.x = -Math.PI / 2
scene.add(water)

// 加载场景
const rgbeLoader = new RGBELoader()
rgbeLoader.loadAsync('/hdrs/satan.hdr').then(texture=>{
  texture.mapping = THREE.EquirectangularReflectionMapping
  scene.background = texture
  scene.environment = texture
})
// const clock = new THREE.Clock()
let requestId = -1
/**
 * 更新动画
 */
const run = () => {
  requestId = requestAnimationFrame(run)
  // let time = clock.getElapsedTime()

  // 给材质传递时间参数，让材质动起来
  // floorMaterial.uniforms.uTime.value = time
  // 设置enableDamping需要调用update方法
  controls.update()
  renderer.render(scene, camera)
}

/**
 * 重置画布大小
 */
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
  // window.addEventListener('dblclick', requestFullscreen)
})
onBeforeUnmount(() => {
  cancelAnimationFrame(requestId)
  window.removeEventListener('resize', resizeDiv)
  window.removeEventListener('dblclick', requestFullscreen)
  scene.remove(axisHelper)
  scene.remove(camera)
  scene.remove(ambientLight)
  scene.remove(dirLight)
  axisHelper.dispose()
  controls.dispose()
  camera.clear()
  renderer.dispose()
  scene.clear()
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
