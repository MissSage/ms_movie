<template>
  <Search ref="refSearch" :config="SearchConfig"></Search>
</template>
<script lang="ts" setup>
import Search from '@/components/Search.vue'
const emit = defineEmits(['remove', 'search'])
const refSearch = ref<InstanceType<typeof Search>>()
const SearchConfig = reactive<ISearch>({
  labelWidth: 51,
  filters: [
    { type: 'input', label: '搜索', field: 'title' },
    { type: 'input', label: '标签', field: 'tags' },
    { type: 'input', label: '路径', field: 'direct' },
  ],
  defaultQuery: {},
  operations: [
    { text: '搜索', click: () => emit('search') },
    { text: '删除', click: () => emit('remove') },
  ],
})
defineExpose({
  refSearch,
})
</script>
