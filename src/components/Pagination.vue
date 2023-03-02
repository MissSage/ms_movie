<template>
  <ElPagination
    role="pagination"
    aria-label="pagination"
    :current-page="config.page || 1"
    :page-size="config.limit || 20"
    :class="config.align || 'left'"
    :layout="config.layout || 'total,sizes, prev, pager, next, jumper'"
    :total="config.total || 0"
    :page-sizes="config.pageSize || [20, 40, 70, 100, 150]"
    @size-change="handleSize"
    @current-change="handlePage"
    @prev-click="handlePage"
    @next-click="handlePage"
  />
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { ElPagination } from "element-plus";
const props = defineProps<{
  config: IPagination;
}>();
// const state = reactive<{ page: number; size: number }>({
//   page: props.config?.page || 1,
//   size: props.config?.limit || 20,
// });
const handlePage = (page: number) => {
  props.config.refreshData?.({ page, size: props.config.limit || 20 });
};
const handleSize = (size: number) => {
  props.config.refreshData?.({ page: props.config.page || 1, size });
};
</script>

<style lang="scss" scoped>
.left {
  text-align: left;
}
.right {
  text-align: right;
  justify-content: flex-end;
}
</style>
