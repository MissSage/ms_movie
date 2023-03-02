import router from '@/router'; import router from '@/router';

<template>
  <div class="detail">
    <div class="video">
      <video
        style="height: 600px"
        autoplay
        controls
        :src="movie.movie.value?.url"
      ></video>
      <div class="tags">
        <div class="tag-item">
          <el-tag v-for="tag in movie.curTags.value" :key="tag">{{
            tag
          }}</el-tag>
        </div>
        <div class="tag-add">
          <el-input v-model="movie.newTag.value" autocomplete="true"></el-input>
          <el-button @click="movie.addTag()"> 添加 </el-button>
        </div>
      </div>
    </div>
    <div class="comment">这里是评论区</div>
    <div class="footer">
      <span>2022-02-02 12:12:12</span>
      <span>观看{{ 100 }}次</span>
      <Icon icon="material-symbols:favorite"></Icon>

      <el-button>标签</el-button>
      <el-button>收藏</el-button>
      <el-button>评论</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import router from "@/router";
import { Icon } from "@iconify/vue";
import { onMounted } from "vue";
import { onBeforeRouteUpdate } from "vue-router";
import { useMovie } from "../hooks/useMovie";
const movie = useMovie();
onBeforeRouteUpdate((to) => {
  movie.getMovie(to.params.id as string);
});
onMounted(() => {
  movie.getMovie(router.currentRoute.value.params.id as string);
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
      width: 500px;
    }
  }
  .comment {
    max-height: 560px;
    display: grid;
    place-items: center;
  }
  .footer {
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
