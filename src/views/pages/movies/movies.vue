<template>
  <div class="wrapper">
    <Search ref="refSearch" :config="SearchConfig"></Search>
    <Table :config="TableConfig"></Table>
    <Banner
      :title="TableConfig.currentRow?.title"
      @upload="aouFlag = 'upload'"
    ></Banner>
    <Detail
      :movie="TableConfig.currentRow"
      :next="TableConfig.nextRow"
      :prev="TableConfig.previewRow"
      @next="handleNext"
      @prev="handlePrev"
    ></Detail>
    <Add
      v-if="aouFlag === 'upload'"
      @success="refreshData"
      :movie="TableConfig.currentRow"
    ></Add>
    <Edit
      v-if="aouFlag === 'edit'"
      :row="TableConfig.currentRow"
      @success="refreshData"
    ></Edit>
  </div>
</template>
<script lang="ts" setup>
import { getMovies, removeMovies } from "@/api";
import { computed, onMounted, reactive, ref } from "vue";
import Table from "@/components/Table.vue";
import { DateFormtter } from "@/utils/Formatter";
import Banner from "./components/banner.vue";
import Search from "@/components/Search.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import Detail from "./components/detail.vue";
import Add from "./components/add.vue";
import Edit from "./components/edit.vue";
const aouFlag = ref<"edit" | "upload">("upload");
const refSearch = ref<InstanceType<typeof Search>>();
const SearchConfig = reactive<ISearch>({
  labelWidth: 51,
  filters: [
    { type: "input", label: "搜索", field: "title" },
    { type: "input", label: "标签", field: "tags" },
    {
      type: "datetimerange",
      label: "时间",
      field: "daterange",
      shortcuts: [
        {
          text: "最近一周",
          value: () => {
            const start = new Date();
            const end = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            return [start, end];
          },
        },
        {
          text: "最近一月",
          value: () => {
            const start = new Date();
            const end = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            return [start, end];
          },
        },
        {
          text: "最近半年",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
            return [start, end];
          },
        },
      ],
    } as IDateRange,
  ],
  defaultQuery: {},
  operations: [
    { text: "搜索", click: () => refSearch.value?.submit() },
    { text: "删除", click: () => handleRemove() },
  ],
  submit: (params) => {
    console.log(params);
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
  handleSelectChange: (rows) => {
    TableConfig.selected = rows || [];
  },
});
const handleRemove = () => {
  const rows = TableConfig.selected || [];
  ElMessageBox.confirm("确定删除?", "提示信息")
    .then(async () => {
      try {
        const res = await removeMovies(rows.map((item) => item._id));
        ElMessage.success("删除成功");
        refreshData();
      } catch (error: any) {
        console.log(error);
      }
    })
    .catch(() => {
      //
    });
};
const viewMovie = (row: any) => {
  aouFlag.value = "edit";
  TableConfig.currentRow = row;
  const curIndex = TableConfig.data.findIndex(
    (item) => item._id === TableConfig.currentRow._id
  );
  TableConfig.previewRow = TableConfig.data[curIndex - 1];
  TableConfig.nextRow = TableConfig.data[curIndex + 1];
};
const refreshData = async () => {
  const params: any = {
    sortField: "createTime",
    sortType: "desc",
    page: TableConfig.pagination.page || 1,
    size: TableConfig.pagination.limit || 20,
    ...(refSearch.value?.formData || {}),
    startTime: refSearch.value?.formData?.daterange?.[0]
      ? new Date(refSearch.value?.formData?.daterange?.[0]).valueOf()
      : undefined,
    endTime: refSearch.value?.formData?.daterange?.[1]
      ? new Date(refSearch.value?.formData?.daterange?.[1]).valueOf()
      : undefined,
  };
  delete params.daterange;
  const res = await getMovies(params);
  TableConfig.data = res.data.data || [];
  TableConfig.pagination.total = res.data.total || 0;
};

const handlePrev = async () => {
  if (!TableConfig.data.length) {
    TableConfig.previewRow = undefined;
    TableConfig.nextRow = undefined;
    TableConfig.currentRow = TableConfig.data?.[0];
    return;
  }

  const curIndex = TableConfig.data.findIndex(
    (item) => item._id === TableConfig.currentRow._id
  );
  if (curIndex === -1) return;
  TableConfig.nextRow = TableConfig.currentRow;
  TableConfig.currentRow = TableConfig.previewRow;
  TableConfig.previewRow =
    curIndex >= 1 ? TableConfig.data?.[curIndex - 1] : undefined;
};
const handleNext = () => {
  if (!TableConfig.data.length) {
    TableConfig.previewRow = undefined;
    TableConfig.nextRow = undefined;
    TableConfig.currentRow = TableConfig.data?.[0];
    return;
  }

  const curIndex = TableConfig.data.findIndex(
    (item) => item._id === TableConfig.currentRow._id
  );
  if (curIndex === -1) return;
  TableConfig.previewRow = TableConfig.currentRow;
  TableConfig.currentRow = TableConfig.nextRow;
  TableConfig.nextRow =
    curIndex < TableConfig.data.length - 1
      ? TableConfig.data[curIndex + 1]
      : undefined;
};
onMounted(() => {
  refreshData();
});
</script>
<style lang="scss" scoped>
.wrapper {
  padding: 20px;
}
</style>
