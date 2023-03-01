import router from '@/router'; import router from '@/router';

<template>
  <div class="detail">
    <video style="width: 600px" autoplay controls :src="url"></video>
    <div class="detail-footer">
      <el-button>标签</el-button>
      <el-button>收藏</el-button>
      <el-button>评论</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { getMovie } from "@/api";
import router from "@/router";
import { ref, onMounted } from "vue";
import { onBeforeRouteUpdate } from "vue-router";
const url = ref<string>("");
const refreshData = async (id?: string) => {
  id = id ?? (router.currentRoute.value.params?.id as string);
  const movie = await getMovie(id);
  url.value = movie.data?.url;
};
onBeforeRouteUpdate((to) => {
  refreshData(to.params.id as string);
});
onMounted(() => {
  refreshData();
});
</script>
<style lang="scss" scoped>
.detail {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.detail-footer{
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 60px;
  justify-content: flex-start;
  align-items: center;
}
</style>
