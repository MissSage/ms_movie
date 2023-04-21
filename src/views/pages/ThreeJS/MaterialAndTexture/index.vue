<template>
  <div ref="refDiv" class="viewDiv"></div>
</template>
<script lang="ts" setup>
import {
  AxesHelper,
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  TextureLoader,
  WebGLRenderer,
} from 'three'
import { OrbitControls } from '@three-ts/orbit-controls'
import gsap from 'gsap'
import { useGUI } from '@/hooks/gui/useGUI'
const refDiv = ref<HTMLDivElement>()
const scene = new Scene()
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new WebGLRenderer()
const geometry = new BoxGeometry(1, 1, 1)
// 纹理
const textureLoader = new TextureLoader()
const pic = textureLoader.load('/data/pic0.png')
const material = new MeshBasicMaterial({ color: 0x00ff00, map: pic })
const cube = new Mesh(geometry, material)
scene.add(cube)
const controlds = new OrbitControls(camera, renderer.domElement)
controlds.enableDamping = true
const axisHelper = new AxesHelper(5)
scene.add(axisHelper)
// 通过设置position来进行移动
camera.position.z = 5
let requestId = -1
const run = () => {
  requestId = requestAnimationFrame(run)
  // moveXRepetitive()
  // rotateX()
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
const { gui } = useGUI()

// 添加文件夹
const folder = gui.addFolder('设置立方体')
// 添加x属性修改
folder
  .add(cube.position as any, 'x')
  .min(0)
  .max(5)
  .step(0.01)
  .name('X轴方向移动')
  .onFinishChange((value) => {
    console.log(value)
  })
// 添加颜色选择器
folder.addColor({ color: '#00ff00' }, 'color').onChange((value) => {
  cube.material.color.set(value)
})

const moveX = gsap.to(cube.position, {
  x: 5,
  duration: 5,
  ease: 'power1.inOut',
  repeat: -1,
  yoyo: true,
  paused: true,
})
const rotateX = gsap.to(cube.rotation, {
  x: 2 * Math.PI,
  duration: 5,
  repeat: -1,
  yoyo: true,
  paused: true,
})

// 控制显隐
folder.add(cube as any, 'visible').name('是否显示')
folder.add(cube.material as any, 'wireframe').name('显示线框')
folder
  .add(
    {
      fn: () => {
        moveX.play()
        rotateX.play()
      },
    },
    'fn',
  )
  .name('开始动画')
folder
  .add(
    {
      fn: () => {
        moveX.pause()
        rotateX.pause()
      },
    },
    'fn',
  )
  .name('停止动画')
const requestFullscreen = () => {
  if (document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    refDiv.value?.requestFullscreen()
  }
}
onMounted(() => {
  init()
  window.addEventListener('resize', resizeDiv)
  window.addEventListener('dblclick', requestFullscreen)
})
onBeforeUnmount(() => {
  cancelAnimationFrame(requestId)
  window.removeEventListener('resize', resizeDiv)
  window.removeEventListener('dblclick', requestFullscreen)
  scene.remove(cube)
  geometry.dispose()
  material.dispose()
  pic.dispose()
  scene.remove(axisHelper)
  axisHelper.dispose()
  controlds.dispose()
  camera.clear()
  renderer.dispose()
  scene.clear()
})
</script>
<style lang="scss" scoped>
.viewDiv {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
