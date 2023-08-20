<template>
  <div class="map-wrapper">
    <div id="map-div"></div>
  </div>
</template>
<script lang="ts" setup>
import { MapApp } from '@/utils/arcgis/MapApp'
onMounted(async () => {
  const app = new MapApp()
  // await app.loadScript()
  await app.initMap('map-div', 'gd')
  await app.addPipe()
})
</script>

<style lang="scss" scoped>
.map-wrapper,
#map-div {
  width: 100%;
  height: 100%;
}
</style>
