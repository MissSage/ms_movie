<template>
  <div></div>
</template>
<script lang="ts" setup>
import * as THREE from 'three'
import gsap from 'gsap'
import { useGUI } from '@/hooks/gui/useGUI'
const scene: THREE.Scene|undefined = inject('scene')

const geometry = new THREE.BoxGeometry(1, 1, 1)
// 纹理
const textureLoader = new THREE.TextureLoader()
const pic = textureLoader.load('/data/pic0.png')
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, map: pic })
const cube = new THREE.Mesh(geometry, material)
scene?.add(cube)

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
onBeforeUnmount(() => {
  scene?.remove(cube)
  geometry.dispose()
  material.dispose()
  pic.dispose()
})
</script>