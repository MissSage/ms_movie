<template>
  <div class="banner-wrapper">
    <span>
      当前正在播放：
      <span class="title">{{ props.title }}</span>
    </span>
    <el-button @click="router.push({ path: '/add' })">上传</el-button>
  </div>
</template>
<script lang="ts" setup>
import router from "@/router";

const props = defineProps<{ title: string }>();
</script>
<style lang="scss" scoped>
.banner-wrapper{
  height: 60px;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  align-items: center;
  span{
    font-size: 14px;
  }
  .title{
    font-weight: bold;
  }
}
</style>
