<template>
  <div id="cesiumContainer" ref="cesiumContainer"></div>
</template>

<script lang="ts" setup>
// import 'cesium/Build/Cesium/Widgets/widgets.css'
import { onMounted } from 'vue'
import CesiumNavigaion from 'cesium-navigation-es6'
import {
  modifyBuild,
  initViewer,
  MousePosition,
  modifyMap,
  LightCone,
  RectFlyLight,
  RoadLightLine,
  RadarLight,
  LightSpread,
  LightWall,
  ParticleLight,
} from '@/utils/cesium'
import * as Cesium from 'cesium'
onMounted(() => {
  let viewer = initViewer()
  // 根据鼠标位置生成经纬度值
  new MousePosition(viewer)
  // 设置导航罗盘的配置
  var options = {
    // 启用罗盘
    enableCompass: true,
    // 是否启用缩放
    enableZoomControls: false,
    // 是否启用指南针外环
    enableCompassOuterRing: true,
    // 是否启用距离的图例
    // enableDistanceLegend: false,
  }
  // 初始化导航罗盘
  new CesiumNavigaion(viewer, options)
  // 修改地图的底色
  modifyMap(viewer)
  // 修改建筑的颜色
  modifyBuild(viewer)
  // 添加动态的光锥特效
  new LightCone(viewer)
  // 创建区域上升流光飞线
  new RectFlyLight(viewer)
  // 创建道路飞线
  new RoadLightLine(viewer)
  // 创建雷达
  new RadarLight(viewer)
  // 6边形光波扩散特效
  new LightSpread(viewer)
  // 创建光墙
  new LightWall(viewer)
  // particleLight,创建烟花粒子
  new ParticleLight(viewer, Cesium.Color.RED)
  new ParticleLight(viewer, Cesium.Color.AQUA)
  new ParticleLight(viewer, Cesium.Color.GREEN)
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#cesiumContainer {
  width: 100%;
  height: 100%;
}
</style>
