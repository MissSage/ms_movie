<template>
  <div class="wave-wrapper">
    <canvas width="500" height="380" ref="refCanvas"></canvas>
    <el-button @click="init">播放</el-button>
  </div>
</template>
<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from "vue"

const refCanvas = ref<HTMLCanvasElement>()
let analyser: AnalyserNode | undefined

let dataArray: Uint8Array | undefined
let canvasCtx: CanvasRenderingContext2D
let bufferLength = 0
const init = () => {
  const audioCtx = new window.AudioContext()
  analyser = audioCtx.createAnalyser()
  analyser.fftSize = 2048
  bufferLength = analyser.frequencyBinCount
  dataArray = new Uint8Array(bufferLength)
  analyser.getByteTimeDomainData(dataArray)
  canvasCtx = refCanvas.value?.getContext("2d")
  draw()
}
// 绘制一个当前音频源的示波器
let drawVisual: number = 0
const draw = () => {
  if (!canvasCtx || !refCanvas.value) return
  drawVisual = requestAnimationFrame(draw)

  analyser.getByteTimeDomainData(dataArray)

  canvasCtx.fillStyle = "rgb(200, 200, 200)"
  canvasCtx.fillRect(0, 0, refCanvas.value?.width, refCanvas.value?.height)

  canvasCtx.lineWidth = 2
  canvasCtx.strokeStyle = "rgb(0, 0, 0)"

  canvasCtx.beginPath()

  const sliceWidth = (refCanvas.value.width * 1.0) / bufferLength
  let x = 0

  for (let i = 0; i < bufferLength; i++) {
    const v = dataArray[i] / 128.0
    const y = (v * refCanvas.value.height) / 2

    if (i === 0) {
      canvasCtx.moveTo(x, y)
    } else {
      canvasCtx.lineTo(x, y)
    }

    x += sliceWidth
  }

  canvasCtx.lineTo(refCanvas.value.width, refCanvas.value.height / 2)
  canvasCtx.stroke()
}
const destroy = () => {
  drawVisual && cancelAnimationFrame(drawVisual)
}
onBeforeUnmount(() => {
  destroy()
})
</script>
<style lang="scss" scoped>
.wave-wrapper {
  width: 100%;
  height: 100%;
}
</style>
