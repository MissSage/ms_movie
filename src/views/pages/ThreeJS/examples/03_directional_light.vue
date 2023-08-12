<template>
  <div></div>
</template>
<script lang="ts" setup>
import * as THREE from 'three'
import { useGUI } from '@/hooks/gui/useGUI'
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

// 灯光
// 环境光
const light = new THREE.AmbientLight(0xffffff, 0.5)
group?.add(light)
// 直线光源
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
directionalLight.position.set(10, 10, 10)
// 开启光线投射
directionalLight.castShadow = true

// 设置平行光投射相机的属性
directionalLight.shadow.camera.near = 0.5
directionalLight.shadow.camera.far = 500
directionalLight.shadow.camera.top = 5
directionalLight.shadow.camera.bottom = -5
directionalLight.shadow.camera.left = -5
directionalLight.shadow.camera.right = 5
// 设置阴影贴图模糊度
directionalLight.shadow.radius = 20

// 设置阴影贴图的分辨率
directionalLight.shadow.mapSize.set(4096, 4096)
group?.add(directionalLight)

// 添加gui属性调节器
const gui = useGUI()
gui.gui
  .add(directionalLight.shadow.camera as any, 'near')
  .min(0)
  .max(1)
  .step(0.1)
  .onChange(() => {
    directionalLight.shadow.camera.updateProjectionMatrix()
  })
gui.gui
  .add(directionalLight.shadow.camera as any, 'far')
  .min(1)
  .max(1000)
  .step(1)
  .onChange(() => {
    directionalLight.shadow.camera.updateProjectionMatrix()
  })
  gui.gui
  .add(directionalLight.shadow.camera as any, 'top')
  .min(1)
  .max(20)
  .step(1)
  .onChange(() => {
    directionalLight.shadow.camera.updateProjectionMatrix()
  })
  gui.gui
  .add(directionalLight.shadow.camera as any, 'bottom')
  .min(-20)
  .max(-1)
  .step(1)
  .onChange(() => {
    directionalLight.shadow.camera.updateProjectionMatrix()
  })
  gui.gui
  .add(directionalLight.shadow.camera as any, 'left')
  .min(-20)
  .max(-1)
  .step(1)
  .onChange(() => {
    directionalLight.shadow.camera.updateProjectionMatrix()
  })
  gui.gui
  .add(directionalLight.shadow.camera as any, 'right')
  .min(1)
  .max(20)
  .step(1)
  .onChange(() => {
    directionalLight.shadow.camera.updateProjectionMatrix()
  })

gui.gui
  .add(directionalLight.shadow as any, 'radius')
  .min(1)
  .max(100)
  .step(0.1)
  .onChange(() => {
    directionalLight.shadow.camera.updateProjectionMatrix()
  })

onBeforeUnmount(() => {
  group.clear()
  scene?.remove(group)
  sphereGeometry.dispose()
  planeGeometry.dispose()
  material.dispose()
  directionalLight.dispose()
  light.dispose()
})
</script>
<style lang="scss" scoped>
.viewDiv {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
