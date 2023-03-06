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
            @ended="addViewTime"
            @error="handleError"
          ></video>
        </div>
      </el-col>
    </el-row>
    <div class="comment">这里是评论区</div>
    <div class="footer">
      <el-checkbox v-model="autoPlay">自动播放下一部</el-checkbox>
      <span class="footer-item">{{
        DateFormtter(props.movie?.createTime)
      }}</span>
      <span class="footer-item">观看{{ props.movie?.viewTimes || 0 }}次</span>
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
  </div>
</template>
<script lang="ts" setup>
import { editMovie, postMovieImg } from "@/api";
import { ElMessage } from "element-plus";
import { computed, onMounted, ref, watch } from "vue";
import { DateFormtter } from "@/utils/Formatter";
const props = defineProps<{
  movie?: Record<string, any>;
  prev?: Record<string, any>;
  next?: Record<string, any>;
}>();
const url = computed(() => {
  return props.movie?.url?.replace("localhost", "192.168.0.102");
});
const emit = defineEmits(["next", "prev", "update-img"]);
const autoPlay = ref<boolean>(true);
const newTag = ref<string>("");
const tags = computed<string[]>(() => {
  return props.movie?.tags?.split(",") || [];
});
let timer: any = undefined;
const handleError = () => {
  ElMessage.info("视频无法播放，自动播放下一部");
  timer && clearTimeout(timer);
  timer = setTimeout(() => {
    autoPlay.value && playNext();
  }, 1000);
};
const playNext = () => {
  timer && clearTimeout(timer);
  emit("next");
};
const playPrev = () => {
  timer && clearTimeout(timer);
  emit("prev");
};
const addViewTime = async () => {
  if (!props.movie?._id) return;
  let times = props.movie?.viewTimes || 0;
  autoPlay.value && playNext();
  await editMovie(props.movie._id, { viewTimes: ++times });
  ElMessage.success("观看次数 +1 !");
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
      console.log(res.data.data);
    });
  });
};
const refVideo = ref<HTMLVideoElement>();
onMounted(() => {
  refVideo.value?.addEventListener("loadeddata", () => {
    !props.movie?.img && getVideoBase64();
  });
});
</script>
<style lang="scss" scoped>
.detail {
  padding: 20px;
  .video {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .tags {
      width: 50%;
    }
    .right {
      width: 50%;
    }
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
