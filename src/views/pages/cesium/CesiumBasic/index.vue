<template>
  <div ref="refContainer" class="cesiumContainer"></div>
</template>
<script lang="ts" setup>
import { Viewer } from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'
import {
  addPoint,
  addPrimitive,
  addTower,
  basicSettingForCesium,
  viewerConstructorOptions,
} from './data'
const refContainer = ref<HTMLDivElement>()
basicSettingForCesium()
const initViewer = async () => {
  if (!refContainer.value) return
  window.CESIUM_VIEWER = new Viewer(
    refContainer.value,
    viewerConstructorOptions,
  )
  // 移除logo
  window.CESIUM_VIEWER.cesiumWidget.creditContainer.remove()

  // testDegreeTransform()
  // setMapInteractions(viewer)
  addTower(window.CESIUM_VIEWER)
  addPoint(window.CESIUM_VIEWER)
  addPrimitive(window.CESIUM_VIEWER)
}
onMounted(async () => {
  initViewer()
})
</script>
<style lang="scss" scoped>
.cesiumContainer {
  width: 100%;
  height: 100%;
}
</style>
