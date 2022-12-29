<template>
  <div class="wrapper">

    <css-doodle click-to-update use="var(--container),var(--flowers)"></css-doodle>
  </div>
</template>
<script lang="ts" setup>
import 'css-doodle'
import { onMounted } from 'vue'
onMounted(() => {

})
</script>
<style lang="scss">
.wrapper{
  height: 100%;
  width: 100%;
  overflow: hidden;
}
css-doodle {
  --container: ( :doodle {
      @grid: 7 / 100vmax;
      background: #0a0c27;
    });
  --flowers: (@shape: clover 5;
    background: hsla(calc(360 - @i * 4), 70%, 68%, @r.8 );
    transform: scale(@r(.2, 1.5)) translate(@m2.@r(±50%)); )
}
</style>