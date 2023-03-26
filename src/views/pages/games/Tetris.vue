<template>
  <div class="wrapper">
    <canvas ref="refCanvas" width="600" height="700" style="width: 600px; height: 700px"></canvas>
  </div>
</template>
<script lang="ts" setup>
import { Tetris } from '@/utils/Tetris'

const refCanvas = ref<HTMLCanvasElement>()
onMounted(() => {
  if (!refCanvas.value) return
  const game = new Tetris(refCanvas.value)
  game.init()
})
</script>
<style lang="scss" scoped>
.color {
  color: red;
}
</style>
