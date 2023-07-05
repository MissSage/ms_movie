<template>
  <div ref="refDiv" class="viewDiv"></div>
</template>
<script lang="ts" setup>
import * as THREE from 'three'
import { OrbitControls } from '@three-ts/orbit-controls'
import { toCommaNumber } from '@/utils/Formatter'
import {
  css2dRenderer,
  camera,
  scene,
  renderer,
  createLableObj,
} from '@/utils/three'
import {
  createMarrineTexture,
  createSpritelineTexure,
  dealBoundaryData,
  dealLineData,
  dealPointData,
  typeArr,
} from './util'
const props = defineProps<{
  height?: number
  url?: string
  pipeUrl?: string
  pointUrl?: string
  center?: [number, number]
}>()
const refDiv = ref<HTMLDivElement>()

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

// 是否开启右键拖拽,好像与浏览器鼠标手势冲突，需要关闭浏览器的鼠标手势
controls.enablePan = true
camera.position.set(0, -15, 30)

// 处理数据
// 总的数据对象
const map = new THREE.Object3D()
// 用来装弹窗的对象
const popMap = new THREE.Object3D()
scene.add(popMap)
scene.add(map)

const lineTexture = createSpritelineTexure()
let pointFeatures: any
const openPop = (
  intersectResult: THREE.Intersection<THREE.Object3D<THREE.Event>>,
) => {
  const data = [
    { label: '液位1', value: 5.23, unit: 'm' },
    { label: '液位2', value: 0.42, unit: 'm' },
    { label: '流量', value: 45.25, unit: 'm³/h' },
    { label: '压力', value: 0.48, unit: 'MPa' },
    { label: '水质', value: '合格', unit: '', color: '#1CDB96' },
  ]
  // if(popMap.children.findIndex(item=>item.obj))
  console.log(intersectResult)

  let listStr = ''
  data.map((item) => {
    listStr += `
    <div class="list-item">
      <span class="label">${item.label}:</span>
      <span class="value" style="color:${item.color};">${
      toCommaNumber(item.value) || item.value
    }</span>
      <span class="unit">${item.unit}</span>
    </div>
    `
  })
  const stationObj = pointFeatures.find(
    (item: any) => item.id === intersectResult.object.name,
  )
  const typeName = typeArr.find(
    (item) => item.type === stationObj?.properties.type,
  )?.name
  const label = createLableObj(
    `
    <div class="three-popup">
      <p class="three-popup__header">${typeName}</p>
      <div class="three-popup__main">
        ${listStr}
        </div>
    </div>
    `,
    {
      longitude: intersectResult.point.x,
      latitude: -intersectResult.point.y,
      height: (props.height ?? 1.0) + 0.5,
      className: 'popup',
    },
  )
  popMap.add(label)
}
const run = () => {
  requestAnimationFrame(run)
  // 设置enableDamping需要调用update方法

  // 管线贴图动起来
  if (lineTexture) lineTexture.offset.x -= 0.005
  controls.update()
  renderer.render(scene, camera)
  css2dRenderer.render(scene, camera)
}
const resizeDiv = () => {
  if (!refDiv.value) return
  // 更新摄像头
  // camera.aspect = window.innerWidth / window.innerHeight
  camera.aspect = refDiv.value.clientWidth / refDiv.value.clientHeight
  // 更新摄像头的投影矩阵
  camera.updateProjectionMatrix()
  renderer.setSize(refDiv.value.clientWidth, refDiv.value.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
}
const init = () => {
  resizeDiv()
  refDiv.value?.appendChild(renderer.domElement)
  if (refDiv.value) {
    css2dRenderer.setSize(refDiv.value.clientWidth, refDiv.value.clientHeight)
    refDiv.value.appendChild(css2dRenderer.domElement)
  }
  run()
}
onMounted(async () => {
  init()

  window.addEventListener('resize', () => {
    // 更新渲染器
    resizeDiv()
  })

  controls.addEventListener('change', (e) => console.log(e))
  window.addEventListener('click', (e) => {
    if (!refDiv.value) return
    // 获取鼠标的位置
    const mouse = new THREE.Vector2()
    mouse.x = (e.offsetX / refDiv.value.clientWidth) * 2 - 1
    mouse.y = -(e.offsetY / refDiv.value.clientHeight) * 2 + 1

    // 获取鼠标点击的位置
    const rayCaster = new THREE.Raycaster()
    rayCaster.setFromCamera(mouse, camera)
    // 获取点击的点
    const intersects = rayCaster.intersectObjects(map.children)
    if (intersects.length) {
      popMap.clear()
      openPop(intersects[0])
    } else {
      popMap.clear()
    }
    return false
  })
  // 生成范围形状
  dealBoundaryData(
    '/ThreeJS/geojson/gansu_boundary.geojson',
    createMarrineTexture(),
    props.height,
  ).then((res) => {
    scene.add(res)
  })
  // 生成流动线条
  dealLineData(
    '/ThreeJS/geojson/gansu_lines.geojson',
    lineTexture,
    props.height,
  ).then((res) => {
    scene.add(res)
  })

  // 生成标点
  const { map, textMap, features } = await dealPointData(
    '/ThreeJS/geojson/gansu_points.geojson',
    props.height,
  )
  scene.add(map)
  scene.add(textMap)
  pointFeatures = features
})
</script>
<style lang="scss" scoped>
.viewDiv {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: transparent;
}
</style>
<style lang="scss">
.laber_name {
  position: relative;
  top: -40px;
  padding: 0 8px;
  display: flex;
  font-size: 12px;
  line-height: 20px;
  justify-content: flex-start;
  align-items: center;
  border: 2px solid transparent;
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  background-image: linear-gradient(
      to right,
      rgba(7, 81, 84, 0.8),
      rgba(7, 81, 84, 0.8)
    ),
    linear-gradient(90deg, rgba(0, 216, 225, 1), rgba(0, 216, 225, 0));
  &.lljcd {
    background-image: linear-gradient(
        to right,
        rgba(7, 81, 84, 0.8),
        rgba(7, 81, 84, 0.8)
      ),
      linear-gradient(90deg, rgba(0, 216, 225, 1), rgba(0, 216, 225, 0));
  }
  &.yljcd {
    background-image: linear-gradient(to right, #664109, #664109),
      linear-gradient(90deg, rgba(255, 171, 45, 1), rgba(255, 171, 45, 0));
  }
  &.szjcd {
    background-image: linear-gradient(to right, #575808, #575808),
      linear-gradient(90deg, rgba(224, 228, 21, 1), rgba(224, 228, 21, 0));
  }
  &.bf {
    background-image: linear-gradient(to right, #400854, #400854),
      linear-gradient(90deg, rgba(196, 30, 255, 1), rgba(196, 30, 255, 0));
  }
  &.syd {
    background-image: linear-gradient(to right, #064830, #064830),
      linear-gradient(90deg, rgba(28, 219, 150, 1), rgba(28, 219, 150, 0));
  }
  &.sc {
    background-image: linear-gradient(to right, #0a3060, #0a3060),
      linear-gradient(90deg, rgba(77, 148, 255, 1), rgba(77, 148, 255, 0));
  }
}
.three-popup {
  width: 120px;
  height: 130px;
  position: relative;
  left: -120px;
  bottom: 90px;
  z-index: 100;
  animation-name: scaleable;
  animation-duration: 0.2s;
  animation-delay: 0.2;
  background: url('../img/pop_bg.png') 0 0 /100% 100% no-repeat;
  &::after {
    content: '';
    width: 2px;
    height: 20px;
    background-color: #20bcff;
    position: absolute;
    bottom: -37px;
    left: 155px;
    transform: rotate(-90deg);
    animation-name: scaleable;
    animation-duration: 0.1s;
  }
  &::before {
    content: '';
    width: 2px;
    height: 40px;
    background-color: #20bcff;
    position: absolute;
    bottom: -33px;
    left: 132px;
    transform: rotate(-45deg);
    animation-name: scaleable;
    animation-duration: 0.1s;
  }
  .three-popup__header {
    height: 20px;
    font-size: 14px;
    color: #fff;
    padding: 4px;
  }
  .three-popup__main {
    padding: 6px 8px;
    .list-item {
      display: flex;
      align-items: center;
      height: 20px;
      font-size: 12px;
      .label {
        color: rgba(255, 255, 255, 0.8);
        font-size: 12px;
        width: 40px;
      }
      .value {
        color: #fff;
        font-size: 16px;
        font-family: font-lcd;
      }
      .unit {
        margin-left: 4px;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.8);
      }
    }
  }
}
@keyframes scaleable {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>
