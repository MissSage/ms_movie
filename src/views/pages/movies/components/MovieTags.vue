<template>
  <div class="tags-wrapper">
    <el-input
      v-model="directs.path.value"
      style="margin-bottom: 20px"
      :clearable="true"
      @change="directs.getDirects"
    >
      <template #append>
        <Icon
          class="pointer"
          :icon="'ep:search'"
          @click="directs.getDirects"
        ></Icon>
      </template>
    </el-input>
    <el-empty v-if="!directs.directs.value.length" description="暂无标签" />
    <div v-else class="tasgs-scroll">
      <el-check-tag
        v-for="(item, i) in directs.directs.value"
        :key="i"
        :checked="directs.curDirect.value === item.path"
        @change="(flag:boolean) =>handleDirectCheck(item.path,flag)"
      >
        {{ item.path }}
      </el-check-tag>
    </div>
  </div>
</template>
<script lang="ts" setup>
import useDirects from '../hooks/useDirects'
import { Icon } from '@iconify/vue'
const emits = defineEmits(['check'])
const directs = useDirects()

const handleDirectCheck = (direct: string, flag: boolean) => {
  directs.curDirect.value = flag ? direct : ''
  emits('check')
}
defineExpose({
  directs,
  handleDirectCheck,
})
onMounted(() => {
  directs.getDirects()
})
</script>
<style lang="scss" scoped>
.tags-wrapper {
  height: 100%;

  .el-check-tag {
    font-size: 14px;
    margin: 4px;
    line-height: 1.5;
    display: inline-flex;
  }
  .tasgs-scroll {
    overflow-y: auto;
    height: calc(100% - 60px);
    min-height: 100px;
  }
}
.pointer {
  cursor: pointer;
}
</style>
