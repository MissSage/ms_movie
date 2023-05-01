<template>
  <div ref="refDiv" class="viewDiv"></div>
</template>
<script lang="ts" setup>
import * as THREE from 'three'
import { OrbitControls } from '@three-ts/orbit-controls'
// 顶点着色器
import basicVertexShader from '@/assets/shader/basic/vertex.glsl?raw'
import basicFragmentShader from '@/assets/shader/basic/fragment.glsl?raw'

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
camera.position.set(0, 0, 10)
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

// 平面
const floorGeometry = new THREE.PlaneGeometry(1, 1)
// 设置平面材质
// const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 })
// 自己编写着色器材质,
// 1. 至少要设置顶点着色器（vertexShader）和片元着色器（fragmentShader）
// 2. 位置需要经过转换才能与坐标同步移动
//    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0)
//    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0)
//    gl_Position = 投影矩阵 * 视图矩阵 * 模型矩阵 * 顶点坐标
//    相乘的顺序不能变
//    物体本身拥有的坐标系，叫本地坐标系，要想把物体放到世界坐标系中，就需要模型矩阵，即可拥有绽放、平移、旋转的能力，此时物体即具有了世界坐标系
//    再结合视图矩阵，就有了视点坐标，观察点坐标和上方向
//    然后就是投影矩阵，使物体进行呈现
const floorMaterial = new THREE.ShaderMaterial({
  vertexShader: basicVertexShader,
  fragmentShader: basicFragmentShader,
})

const floor = new THREE.Mesh(floorGeometry, floorMaterial)
floor.position.set(0, 0, 0)
// floor.rotation.x = -Math.PI / 2
floor.receiveShadow = true
scene.add(floor)

let requestId = -1
/**
 * 更新动画
 */
const run = () => {
  requestId = requestAnimationFrame(run)
  // let time = clock.getElapsedTime()

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
