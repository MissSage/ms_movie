<!-- 
鼠标悬浮切换物体样式
 -->
<template>
  <div></div>
</template>
<script lang="ts" setup>
import * as THREE from 'three'
// 场景
const scene: THREE.Scene | undefined = inject('scene')
// 相机
const camera: THREE.Camera | undefined = inject('camera')
const renderer: THREE.WebGLRenderer | undefined = inject('renderer')
// 通过设置position来进行移动
camera?.position.set(0, 0, 10)
// 几何
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({
  wireframe: true,
})
const redMaterial = new THREE.MeshBasicMaterial({
  color: '#ff0000',
})
const group = new THREE.Object3D()
const cubeArr: THREE.Mesh<THREE.BoxGeometry>[] = []
for (let i = -5; i < 5; i++) {
  for (let j = -5; j < 5; j++) {
    for (let k = -5; k < 5; k++) {
      const cube = new THREE.Mesh(geometry, material)
      cube.position.set(i, j, k)
      group?.add(cube)
      cubeArr.push(cube)
    }
  }
}
scene?.add(group)
// 配置鼠标悬浮高亮
// 镭射对象
const raycaster = new THREE.Raycaster()
// 鼠标的位置对象
const mouse = new THREE.Vector2()
const bindMouseClick = (event: MouseEvent) => {
  if (!renderer?.domElement) return
  //  转换鼠标坐标到画布
  mouse.x = (event.offsetX / renderer?.domElement.clientWidth) * 2 - 1
  mouse.y = -((event.offsetY / renderer?.domElement.clientHeight) * 2 - 1)
  camera && raycaster.setFromCamera(mouse, camera)
  const result = raycaster.intersectObjects(cubeArr)
  if (!result.length) {
  } else {
    result.map((item: any) => {
      item.object.material = redMaterial
    })
  }
}
onMounted(() => {
  renderer?.domElement.addEventListener('click', bindMouseClick)
})
onBeforeUnmount(() => {
  renderer?.domElement.removeEventListener('click', bindMouseClick)
  scene?.remove(group)
  group.clear()
  material.dispose()
  redMaterial.dispose()
})
</script>
<style lang="scss" scoped>
.viewDiv {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
