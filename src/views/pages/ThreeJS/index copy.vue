<template>
  <div ref="refDiv" class="viewDiv"></div>
</template>
<script lang="ts" setup>
import * as THREE from 'three'
import { OrbitControls } from '@three-ts/orbit-controls'
import gsap from 'gsap'
import { useGUI } from '@/hooks/gui/useGUI'
const refDiv = ref<HTMLDivElement>()
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)
const controlds = new OrbitControls(camera, renderer.domElement)
controlds.enableDamping = true
const axisHelper = new THREE.AxesHelper(5)
scene.add(axisHelper)
// 通过设置position来进行移动
camera.position.z = 5
// const moveXRepetitive = () => {
//   cube.position.x += 0.01
//   if (cube.position.x > 5) {
//     cube.position.x = 0
//   }
// }
// // 通过设置rotate来进行旋转
// const rotateX = () => {
//   cube.rotation.x += 0.01
// }

const run = () => {
  requestAnimationFrame(run)
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
onMounted(() => {
  init()
  window.addEventListener('resize', () => {
    // 更新渲染器
    resizeDiv()
  })
  window.addEventListener('dblclick', () => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      renderer.domElement.requestFullscreen()
    }
  })
})
</script>
<style lang="scss" scoped>
.viewDiv {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
