<template>
  <div class="wave-wrapper">
    <canvas ref="refCanvas" style="width: 100%; height: 100%"></canvas>
    <el-button @click="audioWave.toggle()">{{
      audioWave.isStart.value ? '暂停' : '播放'
    }}</el-button>
  </div>
</template>
<script lang="ts" setup>
import { useAudioWave } from '@/hooks/useAudioWave'
const emit = defineEmits(['error'])
const props = defineProps<{
  url?: string
}>()
const audioWave = useAudioWave()
const refCanvas = ref<HTMLCanvasElement>()

watch(
  () => props.url,
  () => {
    if (!props.url) emit('error')
    else {
      audioWave.init(props.url, refCanvas.value)
    }
  },
  {
    immediate: true,
  },
)
</script>
<style lang="scss" scoped>
.wave-wrapper {
  width: 100%;
  height: 100%;
}
</style>
