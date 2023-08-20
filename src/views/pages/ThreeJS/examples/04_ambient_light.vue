<template>
  <div></div>
</template>
<script lang="ts" setup>
import * as THREE from 'three'
import { useGUI } from '@/hooks/gui/useGUI'
import { GUI } from 'dat.gui'
const scene: THREE.Scene | undefined = inject('scene')
const group = new THREE.Object3D()
scene?.add(group)
// 创建球体
const sphereGeometry = new THREE.SphereGeometry(1, 20, 20)
const material = new THREE.MeshStandardMaterial()
const sphere = new THREE.Mesh(sphereGeometry, material)
// 开启球体的阴影投射
sphere.castShadow = true
group?.add(sphere)

// 创建平面
const planeGeometry = new THREE.PlaneGeometry(10, 10)
const plane = new THREE.Mesh(planeGeometry, material)
plane.position.set(0, -1, 0)
plane.rotation.x = -Math.PI / 2
// 开启接收阴影
plane.receiveShadow = true
group?.add(plane)

const camera: THREE.Camera | undefined = inject('camera')
camera?.position.set(0, 10, 10)
// 灯光
// 环境光
const light = new THREE.AmbientLight(0xffffff, 0.5)
group?.add(light)
// 聚光灯光源
const spotLight = new THREE.SpotLight(0xffffff, 0.5)
spotLight.position.set(5, 5, 5)
// 开启光线投射
spotLight.castShadow = true

// 设置透视相机的属性
spotLight.shadow.camera.near = 0.5
spotLight.shadow.camera.far = 500
// 设置阴影贴图模糊度
spotLight.shadow.radius = 20
spotLight.angle = Math.PI / 6
spotLight.distance = 0
spotLight.penumbra = 0
spotLight.decay = 2
// 设置阴影贴图的分辨率
spotLight.shadow.mapSize.set(4096, 4096)
group?.add(spotLight)

// 添加gui属性调节器
const gui: GUI | undefined = inject('gui')
const folder1 = gui?.addFolder('调整光源')
folder1?.open()
folder1
  ?.add(spotLight.position as any, 'x')
  .min(-20)
  .max(20)
  .step(0.1)
  .onChange(() => {
    spotLight.shadow.camera.updateProjectionMatrix()
  })
folder1
  ?.add(spotLight.position as any, 'y')
  .min(-20)
  .max(20)
  .step(0.1)
  .onChange(() => {
    spotLight.shadow.camera.updateProjectionMatrix()
  })
folder1
  ?.add(spotLight.position as any, 'z')
  .min(-20)
  .max(20)
  .step(0.1)
  .onChange(() => {
    spotLight.shadow.camera.updateProjectionMatrix()
  })
folder1
  ?.add(spotLight as any, 'angle')
  .min(0)
  .max(Math.PI / 2)
  .step(0.01)
folder1
  ?.add(spotLight as any, 'distance')
  .min(0)
  .max(10)
  .step(0.01)
folder1
  ?.add(spotLight as any, 'penumbra')
  .min(0)
  .max(1)
  .step(0.01)
folder1
  ?.add(spotLight as any, 'decay')
  .min(0)
  .max(5)
  .step(0.01)
const folder2 = gui?.addFolder('设置小球')
folder2?.open()
folder2
  ?.add(sphere.position as any, 'x')
  .min(-10)
  .max(10)
  .step(0.1)
folder2
  ?.add(sphere.position as any, 'y')
  .min(-10)
  .max(10)
  .step(0.1)
folder2
  ?.add(sphere.position as any, 'z')
  .min(-10)
  .max(10)
  .step(0.1)
onBeforeUnmount(() => {
  group.clear()
  scene?.remove(group)

  light.dispose()
  spotLight.dispose()
  material.dispose()
  sphereGeometry.dispose()
  planeGeometry.dispose()
  folder1 && gui?.removeFolder(folder1)
  folder2 && gui?.removeFolder(folder2)
})
</script>
<style lang="scss" scoped>
.viewDiv {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
