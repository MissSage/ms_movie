<template>
  <div class="wrapper">
    <Table :config="TableConfig"></Table>
    <Banner :title="TableConfig.currentRow?.title"></Banner>
    <RouterView></RouterView>
  </div>
</template>
<script lang="ts" setup>
import { getMovies } from "@/api";
import { onMounted, reactive } from "vue";
import Table from "@/components/Table.vue";
import { DateFormtter } from "@/utils/Formatter";
import router from "@/router";
import Banner from "./components/banner.vue";
const TableConfig = reactive<ITable>({
  data: [],
  pagination: {
    refreshData: ({ page, size }) => {
      TableConfig.pagination.page = page;
      TableConfig.pagination.limit = size;
      refreshData();
    },
  },
  columns: [
    { label: "标题", prop: "title" },
    { label: "标签", prop: "img", image: true },
    { label: "上传时间", prop: "createTime", formatter: DateFormtter },
  ],
  operations: [{ text: "观看", click: (row) => viewMovie(row) }],
});
const viewMovie = (row: any) => {
  console.log(row);
  TableConfig.currentRow = row;
  router.push({
    path: "/play/" + row._id,
  });
};
const refreshData = async () => {
  const res = await getMovies();
  TableConfig.data = res.data.data || [];
  TableConfig.pagination.total = res.data.total || 0;
};
onMounted(() => {
  refreshData();
});
</script>
<style lang="scss" scoped>
.list-main {
  height: calc(100% - 40px);
}
</style>
