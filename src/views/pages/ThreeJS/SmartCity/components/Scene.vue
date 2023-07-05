<template>
  <div ref="sceneDiv" class="scene"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import * as THREE from 'three'
import gsap from 'gsap'
import {
  scene,
  camera,
  controls,
  // axesHelper,
  renderer,
  createMesh,
  init,
  animate,
  AlarmSprite,
  LightWall,
  FlyLineShader,
  LightRadar,
} from '@/utils/three'

const emit = defineEmits(['spriteClick'])
const props = defineProps<{ eventList: any[] }>()
// 场景元素div
let sceneDiv = ref<HTMLElement>(document.createElement('div'))

// 添加相机
scene.add(camera)
// 添加辅助坐标轴
// scene.add(axesHelper)
// 创建物体
createMesh()

onMounted(() => {
  init(sceneDiv.value)
  sceneDiv.value.appendChild(renderer.domElement)
  animate()
})
const eventListMesh: any[] = []
let mapFn: Record<string, any> = {
  火警: (position: { x: number; z: number } | undefined, i?: number) => {
    const lightWall = new LightWall(1, 2, position)
    lightWall.eventListIndex = i
    scene.add(lightWall.mesh)
    eventListMesh.push(lightWall)
  },
  治安: (position: { x: number; z: number } | undefined, i?: number) => {
    //   生成随机颜色
    const color = new THREE.Color(
      Math.random(),
      Math.random(),
      Math.random(),
    ).getHex()
    // 添加着色器飞线
    const flyLineShader = new FlyLineShader(position, color)
    flyLineShader.eventListIndex = i
    scene.add(flyLineShader.mesh)
    eventListMesh.push(flyLineShader)
  },
  电力: (position: { x: number; z: number } | undefined, i?: number) => {
    // 添加雷达
    const lightRadar = new LightRadar(2, position)
    lightRadar.eventListIndex = i
    scene.add(lightRadar.mesh)
    eventListMesh.push(lightRadar)
  },
}

const handleEventToggle = (i: any) => {
  eventListMesh.forEach((item) => {
    if (item.eventListIndex === i) {
      item.mesh.visible = true
    } else {
      item.mesh.visible = false
    }
  })
  const position = {
    x: props.eventList[i].position.x / 5 - 10,
    y: 0,
    z: props.eventList[i].position.y / 5 - 10,
  }
  //   controls.target.set(position.x, position.y, position.z);
  gsap.to(controls.target, {
    duration: 1,
    x: position.x,
    y: position.y,
    z: position.z,
  })
}
watch(
  () => props.eventList,
  () => {
    // console.log(val);
    eventListMesh.forEach((item) => {
      item.remove()
    })
    props.eventList.forEach((item, i) => {
      const position = {
        x: item.position.x / 5 - 10,
        z: item.position.y / 5 - 10,
      }
      const alarmSprite = new AlarmSprite(item.name, position)
      alarmSprite.onClick(() => {
        // console.log(item.name, i);
        emit('spriteClick', { event: item, i })
      })
      alarmSprite.eventListIndex = i
      eventListMesh.push(alarmSprite)
      scene.add(alarmSprite.mesh)
      if (mapFn[item.name]) {
        mapFn[item.name](position, i)
      }
    })
  },
)
defineExpose({
  handleEventToggle,
})
</script>

<style>
.scene {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
</style>
