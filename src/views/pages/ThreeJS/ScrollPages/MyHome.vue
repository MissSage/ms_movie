<!-- 
银河
 -->
<template>
  <div class="my-home">
    <div class="page page1">
      <h1>THREE.BufferGeometry</h1>
      <h3>应用打造酷炫的三角形</h3>
    </div>
    <div class="page page2">
      <h1>THREE.BufferGeometry</h1>
      <h3>应用打造酷炫的三角形</h3>
    </div>
    <div class="page page3">
      <h1>THREE.BufferGeometry</h1>
      <h3>应用打造酷炫的三角形</h3>
    </div>
  </div>
  <div ref="refDiv" class="viewDiv"></div>
</template>
<script lang="ts" setup>
import * as THREE from 'three'
import { OrbitControls } from '@three-ts/orbit-controls'
import snow from '../icons/snow.svg'
const refDiv = ref<HTMLDivElement>()
// 场景
const scene = new THREE.Scene()
// 相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 40)
// 通过设置position来进行移动
camera.position.set(0, 0, 10)
// 渲染器
const renderer = new THREE.WebGLRenderer()
renderer.shadowMap.enabled = true
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
let points: any = null
let geometry: any = null
let material: any = null
const createPoints = () => {
  geometry = new THREE.BufferGeometry()
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
      (Math.pow(Math.random() * 2 - 1, 3) * (params.radius - distance)) / params.radius
    const randomY =
      (Math.pow(Math.random() * 2 - 1, 3) * (params.radius - distance)) / params.radius
    const randomZ =
      (Math.pow(Math.random() * 2 - 1, 3) * (params.radius - distance)) / params.radius
    positions[current] = Math.cos(branchAngle + distance * params.curveRatio) * distance + randomX
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

  // 材质
  material = new THREE.PointsMaterial({
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
  geometry.deleteAttribute('uv')
  // 点要素
  points = new THREE.Points(geometry, material)

  scene.add(points)
}

// 坐标轴
const controls = new OrbitControls(camera, renderer.domElement)
// 允许拖动后再滑动一段
controls.enableDamping = true
const axisHelper = new THREE.AxesHelper(5)
scene.add(axisHelper)
createPoints()
createPoints()
createPoints()
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
  scene.remove(points)
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
