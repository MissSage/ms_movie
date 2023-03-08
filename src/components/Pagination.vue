<template>
  <ElPagination
    role="pagination"
    aria-label="pagination"
    :current-page="config.page || 1"
    :page-size="config.limit || 20"
    :class="config.align || 'left'"
    :layout="config.layout || 'total,sizes, prev, pager, next, jumper'"
    :total="config.total || 0"
    :page-sizes="config.pageSize || [20, 40, 100, 200, 500]"
    @update:page-size="handleSize"
    @update:current-page="handlePage"
  />
</template>

<script lang="ts" setup>
const props = defineProps<{
  config: IPagination
}>()

const state = reactive<{ page: number; size: number }>({
  page: props.config?.page || 1,
  size: props.config?.limit || 20,
})
const handlePage = (page: number) => {
  state.page = page
  props.config.refreshData?.(state)
}
const handleSize = (size: number) => {
  state.size = size
  props.config.refreshData?.(state)
}
</script>

<style lang="scss" scoped>
.left {
  text-align: left;
}

.right {
  justify-content: flex-end;
  text-align: right;
}

.el-pagination {
  flex-wrap: wrap;
}
</style>
