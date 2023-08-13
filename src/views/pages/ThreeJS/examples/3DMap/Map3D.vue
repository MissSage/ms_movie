<template>
  <div ref="refDiv"></div>
</template>
<script lang="ts" setup>
import * as THREE from 'three'
import { toCommaNumber } from '@/utils/Formatter'
import {
  createMarrineTexture,
  dealBoundaryData,
  dealLineData,
  dealPointData,
  typeArr,
} from './util'
import {
  CSS2DObject,
  CSS2DRenderer,
} from 'three/examples/jsm/renderers/CSS2DRenderer'
const props = defineProps<{
  height?: number
  url?: string
  pipeUrl?: string
  pointUrl?: string
  center?: [number, number]
}>()
const refDiv = ref<HTMLDivElement>()
const scene: THREE.Scene | undefined = inject('scene')
const group = new THREE.Object3D()
scene?.add(group)
const camera: THREE.Camera | undefined = inject('camera')
camera?.position.set(0, -15, 30)

// // 处理数据

// 画线
const textureLoader = new THREE.TextureLoader()
const lineTexture = textureLoader.load(
  '/ThreeJS/Textures/SpriteLine/spriteline1.png',
)
lineTexture.wrapS = lineTexture.wrapT = THREE.RepeatWrapping
lineTexture.repeat.set(1, 1)
lineTexture.needsUpdate = true

// 点

// 气泡弹窗
const css2dRenderer = new CSS2DRenderer()
css2dRenderer.domElement.style.position = 'absolute'
css2dRenderer.domElement.style.top = '0px'
css2dRenderer.domElement.style.pointerEvents = 'none'
// // 用来装弹窗的对象
const popMap = new THREE.Object3D()
group.add(popMap)

let pointFeatures: any
const createLableObj = (
  text: string,
  options: {
    longitude: number
    latitude: number
    height: number
    className?: string
  },
) => {
  const laberDiv = document.createElement('div') // 创建div容器
  laberDiv.className = options.className || ''
  laberDiv.innerHTML = text
  const pointLabel = new CSS2DObject(laberDiv)
  pointLabel.position.set(options.longitude, -options.latitude, options.height)
  return pointLabel
}
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
  const stationObj = pointFeatures?.find(
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

let requestId = -1
const run = () => {
  requestId = requestAnimationFrame(run)
  // 管线贴图动起来
  lineTexture.offset.x -= 0.005
  css2dRenderer.setSize(
    renderer?.domElement.clientWidth || window.innerWidth,
    renderer?.domElement.clientHeight || window.innerHeight,
  )
  scene && camera && css2dRenderer.render(scene, camera)
}
const stop = () => {
  cancelAnimationFrame(requestId)
}
const renderer: THREE.WebGLRenderer | undefined = inject('renderer')
const init = () => {
  refDiv.value?.appendChild(css2dRenderer.domElement)
  run()
}
let pointRes: {
  map?: THREE.Object3D<THREE.Event>
  textMap?: THREE.Object3D<THREE.Event>
  features?: any
} = {}
const markClick = (e: MouseEvent) => {
  if (!renderer?.domElement) return
  // 获取鼠标的位置
  const mouse = new THREE.Vector2()
  mouse.x = (e.offsetX / renderer.domElement.clientWidth) * 2 - 1
  mouse.y = -(e.offsetY / renderer.domElement.clientHeight) * 2 + 1

  // 获取鼠标点击的位置
  const rayCaster = new THREE.Raycaster()
  camera && rayCaster.setFromCamera(mouse, camera)
  // 获取点击的点
  if (!pointRes.map) return
  const intersects = rayCaster.intersectObjects(pointRes.map.children)
  if (intersects.length) {
    popMap.clear()
    openPop(intersects[0])
  } else {
    popMap.clear()
  }
  return false
}
onMounted(async () => {
  init()
  // 生成范围形状
  dealBoundaryData(
    '/ThreeJS/geojson/gansu_boundary.geojson',
    createMarrineTexture(),
    props.height,
  ).then((res) => {
    group?.add(res)
  })
  // 生成流动线条
  dealLineData(
    '/ThreeJS/geojson/gansu_lines.geojson',
    lineTexture,
    props.height,
  ).then((res) => {
    group.add(res)
  })

  renderer?.domElement?.addEventListener('click', markClick)
  // 生成标点
  pointRes = await dealPointData(
    '/ThreeJS/geojson/gansu_points.geojson',
    props.height,
  )
  pointRes.map && group.add(pointRes.map)
  pointRes.textMap && group.add(pointRes.textMap)
  pointFeatures = pointRes.features
})

onBeforeUnmount(() => {
  stop()
  renderer?.domElement?.removeEventListener('click', markClick)
  css2dRenderer.domElement.remove()
  scene?.remove(group)
  popMap.clear()
  pointRes.map?.clear()
  pointRes.textMap?.clear()
  group.clear()
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
  color: #66f5ff;
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
  background: url('./imgs/pop_bg.png') 0 0 /100% 100% no-repeat;
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
