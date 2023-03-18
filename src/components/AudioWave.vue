<template>
  <div
    class="wave-wrapper"
    :style="{
      backgroundImage: `url(${props.img})`,
    }"
  >
    <div class="canvas-wrapper">
      <canvas ref="refCanvas" style="width: 100%; height: 100%"></canvas>
    </div>
    <div class="wave-footer">
      <div class="wave-footer-btns">
        <el-tooltip content="上一曲">
          <Icon class="wave-footer-item" icon="ep:d-arrow-left" @click="() => handlePrev()"></Icon>
        </el-tooltip>
        <el-tooltip content="快退10秒">
          <Icon
            class="wave-footer-item"
            :icon="'ep:arrow-left'"
            @click="() => handlePrev10S()"
          ></Icon>
        </el-tooltip>
        <el-tooltip :content="start ? '点击暂停' : '点击开始'">
          <Icon
            class="wave-footer-item"
            :icon="start ? 'mdi:pause' : 'mdi:play'"
            @click="() => handleToggle()"
          ></Icon
        ></el-tooltip>
        <el-tooltip content="快进30秒">
          <Icon
            class="wave-footer-item"
            :icon="'ep:arrow-right'"
            @click="() => handleNext30S()"
          ></Icon>
        </el-tooltip>
        <el-tooltip content="下一曲">
          <Icon
            class="wave-footer-item"
            :icon="'ep:d-arrow-right'"
            @click="() => handleNext()"
          ></Icon>
        </el-tooltip>
        <el-popover :popper-class="'wave-speed-list'" trigger="click" :width="120">
          <template #reference>
            <div class="wave-footer-item">x{{ curRate }}</div>
          </template>
          <ul class="wave-footer-speed-list">
            <li
              v-for="item in speeds"
              :key="item"
              class="wave-footer-speed-item"
              :class="[curRate === Number(item) ? 'is-active' : '']"
              @click="changeAudioSpeed(Number(item))"
            >
              {{ item }} 倍速
            </li>
          </ul>
        </el-popover>
      </div>
      <el-slider
        v-model="currentTime"
        class="wave-footer-item wave-progress"
        :max="duration"
        :min="0"
        :icon="'ep:d-arrow-left'"
        :format-tooltip="format"
        @input="handleChange"
      />
      <div class="wave-footer-item">{{ format() }}</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { AudioWave } from '@/utils/AudioWave'
import { formateDuration } from '@/utils/Formatter'
import { Icon } from '@iconify/vue'
const emit = defineEmits(['error', 'next', 'prev'])
const props = defineProps<{
  url?: string
  img?: string
}>()
const speeds = ['0.50', '0.75', '1.00', '1.25', '1.50', '1.75', '2.00']
const refCanvas = ref<HTMLCanvasElement>()
const start = ref<boolean>(false)
const curRate = ref<number>(1)
let audioWave: AudioWave | undefined = undefined
const handleToggle = async (flag?: boolean) => {
  start.value = flag ?? !start.value
  audioWave?.toggle(start.value)
  autoRefreshProgress()
}
const duration = ref<number>(0)
const currentTime = ref<number>(0)
let timer: any
const autoRefreshProgress = () => {
  timer && clearInterval(timer)
  duration.value = audioWave?.duration || 0
  timer = setInterval(() => {
    currentTime.value = audioWave?.currentTime || 0
  }, 1000)
}

const format = () => {
  return formateDuration(currentTime.value) + ' / ' + formateDuration(duration.value)
}
let changeTimer: any
const handleChange = (value: number) => {
  changeTimer && clearTimeout(changeTimer)
  if (!props.url) return
  audioWave?.setProgress(value)
}
const handlePrev = () => {
  emit('prev')
}
const handleNext = () => {
  emit('next')
}
const handleNext30S = () => {
  let cur = currentTime.value + 30
  if (cur > duration.value) cur = duration.value
  handleChange(cur)
}
const handlePrev10S = () => {
  let cur = currentTime.value - 10
  if (cur < 0) cur = 0
  handleChange(cur)
}
const changeAudioSpeed = (speed = 1) => {
  curRate.value = speed
  audioWave?.setRate(speed)
}
watch(
  () => props.url,
  () => {
    if (!props.url || !refCanvas.value) emit('error')
    else {
      audioWave?.init(props.url).then(() => {
        handleToggle(true)
      })
    }
  },
)
onBeforeUnmount(() => {
  clearInterval(timer)
  audioWave?.destroy()
  audioWave = undefined
})
onMounted(() => {
  if (refCanvas.value) {
    audioWave = new AudioWave(refCanvas.value, { onEnded: () => emit('next') })
    props.url &&
      audioWave?.init(props.url).then(() => {
        handleToggle(true)
      })
  }
})
</script>
<style lang="scss" scoped>
.wave-wrapper {
  width: 100%;
  height: 100%;
  min-height: 300px;
  position: relative;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  &:hover {
    .wave-footer {
      opacity: 1;
    }
  }
  .canvas-wrapper {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
  }

  canvas {
    display: block;
    background: linear-gradient(45deg, rgba(72, 9, 123, 0.8), rgba(16, 111, 205, 0.1));
  }
  .wave-footer {
    background: linear-gradient(0, rgba(9, 66, 123, 0.8), rgba(30, 143, 255, 0.1));
    width: 100%;
    max-width: 100%;
    height: 40px;
    position: absolute;
    bottom: 0;
    opacity: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    transition: all 1s;
    .wave-footer-btns {
      padding-left: 20px;
      display: flex;
      align-items: center;
    }
    .wave-footer-item {
      color: #fff;
      margin-right: 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
    }
    .wave-play-pause {
      display: flex;
      align-items: center;
    }
    .wave-progress {
      --el-slider-button-size: 9px;
      --el-slider-button-wrapper-size: 7px;
      --el-slider-button-wrapper-offset: -8px;
      flex: 1;
      :deep(.el-slider__bar) {
        border-radius: var(--el-slider-border-radius);
      }
    }
  }
}
</style>
<style lang="scss">
.wave-footer-speed-list {
  list-style: none;
  margin: 0;
  padding: 0;
  .wave-footer-speed-item {
    cursor: pointer;
    height: 28px;
    padding: 0 12px;
    display: flex;
    align-items: center;
    &:hover {
      background-color: rgb(54, 198, 255);
      color: #fff;
    }

    &.is-active {
      color: #fff;
      background-color: var(--el-color-primary);
    }
  }
}
.el-popover.el-popper.wave-speed-list {
  min-width: 120px;
}
</style>
