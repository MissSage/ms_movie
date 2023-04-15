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
const geometry = new THREE.BufferGeometry()
const vertices = new Float32Array([
  -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0,
])
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)
const controlds = new OrbitControls(camera, renderer.domElement)
controlds.enableDamping = true
const axisHelper = new THREE.AxesHelper(5)
scene.add(axisHelper)
// 通过设置position来进行移动
camera.position.z = 5

const run = () => {
  requestAnimationFrame(run)
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
