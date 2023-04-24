<!-- 
鼠标悬浮切换物体样式
 -->
<template>
  <div ref="refDiv" class="viewDiv"></div>
</template>
<script lang="ts" setup>
import * as THREE from 'three'
import { OrbitControls } from '@three-ts/orbit-controls'
import snow from '../icons/snow.svg'
const refDiv = ref<HTMLDivElement>()
// 场景
const scene = new THREE.Scene()
// 相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 30)
// 通过设置position来进行移动
camera.position.set(0, 0, 10)
// 渲染器
const renderer = new THREE.WebGLRenderer()
renderer.shadowMap.enabled = true
// 载入纹理
const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load(snow)
// 几何
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({
  wireframe: true,
})
const redMaterial = new THREE.MeshBasicMaterial({
  color: '#ff0000',
})
const cubeArr: THREE.Mesh<THREE.BoxGeometry>[] = []
for (let i = -5; i < 5; i++) {
  for (let j = -5; j < 5; j++) {
    for (let k = -5; k < 5; k++) {
      const cube = new THREE.Mesh(geometry, material)
      cube.position.set(i, j, k)
      scene.add(cube)
      cubeArr.push(cube)
    }
  }
}

// 配置鼠标悬浮高亮
// 镭射对象
const raycaster = new THREE.Raycaster()
// 鼠标的位置对象
const mouse = new THREE.Vector2()

// 坐标轴
const controls = new OrbitControls(camera, renderer.domElement)
// 允许拖动后再滑动一段
controls.enableDamping = true
const axisHelper = new THREE.AxesHelper(5)
scene.add(axisHelper)
// 更新动画
let requestId = -1
// const clock = new THREE.Clock()
const run = () => {
  requestId = requestAnimationFrame(run)
  // let time = clock.getElapsedTime()
  // 设置enableDamping需要调用update方法
  controls.update()
  renderer.render(scene, camera)
}
// 重置画布大小
const resizeDiv = () => {
  if (!refDiv.value) return
  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight
  // 更新摄像头的投影矩阵
  camera.updateProjectionMatrix()
  // 更新渲染器宽高
  renderer.setSize(refDiv.value.clientWidth, refDiv.value.clientHeight)
  // 更新渲染器像素比
  renderer.setPixelRatio(window.devicePixelRatio)
}
const init = () => {
  resizeDiv()
  refDiv.value?.appendChild(renderer.domElement)
  run()
}
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
  refDiv.value?.addEventListener('click', (event) => {
    console.log(event)
    if (!refDiv.value) return
    //  转换鼠标坐标到画布
    mouse.x = (event.offsetX / refDiv.value?.clientWidth) * 2 - 1
    mouse.y = -((event.offsetY / refDiv.value.clientHeight) * 2 - 1)
    raycaster.setFromCamera(mouse, camera)
    const result = raycaster.intersectObjects(cubeArr)
    if (!result.length) {
    } else {
      result.map((item: any) => {
        item.object.material = redMaterial
      })
    }
  })
})
onBeforeUnmount(() => {
  cancelAnimationFrame(requestId)
  window.removeEventListener('resize', resizeDiv)
  window.removeEventListener('dblclick', requestFullscreen)
  // scene.remove(points)
  scene.remove(axisHelper)
  axisHelper.dispose()
  controls.dispose()
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
