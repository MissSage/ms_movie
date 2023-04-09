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
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)
const controlds = new OrbitControls(camera, renderer.domElement)
const axisHelper = new THREE.AxesHelper(5)
scene.add(axisHelper)
camera.position.z = 5
const moveXRepetitive = () => {
  cube.position.x += 0.01
  if (cube.position.x > 5) {
    cube.position.x = 0
  }
}
const rotateX = () => {
  cube.rotation.x += 0.01
}
const run = () => {
  requestAnimationFrame(run)

  // cube.rotation.x += 0.01
  // cube.rotation.y += 0.01
  moveXRepetitive()
  rotateX()
  controlds.update()
  renderer.render(scene, camera)
}
const init = () => {
  if (!refDiv.value) return
  renderer.setSize(refDiv.value.clientWidth, refDiv.value.clientHeight)
  refDiv.value?.appendChild(renderer.domElement)
  run()
}
onMounted(() => {
  init()
})
</script>
<style lang="scss" scoped>
.viewDiv {
  width: 100%;
  height: 100%;
}
</style>
