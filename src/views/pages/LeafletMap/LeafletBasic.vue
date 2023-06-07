<template>
  <div id="mapContainer"></div>
</template>

<script lang="ts" setup>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import * as EL from 'esri-leaflet'
onMounted(() => {
  const map = L.map('mapContainer').setView([32.03064, 118.79517], 9)
  L.tileLayer(
    `http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=${window.SITE_CONFIG.GIS_CONFIG.gisTdtToken}`,
  ).addTo(map)
  L.marker([39.736861245030326, 116.13991336098002])
    .addTo(map)
    .bindPopup('marker')
    .openPopup()
  EL.dynamicMapLayer({
    url: window.SITE_CONFIG.GIS_CONFIG.gisService + '/PIPE_QY_ANQING_DYNAMIC/MapServer',
  }).addTo(map)
})
</script>

<style lang="scss" scoped>
#mapContainer {
  width: 100%;
  height: 100%;
}
</style>
