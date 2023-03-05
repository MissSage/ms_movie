<template>
  <div class="banner-wrapper">
    <span> 当前正在播放： </span>
    <span class="title" :title="props.title">{{ props.title }}</span>
    <div v-if="directs" class="directs">
      <template v-for="(direct, i) in directs">
        <span
          class="direct"
          :title="'点击查询相关：' + direct"
          @click="emit('directClick', direct)"
        >
          {{ direct }}
        </span>
        <span class="divider" v-if="i < directs.length - 1">/</span>
      </template>
    </div>
    <div class="right">
      <el-button @click="uploadFiles">上传</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";

const autoPlay = ref<boolean>(false);
const emit = defineEmits(["upload", "directClick", "toggleAuto"]);
const props = defineProps<{
  title?: string;
  selected?: any[];
  directs?: any[];
}>();
const uploadFiles = () => {
  emit("upload");
};
</script>
<style lang="scss" scoped>
.banner-wrapper {
  height: 60px;
  display: flex;
  padding: 0 20px;
  align-items: center;
  word-break: keep-all;

  .directs {
    display: flex;
    margin-left: 20px;
    .direct {
      max-width: 150px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      cursor: pointer;
      &:last-child {
        max-width: 260px;
      }

      &:hover {
        color: aqua;
        text-decoration: underline;
      }
    }
    .divider {
      margin: 0 8px;
    }
  }
  .right {
    margin-left: auto;
  }
  span {
    font-size: 14px;
  }
  .title {
    font-weight: bold;
    color: brown;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}
</style>
