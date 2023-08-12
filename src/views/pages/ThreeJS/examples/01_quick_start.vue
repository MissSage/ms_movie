<template>
  <div class="quick-start"></div>
</template>
<script lang="ts" setup>
import * as THREE from 'three'

const scene: THREE.Scene | undefined = inject('scene')
const geometry = new THREE.BufferGeometry()
const vertices = new Float32Array([
  -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0,
  1.0, -1.0, 1.0, 1.0,
])
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const mesh = new THREE.Mesh(geometry, material)
scene?.add(mesh)
onBeforeUnmount(() => {
  scene?.remove(mesh)
  material.dispose()
  geometry.dispose()
})
</script>
<style lang="scss" scoped>
.quick-start {
  position: absolute;
  width: 200px;
  height: 100%;
  right: 0;
  top: 0;
}
</style>
