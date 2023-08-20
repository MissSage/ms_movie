<template>
  <div></div>
</template>
<script lang="ts" setup>
import * as THREE from 'three'
const scene: THREE.Scene | undefined = inject('scene')

const group: THREE.Object3D = new THREE.Object3D()
scene?.add(group)

// 创建几何体
const geometry = new THREE.BufferGeometry()
// 创建顶点数据,顶点是有序的,每三个为一个顶点，逆时针为正面
// 不使用索引时一个正方形最少需要两个三角形，即6个点
// const vertices = new Float32Array([
//   -1.0, -1.0, 0.0, 
//   1.0, -1.0, 0.0,
//   1.0, 1.0, 0.0,

//   1.0, 1.0, 0,
//   -1.0, 1.0, 0,
//   -1.0, -1.0, 0,
// ]);

// 使用索引绘制，可以复用重叠的顶点，以减少顶点数
const vertices = new Float32Array([
  -1.0, -1.0, 0.0,
  1.0, -1.0, 0.0,
  1.0, 1.0, 0.0, 
  -1.0, 1.0, 0,
])
// 创建索引,通过索引把平面设置成两个三角形
const indices = new Uint16Array([
  0, 1, 2,
  2, 3, 0
])
// 创建索引属性
geometry.setIndex(new THREE.BufferAttribute(indices, 1))

// 创建顶点属性
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))

// 创建材质
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  // side: THREE.DoubleSide,
  wireframe: true,
})
const plane = new THREE.Mesh(geometry, material)
group?.add(plane)
plane.position.x = 3

onBeforeUnmount(() => {
  group.clear()
  scene?.remove(group)
  material.dispose()
  geometry.dispose()
})
</script>
<style lang="scss" scoped></style>
