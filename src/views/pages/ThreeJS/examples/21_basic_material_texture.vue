<template>
  <div class="loading-box">
    <template v-for="(item, i) in textureLoadings" :key="i">
      <div v-if="item" class="loading-item">{{ i }} is loading...</div>
    </template>
  </div>
</template>
<script lang="ts" setup>
/**
 * 基础材质，需要受光照才会亮，不然显示成黑色
 */
import { GUI } from 'dat.gui'
import * as THREE from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
const textureLoadings = reactive<{
  basic: boolean
  ao: boolean
  alpha: boolean
  light: boolean
  specular: boolean
  rgbae: boolean
}>({
  basic: false,
  ao: false,
  alpha: false,
  light: false,
  specular: false,
  rgbae: false,
})
const scene: THREE.Scene | undefined = inject('scene')
const group: THREE.Object3D = new THREE.Object3D()
scene?.add(group)

// 创建纹理加载器
let textureLoader = new THREE.TextureLoader()
// 加载纹理
let texture = textureLoader.load(
  window.SITE_CONFIG.urls.files +
    '/textures/watercover/CityNewYork002_COL_VAR1_1K.png',
  (t) => {
    // 如果渲染出来和原图有色差，那么应该是颜色空间的问题，需要修改贴图的编码
    // 关于encoding的内容，可以参考这个链接: https://blog.csdn.net/WQH_Boss/article/details/127550982
    t.encoding = THREE.sRGBEncoding
    textureLoadings.basic = false
  },
  ()=>textureLoadings.basic = true,
  () => {
    textureLoadings.basic = false
  },
)
// 加载ao贴图
let aoMap = textureLoader.load(
  window.SITE_CONFIG.urls.files +
    '/textures/watercover/CityNewYork002_AO_1K.jpg',
  () => {
    textureLoadings.ao = false
  },
  ()=>textureLoadings.ao = true,
  () => {
    textureLoadings.ao = false
  },
)

// 透明度贴图
let alphaMap = textureLoader.load(
  window.SITE_CONFIG.urls.files + '/textures/door/height.jpg',
  () => {
    textureLoadings.alpha = false
  },
  ()=>textureLoadings.alpha = true,
  () => {
    textureLoadings.alpha = false
  },
)

// 光照贴图
let lightMap = textureLoader.load(
  window.SITE_CONFIG.urls.files + '/textures/colors.png',
  () => {
    textureLoadings.light = false
  },
  ()=>textureLoadings.light = true,
  () => {
    textureLoadings.light = false
  },
)

// 高光贴图
let specularMap = textureLoader.load(
  window.SITE_CONFIG.urls.files +
    '/textures/watercover/CityNewYork002_GLOSS_1K.jpg',
  () => {
    textureLoadings.specular = false
  },
  ()=>textureLoadings.specular = true,
  () => {
    textureLoadings.specular = false
  },
)

// rgbeLoader 加载hdr贴图
let rgbeLoader = new RGBELoader()
let oldEnv = scene?.environment ?? null
let oldBack = scene?.background ?? null
rgbeLoader.load(
  window.SITE_CONFIG.urls.files + '/textures/Alex_Hart-Nature_Lab_Bones_2k.hdr',
  (envMap) => {
    textureLoadings.rgbae = false
    if (!scene) return
    // 设置球形贴图
    envMap.mapping = THREE.EquirectangularReflectionMapping
    // 设置环境贴图
    scene.background = envMap
    // 设置环境贴图
    scene.environment = envMap
    // 设置plane的环境贴图
    planeMaterial.envMap = envMap
  },
  ()=>textureLoadings.rgbae = true,
  () => {
    textureLoadings.rgbae = false
  },
)

let planeGeometry = new THREE.PlaneGeometry(1, 1)
let planeMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  map: texture,
  // 允许透明
  transparent: true,
  // 设置ao贴图
  aoMap: aoMap,
  aoMapIntensity: 1,
  // 透明度贴图
  alphaMap: alphaMap,
  // // 设置光照贴图
  lightMap: lightMap,
  // // 设置高光贴图
  specularMap: specularMap,
  reflectivity: 0.5,
  side: THREE.DoubleSide
})
// planeMaterial.map = texture;
let plane = new THREE.Mesh(planeGeometry, planeMaterial)
group.add(plane)
const gui: GUI | undefined = inject('gui')
const folder = gui?.addFolder('环境参数设置')
folder?.open()
folder?.add(planeMaterial, 'aoMapIntensity').min(0).max(1).name('ao强度')
folder?.add(planeMaterial, 'reflectivity').min(0).max(1).name('反射强度')
folder?.add(texture, 'encoding',{
  sRGB: THREE.sRGBEncoding,
  Linear: THREE.LinearEncoding
}).onChange(()=>{
  texture.needsUpdate = true
})
onBeforeUnmount(() => {
  folder && gui?.removeFolder(folder)
  if (scene) {
    scene.environment = oldEnv
    scene.background = oldBack
  }
  group.clear()
  scene?.remove(group)
})
</script>
<style lang="scss" scoped>
.loading-box{
  padding: 20px;
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: #fff;
}
</style>
