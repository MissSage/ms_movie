<template>
  <div></div>
</template>
<script lang="ts" setup>
import * as THREE from 'three'
// 控制顶点打造波纹效果
import vertexShader from '../shader/deep/vertex.glsl?raw'
import fragmentShader from '../shader/deep/fragment.glsl?raw'
import image_404 from '@/assets/images/404.png'
import { useGUI } from '@/hooks'

/********************************* 场景 */
const scene:THREE.Scene|undefined = inject('scene')
const group = new THREE.Object3D()
scene?.add(group)
const camera:THREE.Camera|undefined = inject('camera')
camera?.position.set(0, 0, 10)

/******************************* 光源 */
// 环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
group.add(ambientLight)

// 平行光
const dirLight = new THREE.DirectionalLight(0xffffff, 0.5)
dirLight.castShadow = true
group.add(dirLight)

// 加载纹理
const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load(image_404)
const params = {
  uScale: 0.5,
}
// 平面
const floorGeometry = new THREE.PlaneGeometry(1, 1, 64, 64)
// 设置平面材质
// const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 })
// 创建原始着色器材质,
// 1. 至少要设置顶点着色器（vertexShader）和片元着色器（fragmentShader）
// 2. 位置需要经过转换才能与坐标同步移动
//    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0)
//    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0)
//    gl_Position = 投影矩阵 * 视图矩阵 * 模型矩阵 * 顶点坐标
//    相乘的顺序不能变
//    物体本身拥有的坐标系，叫本地坐标系，要想把物体放到世界坐标系中，就需要模型矩阵，即可拥有绽放、平移、旋转的能力，此时物体即具有了世界坐标系
//    再结合视图矩阵，就有了视点坐标，观察点坐标和上方向
//    然后就是投影矩阵，使物体进行呈现
const floorMaterial = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  side: THREE.DoubleSide,
  transparent: true,
  uniforms: {
    uTime: {
      value: 0,
    },
    uTexture: {
      value: texture,
    },
    uScale: {
      value: params.uScale,
    },
  },
})

const floor = new THREE.Mesh(floorGeometry, floorMaterial)
floor.position.set(0, 0, 0)
// floor.rotation.x = -Math.PI / 2
floor.receiveShadow = true
group.add(floor)

const { gui } = useGUI()
gui
  .add(params, 'uScale')
  .min(0)
  .max(1)
  .step(0.01)
  .onChange((val) => {
    floorMaterial.uniforms.uScale.value = val
  })
const clock = new THREE.Clock()
let requestId = -1
/**
 * 更新动画
 */
const run = () => {
  requestId = requestAnimationFrame(run)
  let time = clock.getElapsedTime()

  // 给材质传递时间参数，让材质动起来
  floorMaterial.uniforms.uTime.value = time
}

onMounted(() => {
  run()
})
onBeforeUnmount(() => {
  cancelAnimationFrame(requestId)
  scene?.remove(group)
  floorMaterial.dispose()
  floorGeometry.dispose()
  ambientLight.dispose()
  texture.dispose()
  dirLight.dispose()
})
</script>
<style lang="scss" scoped>
.viewDiv {
  width: 100%;
  height: 100%;
}
</style>
