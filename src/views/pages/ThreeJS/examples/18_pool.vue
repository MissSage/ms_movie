<template>
  <div></div>
</template>
<script lang="ts" setup>
import * as THREE from 'three'
import { Water } from 'three/examples/jsm/objects/Water2'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

/********************************* 场景 */
const scene: THREE.Scene | undefined = inject('scene')
const group = new THREE.Object3D()
scene?.add(group)
const camera: THREE.Camera | undefined = inject('camera')
camera?.position.set(0, 0, 2)

/******************************* 光源 */
// 环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
group.add(ambientLight)

// 平行光
const dirLight = new THREE.DirectionalLight(0xffffff, 0.5)
dirLight.castShadow = true
group.add(dirLight)

// 水波
const water = new Water(new THREE.PlaneGeometry(1, 1, 1024, 1024), {
  color: '#ffffff',
  scale: 1,
  flowDirection: new THREE.Vector2(1, 1),
  textureHeight: 1024,
  textureWidth: 1024,
})
water.rotation.x = -Math.PI / 2
group.add(water)
let oldBackground: any
let oldEnv: any
// 加载场景
const rgbeLoader = new RGBELoader()
if (scene) {
  rgbeLoader.loadAsync('/hdrs/satan.hdr').then((texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping
    oldBackground = scene.background
    oldEnv = scene.environment
    scene.background = texture
    scene.environment = texture
  })
}

onBeforeUnmount(() => {
  group.clear()
  scene?.remove(group)
  ambientLight.dispose()
  dirLight.dispose()
  if(scene){
    scene.environment = oldEnv
    scene.background = oldBackground
  }
})
</script>
<style lang="scss" scoped>
.viewDiv {
  width: 100%;
  height: 100%;
}
</style>
