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
    <el-check-tag
      v-for="(item, i) in directs.directs.value"
      :key="i"
      :checked="directs.curDirect.value === item.path"
      @change="(flag:boolean) =>handleDirectCheck(item.path,flag)"
    >
      {{ item.path }}
    </el-check-tag>
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
  display: flex;
  flex-wrap: wrap;
  .el-check-tag {
    font-size: 14px;
    margin: 4px;
  }
}
.pointer {
  cursor: pointer;
}
</style>
