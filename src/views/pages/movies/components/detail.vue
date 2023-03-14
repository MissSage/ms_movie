<template>
  <div class="detail">
    <el-row :gutter="0">
      <el-col>
        <div class="video">
          <video
            ref="refVideo"
            style="max-width: 100%; height: 600px"
            autoplay
            controls
            :src="movie?.url"
            @ended="playEnd"
            @error="handleError"
          ></video>
        </div>
      </el-col>
    </el-row>
    <div class="footer">
      <el-checkbox v-model="autoPlay">自动播放下一部</el-checkbox>
      <span class="footer-item">{{ DateFormtter(props.movie?.createTime) }}</span>
      <span class="footer-item">观看{{ props.movie?.viewTimes || 0 }}次</span>
      <span class="footer-item">时长：{{ formateDuration(props.movie?.duration) }}</span>
      <span
        class="footer-item favour"
        :class="[isFavoured === true ? 'favoured' : '']"
        @click="toggleFavour"
      >
        <Icon icon="mdi:heart"></Icon>收藏
      </span>
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
    <pagination
      :config="pagination"
      style="display: flex; justify-content: flex-end; padding: 12px 0 20px"
    ></pagination>
    <div class="comment">这里是评论区</div>
  </div>
</template>
<script lang="ts" setup>
import { editMovie, postMovieImg, getFavour, toggleFavourMovie } from '@/api'
import { ElMessage } from 'element-plus'
import { DateFormtter } from '@/utils/Formatter'
import { Icon } from '@iconify/vue'
const props = defineProps<{
  movie?: Record<string, any>
  prev?: Record<string, any>
  next?: Record<string, any>
  pagination: IPagination
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
const formateDuration = (duration = 0) => {
  if (!duration) return '--'
  if (duration < 60) return Math.floor(duration) + '秒'
  else if (duration < 3600)
    return Math.floor(duration / 60) + '分' + Math.floor(duration % 60) + '秒'
  else {
    return (
      Math.floor(duration / 3600) +
      '时' +
      Math.floor((duration % 3600) / 60) +
      '分' +
      Math.floor(duration % 60) +
      '秒'
    )
  }
}
const checkFavour = async () => {
  if (!props.movie) return
  const res = await getFavour(props.movie._id)
  isFavoured.value = res.data.data.length > 0
}
const toggleFavour = async () => {
  if (!props.movie) return
  try {
    const res = await toggleFavourMovie(props.movie._id)
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
const getVideoBase64 = () => {
  const url = props.movie?.url
  const id = props.movie?._id
  if (!url) return
  let video = document.createElement('video')
  video.setAttribute('crossOrigin', 'anonymous') //处理跨域
  video.setAttribute('src', url)
  const width = refVideo.value?.clientWidth || 150
  const height = refVideo.value?.clientHeight || 220
  video.setAttribute('width', width + 'px')
  video.setAttribute('height', height + 'px')
  video.setAttribute('preload', 'auto')
  video.addEventListener('loadeddata', function () {
    const canvas = document.createElement('canvas')
    const width = video.width //canvas的尺寸和图片一样
    const height = video.height
    canvas.width = width
    canvas.height = height
    canvas.getContext('2d')?.drawImage(video, 0, 0, width, height) //绘制canvas
    const dataURL = canvas.toDataURL('image/png') //转换为base64
    postMovieImg(id, {
      data: dataURL,
    })
  })
}
const refVideo = ref<HTMLVideoElement>()
onMounted(() => {
  refVideo.value?.addEventListener('loadeddata', () => {
    !props.movie?.img && getVideoBase64()
    editMovie(props.movie?._id, {
      duration: refVideo.value?.duration,
    })
  })
  checkFavour()
})
</script>
<style lang="scss" scoped>
.detail {
  padding: 20px;

  .video {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 600px;
  }

  .comment {
    display: grid;
    max-height: 560px;
    place-items: center;
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
</style>
