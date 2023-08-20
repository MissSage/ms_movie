<template>
  <div></div>
</template>
<script lang="ts" setup>
import * as THREE from 'three'
const scene: THREE.Scene | undefined = inject('scene')

const group: THREE.Object3D = new THREE.Object3D()
scene?.add(group)

// 任务1：添加一个平面，并为其中的三角色设置不同的材质
const geometry = new THREE.BufferGeometry()
// 使用索引绘制
const vertices = new Float32Array([
  -1.0, -1.0, 0.0, 1.0, -1.0, 0.0, 1.0, 1.0, 0.0, -1.0, 1.0, 0,
])
// 创建顶点属性
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
// 创建索引,通过索引把平面设置成两个三角形
const indices = new Uint16Array([0, 1, 2, 2, 3, 0])
// 创建索引属性
geometry.setIndex(new THREE.BufferAttribute(indices, 1))

// 设置2个顶点组，形成2个材质
geometry.addGroup(0, 3, 0);
geometry.addGroup(3, 3, 1);

console.log(geometry);

// 创建材质
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  // side: THREE.DoubleSide,
  wireframe: true,
});
const material1 = new THREE.MeshBasicMaterial({
  color: 0xff0000,
});
const plane = new THREE.Mesh(geometry, [material, material1]);
group.add(plane);


// 任务2：添加一个正方体，并为正方体各个面设置不同的颜色
const cubegeometry = new THREE.BoxGeometry(1, 1, 1);
console.log(cubegeometry);
// // 创建材质
const cubematerial0 = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  // wireframe: true,
});
const cubematerial1 = new THREE.MeshBasicMaterial({
  color: 0xff0000,
});
const cubematerial2 = new THREE.MeshBasicMaterial({
  color: 0x0000ff,
});
const cubematerial3 = new THREE.MeshBasicMaterial({
  color: 0xffff00,
});
const cubematerial4 = new THREE.MeshBasicMaterial({
  color: 0x00ffff,
});
const cubematerial5 = new THREE.MeshBasicMaterial({
  color: 0xff00ff,
});
const cube = new THREE.Mesh(cubegeometry, [
  cubematerial0,
  cubematerial1,
  cubematerial2,
  cubematerial3,
  cubematerial4,
  cubematerial5,
]);
// console.log(geometry);

cube.position.x = 2;

// 将网格添加到场景中
group.add(cube);
onBeforeUnmount(() => {
  group.clear()
  scene?.remove(group)
  geometry.dispose()
  material1.dispose()
  material.dispose()
  cubegeometry.dispose()
  cubematerial0.dispose()
  cubematerial1.dispose()
  cubematerial2.dispose()
  cubematerial3.dispose()
  cubematerial4.dispose()
  cubematerial5.dispose()
})
</script>
<style lang="scss" scoped></style>
