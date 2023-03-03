<template>
  <div class="banner-wrapper">
    <span>
      当前正在播放：
      <span class="title">{{ props.title }}</span>
    </span>
    <div class="right">
      <el-button @click="uploadFiles">上传</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
const emit = defineEmits(["upload"]);
const props = defineProps<{ title?: string; selected?: any[] }>();
const uploadFiles = () => {
  emit("upload");
};
</script>
<style lang="scss" scoped>
.banner-wrapper {
  height: 60px;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  align-items: center;
  span {
    font-size: 14px;
  }
  .title {
    font-weight: bold;
  }
}
</style>
