<template>
  <div class="layout">
    <div class="list-main">
      <MasonryLayouts :data-list="state.dataList"></MasonryLayouts>
    </div>
    <Pagination :config="pagination"></Pagination>
  </div>
</template>
<script lang="ts" setup>
import { onBeforeMount, reactive } from "vue"
import { getMovies } from "../../../api"
import MasonryLayouts from "../../../components/MasonryLayouts.vue"
import Pagination from "../../../components/Pagination.vue"
const state = reactive<{
  dataList: any[]
}>({
  dataList: []
})
const pagination = reactive<IPagination>({
  refreshData: ({ page, size }) => {
    pagination.page = page
    pagination.limit = size
    initData()
  }
})
const initData = async () => {
  const res = await getMovies({
    page: pagination.page || 1,
    size: pagination.limit || 20
  })
  state.dataList = res.data.data
}
onBeforeMount(() => {
  initData()
})
</script>
<style lang="scss" scoped>
.list-main {
  height: calc(100% - 60px);
  min-height: 500px;
}
</style>
