<template>
  <div class="banner-wrapper">
    <span> 当前正在播放： </span>
    <div v-if="directs" class="directs title">
      <template v-for="(direct, i) in directs" :key="i">
        <span
          class="direct"
          :title="'点击查询相关：' + direct"
          @click="emit('click', direct)"
        >
          {{ direct }}
        </span>
        <span v-if="i < directs.length - 1" class="divider">/</span>
      </template>
    </div>
  </div>
</template>
<script lang="ts" setup>
const emit = defineEmits(['click'])
defineProps<{
  title?: string
  selected?: any[]
  directs?: any[]
}>()
</script>
<style lang="scss" scoped>
.banner-wrapper {
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 60px;
  word-break: keep-all;

  .directs {
    display: flex;
    margin-left: 20px;

    .direct {
      cursor: pointer;

      &:hover {
        text-decoration: underline;
        color: aqua;
      }

      &:not(:last-child) {
        overflow: hidden;
        max-width: 150px;
        text-overflow: ellipsis;
        white-space: nowrap;
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
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: brown;
    font-weight: bold;
  }
}
</style>
