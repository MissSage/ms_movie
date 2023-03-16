<template>
  <div class="wave-wrapper">
    <div class="canvas-wrapper">
      <canvas ref="refCanvas" style="width: 100%; height: 100%" height="510"></canvas>
    </div>
    <el-button @click="() => handleToggle()">{{ start ? '暂停' : '播放' }}</el-button>
  </div>
</template>
<script lang="ts" setup>
import { AudioWave } from '@/utils/AudioWave'
const emit = defineEmits(['error', 'next'])
const props = defineProps<{
  url?: string
}>()
const refCanvas = ref<HTMLCanvasElement>()
const start = ref<boolean>(false)
let audioWave: AudioWave | undefined = undefined
const handleToggle = async () => {
  start.value = !start.value
}
watch(
  () => start.value,
  () => {
    audioWave?.toggle(start.value)
  },
)
watch(
  () => props.url,
  () => {
    audioWave?.destroy()
    if (!props.url || !refCanvas.value) emit('error')
    else {
      audioWave = new AudioWave(props.url, refCanvas.value, { onended: () => emit('next') })
      audioWave.init().then(() => {
        start.value = true
        audioWave?.toggle(start.value)
      })
    }
  },
)
onMounted(() => {
  if (!props.url || !refCanvas.value) return
  refCanvas.value.width = refCanvas.value.clientWidth
  audioWave = new AudioWave(props.url, refCanvas.value, { onended: () => emit('next') })
  audioWave.init().then(() => {
    start.value = true
  })
})
onBeforeUnmount(() => {
  audioWave?.destroy()
})
</script>
<style lang="scss" scoped>
.wave-wrapper {
  width: 100%;
  height: 100%;
  min-height: 200px;

  .canvas-wrapper {
    height: calc(100% - 40px);
  }

  canvas {
    display: block;
    background: linear-gradient(135deg, rgb(28 27 28) 0%, rgb(80 79 79) 100%);
  }
}
</style>
