<template>
  <div class="detail">
    <div class="video">
      <video
        ref="refVideo"
        autoplay
        controls
        :src="movie?.url"
        :crossorigin="'anonymous'"
        @ended="playEnd"
        @error="handleError"
      ></video>
    </div>
    <div class="footer">
      <el-checkbox v-model="autoPlay">自动播放下一部</el-checkbox>
      <span class="footer-item">{{
        DateFormtter(props.movie?.createTime)
      }}</span>
      <span class="footer-item pointer" title="按alt+l截图" @click="savePic"
        >截图</span
      >
      <span class="footer-item">观看{{ props.movie?.viewTimes || 0 }}次</span>
      <span class="footer-item"
        >时长：{{ formateDuration(props.movie?.duration) }}</span
      >
      <span
        class="footer-item favour"
        :class="[isFavoured === true ? 'favoured' : '']"
        @click="toggleFavour"
      >
        <Icon icon="mdi:heart"></Icon>收藏
      </span>
    </div>
    <div class="footer">
      <div class="footer-item pager">
        <span class="footer-item" style="margin-left: 0">上一部:</span>
        <span
          v-if="props.prev"
          class="footer-item prev"
          :title="'点击观看：' + prev?.title"
          @click="playPrev"
          >{{ prev?.title }}</span
        >
        <span v-else class="footer-item">没有了</span>
      </div>
      <div class="footer-item pager">
        <span class="footer-item">下一部:</span>
        <span
          v-if="props.next"
          class="footer-item next"
          :title="'点击观看：' + next?.title"
          @click="emit('next')"
          >{{ next?.title }}</span
        >
        <span v-else class="footer-item">没有了</span>
      </div>
    </div>
    <Pagination
      v-if="pagination"
      :config="pagination"
      style="display: flex; justify-content: flex-end; padding: 12px 0 20px"
    ></Pagination>
  </div>
</template>
<script lang="ts" setup>
import {
  editMovie,
  postMovieImg,
  getMovieFavorite,
  toggleMovieFavorite,
} from '@/api'
import { ElMessage } from 'element-plus'
import { DateFormtter, formateDuration } from '@/utils/Formatter'
import { Icon } from '@iconify/vue'
const props = defineProps<{
  movie?: Record<string, any>
  prev?: Record<string, any>
  next?: Record<string, any>
  pagination?: IPagination
}>()

const emit = defineEmits(['next', 'prev', 'update-img', 'addViewTimes'])
const autoPlay = ref<boolean>(true)

let timer: any = undefined
const handleError = () => {
  timer && clearTimeout(timer)
  timer = setTimeout(() => {
    autoPlay.value && playNext()
  }, 1000)
}
const isFavoured = ref<boolean>(false)
let viewTimesTimer: any = undefined
const addViewTimes = () => {
  if (viewTimesTimer) clearTimeout(viewTimesTimer)
  viewTimesTimer = setTimeout(() => {
    if (!props.movie?._id) return
    let times = props.movie?.viewTimes || 0
    editMovie(props.movie._id, { viewTimes: ++times })
    emit('addViewTimes')
  }, 1000 * 10)
}
watch(
  () => props.movie,
  () => {
    checkFavour()
    // 观看10s则播放次数+1
    addViewTimes()
  },
)

const checkFavour = async () => {
  if (!props.movie) return
  const res = await getMovieFavorite(props.movie._id)
  isFavoured.value = res.data.data.length > 0
}
const toggleFavour = async () => {
  if (!props.movie) return
  try {
    const res = await toggleMovieFavorite(props.movie._id)
    ElMessage.success(res.data.message)
    isFavoured.value = !isFavoured.value
  } catch (error: any) {
    isFavoured.value = false
  }
}
const playNext = () => {
  timer && clearTimeout(timer)
  emit('next')
}
const playPrev = () => {
  timer && clearTimeout(timer)
  emit('prev')
}
const playEnd = async () => {
  autoPlay.value && playNext()
}
/**
 * 生成当前视频截图并保存并更新到数据库
 */
const savePic = () => {
  if (!refVideo.value) return
  const scale = 1
  const video = refVideo.value
  const id = props.movie?._id
  var canvas = document.createElement('canvas')
  canvas.width = video.videoWidth * scale
  canvas.height = video.videoHeight * scale
  canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height)
  const dataURL = canvas.toDataURL('image/png')
  postMovieImg(id, {
    data: dataURL,
  }).then(() => {
    ElMessage.success('生成视频截图成功')
  })
}

const refVideo = ref<HTMLVideoElement>()
onMounted(() => {
  refVideo.value?.addEventListener('loadeddata', () => {
    // !props.movie?.img && getVideoBase64()
    editMovie(props.movie?._id, {
      duration: refVideo.value?.duration,
    })
    // !props.movie?.img && savePic()
  })
  checkFavour()
})
defineExpose({
  savePic,
})
</script>
<style lang="scss" scoped>
.detail {
  padding: 20px;
  height: 100%;

  .video {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100% - 100px);
    min-height: 240px;
    min-width: 320px;
    video {
      max-width: 100%;
      max-height: 100%;
    }
  }

  .footer {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-end;
    align-items: center;

    .footer-item {
      margin-left: 15px;

      &.favour {
        cursor: pointer;
        display: flex;
        align-items: center;
      }

      &.favoured {
        color: var(--el-color-primary);
      }

      &.prev,
      &.next {
        overflow: hidden;
        max-width: 260px;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: aqua;
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
.pointer {
  cursor: pointer;
}
</style>
