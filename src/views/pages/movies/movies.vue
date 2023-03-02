<template>
  <div class="wrapper">
    <Search ref="refSearch" :config="SearchConfig"></Search>
    <Table :config="TableConfig"></Table>
    <Banner :title="TableConfig.currentRow?.title"></Banner>
    <RouterView></RouterView>
  </div>
</template>
<script lang="ts" setup>
import { getMovies } from "@/api";
import { onMounted, reactive, ref } from "vue";
import Table from "@/components/Table.vue";
import { DateFormtter } from "@/utils/Formatter";
import router from "@/router";
import Banner from "./components/banner.vue";
import Search from "@/components/Search.vue";
const refSearch = ref<InstanceType<typeof Search>>();
const SearchConfig = reactive<ISearch>({
  filters: [
    { type: "input", label: "搜索", field: "title" },
    { type: "input", label: "标签", field: "tags" },
  ],
  defaultQuery: {},
  operations: [{ text: "搜索", click: () => refSearch.value?.submit() }],
  submit: () => {
    refreshData();
  },
});
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
    { label: "封面", prop: "img", image: true },
    { label: "标签", prop: "tags" },
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
  const res = await getMovies({
    page: TableConfig.pagination.page || 1,
    size: TableConfig.pagination.limit || 20,
    ...(refSearch.value?.formData || {}),
  });
  TableConfig.data = res.data.data || [];
  TableConfig.pagination.total = res.data.total || 0;
};
onMounted(() => {
  refreshData()
});
</script>
<style lang="scss" scoped>
.list-main {
  height: calc(100% - 40px);
}
</style>
