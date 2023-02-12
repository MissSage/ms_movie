<template>
  <div class="layout">
    <div class="list-main">
      <MasonryLayouts></MasonryLayouts>
    </div>
    <Pagination :config="pagination"></Pagination>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import MasonryLayouts from "../../../components/MasonryLayouts.vue";
import Pagination from "../../../components/Pagination.vue";
const pagination = reactive<IPagination>({
  refreshData: ({ page, size }) => {
    pagination.page = page;
    pagination.limit = size;
    // initData();
  },
});
</script>
<style lang="scss" scoped>
.list-main {
  height: calc(100% - 40px);
}
</style>
