<template>
  <div class="detail">
    <el-row :gutter="0">
      <el-col>
        <div class="video">
          <video
            ref="refVideo"
            style="height: 600px; max-width: 100%"
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
      <span class="footer-item">{{
        DateFormtter(props.movie?.createTime)
      }}</span>
      <span class="footer-item">观看{{ props.movie?.viewTimes || 0 }}次</span>
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
          class="footer-item prev"
          :title="'点击观看：' + prev?.title"
          v-if="props.prev"
          @click="playPrev"
          >{{ prev?.title }}</span
        >
        <span class="footer-item" v-else>没有了</span>
      </div>
      <div class="footer-item pager">
        <span class="footer-item">下一部:</span>
        <span
          class="footer-item next"
          :title="'点击观看：' + next?.title"
          v-if="props.next"
          @click="emit('next')"
          >{{ next?.title }}</span
        >
        <span v-else class="footer-item">没有了</span>
      </div>
    </div>
    <pagination
      :config="pagination"
      style="display: flex; justify-content: flex-end; padding: 12px 0 20px 0"
    ></pagination>
    <div class="comment">这里是评论区</div>
  </div>
</template>
<script lang="ts" setup>
import { editMovie, postMovieImg, getFavour, toggleFavourMovie } from "@/api";
import { ElMessage } from "element-plus";
import { computed, onMounted, ref, watch } from "vue";
import { DateFormtter } from "@/utils/Formatter";
import Pagination from "@/components/Pagination.vue";
import { Icon } from "@iconify/vue";
const props = defineProps<{
  movie?: Record<string, any>;
  prev?: Record<string, any>;
  next?: Record<string, any>;
  pagination: IPagination;
}>();
const url = computed(() => {
  return props.movie?.url?.replace("localhost", "192.168.0.102");
});
const emit = defineEmits(["next", "prev", "update-img", "addViewTimes"]);
const autoPlay = ref<boolean>(true);

let timer: any = undefined;
const handleError = () => {
  ElMessage.info("视频无法播放，自动播放下一部");
  timer && clearTimeout(timer);
  timer = setTimeout(() => {
    autoPlay.value && playNext();
  }, 1000);
};
const isFavoured = ref<boolean>(false);
let viewTimesTimer: any = undefined;
const addViewTimes = () => {
  if (viewTimesTimer) clearTimeout(viewTimesTimer);
  viewTimesTimer = setTimeout(() => {
    if (!props.movie?._id) return;
    let times = props.movie?.viewTimes || 0;
    editMovie(props.movie._id, { viewTimes: ++times });
    emit("addViewTimes");
  }, 1000 * 10);
};
watch(
  () => props.movie,
  () => {
    checkFavour();
    // 观看10s则播放次数+1
    addViewTimes();
  }
);
const checkFavour = async () => {
  if (!props.movie) return;
  const res = await getFavour(props.movie._id);
  console.log(res);
  isFavoured.value = res.data.data.length > 0;
};
const toggleFavour = async () => {
  if (!props.movie) return;
  try {
    const res = await toggleFavourMovie(props.movie._id);
    ElMessage.success(res.data.message);
    isFavoured.value = !isFavoured.value;
  } catch (error: any) {
    console.log(error.message);
    isFavoured.value = false;
  }
};
const playNext = () => {
  timer && clearTimeout(timer);
  emit("next");
};
const playPrev = () => {
  timer && clearTimeout(timer);
  emit("prev");
};
const playEnd = async () => {
  autoPlay.value && playNext();
};
const getVideoBase64 = () => {
  const url = props.movie?.url;
  const id = props.movie?._id;
  if (!url) return;
  let video = document.createElement("video");
  const videoIns = video.setAttribute("crossOrigin", "anonymous"); //处理跨域
  video.setAttribute("src", url);
  const width = refVideo.value?.clientWidth || 150;
  const height = refVideo.value?.clientHeight || 220;
  video.setAttribute("width", width + "px");
  video.setAttribute("height", height + "px");
  video.setAttribute("preload", "auto");
  video.addEventListener("loadeddata", function () {
    const canvas = document.createElement("canvas");
    const width = video.width; //canvas的尺寸和图片一样
    const height = video.height;
    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d")?.drawImage(video, 0, 0, width, height); //绘制canvas
    const dataURL = canvas.toDataURL("image/jpeg"); //转换为base64
    postMovieImg(id, {
      data: dataURL,
    }).then((res) => {
      emit("update-img");
      ElMessage.success("已自动生成封面图片");
    });
  });
};
const refVideo = ref<HTMLVideoElement>();
onMounted(() => {
  refVideo.value?.addEventListener("loadeddata", () => {
    !props.movie?.img && getVideoBase64();
  });
  checkFavour();
});
</script>
<style lang="scss" scoped>
.detail {
  padding: 20px;
  .video {
    width: 100%;
    height: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .comment {
    max-height: 560px;
    display: grid;
    place-items: center;
  }
  .footer {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    flex-wrap: wrap;
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
        color: aqua;
        cursor: pointer;
        max-width: 260px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
