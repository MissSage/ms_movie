<template>
  <div class="detail">
    <div class="audio">
      <AudioWave
        :url="music?.url"
        :img="music?.img"
        @error="handleError"
        @ended="playEnd"
        @next="emit('next')"
        @prev="emit('prev')"
      ></AudioWave>
    </div>
    <div class="footer">
      <span class="footer-item">观看{{ props.music?.viewTimes || 0 }}次</span>
      <span
        class="footer-item favour"
        :class="[isFavoured === true ? 'favoured' : '']"
        @click="toggleFavour"
      >
        <Icon icon="mdi:heart"></Icon>
      </span>
      <div class="footer-item pager">
        <span class="footer-item">上一部:</span>
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
import { editMusic, getMusicFavorite } from '@/api'
import { Icon } from '@iconify/vue'
import AudioWave from '@/components/AudioWave.vue'
import { toggleMusicFavorite } from '@/api/modules/music/musicFavorite'
import { ElMessage } from 'element-plus'
const props = defineProps<{
  music?: Record<string, any>
  prev?: Record<string, any>
  next?: Record<string, any>
  pagination: IPagination
}>()

const emit = defineEmits(['next', 'prev', 'update-img', 'addViewTimes'])

let timer: any = undefined
const handleError = () => {
  timer && clearTimeout(timer)
  timer = setTimeout(() => {
    playNext()
  }, 1000)
}
const isFavoured = ref<boolean>(false)
let viewTimesTimer: any = undefined
const addViewTimes = () => {
  if (viewTimesTimer) clearTimeout(viewTimesTimer)
  viewTimesTimer = setTimeout(() => {
    if (!props.music?._id) return
    let times = props.music?.viewTimes || 0
    editMusic(props.music._id, { viewTimes: ++times })
    emit('addViewTimes')
  }, 1000 * 10)
}
watch(
  () => props.music,
  () => {
    checkFavour()
    // 观看10s则播放次数+1
    addViewTimes()
  },
)
const checkFavour = async () => {
  if (!props.music) return
  const res = await getMusicFavorite(props.music._id)
  isFavoured.value = res.data.data.length > 0
}
const toggleFavour = async () => {
  if (!props.music) return
  try {
    const res = await toggleMusicFavorite(props.music._id)
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
  playNext()
}
onMounted(() => {
  checkFavour()
})
</script>
<style lang="scss" scoped>
.detail {
  padding: 20px;

  .audio {
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
