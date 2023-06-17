<template>
  <Search ref="refSearch" :config="SearchConfig"></Search>
</template>
<script lang="ts" setup>
import Search from '@/components/Search.vue'
const emit = defineEmits(['remove', 'search', 'edit'])
const refSearch = ref<InstanceType<typeof Search>>()
const SearchConfig = reactive<ISearch>({
  labelWidth: 51,
  filters: [
    {
      type: 'input',
      label: '标题 ',
      field: 'title',
      onChange: () => emit('search'),
    },
    {
      type: 'input',
      label: '标签',
      field: 'tags',
      onChange: () => emit('search'),
    },
    // { type: 'input', label: '路径', field: 'direct', onChange: () => emit('search') },
    {
      type: 'input',
      label: '主演',
      field: 'starring',
      onChange: () => emit('search'),
    },
  ],
  defaultQuery: {},
  operations: [
    { text: '搜索', click: () => emit('search') },
    { text: '删除', click: () => emit('remove') },
    { text: '编辑', click: () => emit('edit', 'edit') },
    { text: '上传', click: () => emit('edit', 'upload') },
  ],
})
defineExpose({
  refSearch,
})
</script>
