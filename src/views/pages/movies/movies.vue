<template>
  <div class="wrapper">
    <Search ref="refSearch" :config="SearchConfig"></Search>
    <List :config="TableConfig"></List>
    <!-- <Table :config="TableConfig"></Table> -->
    <Banner
      :title="TableConfig.currentRow?.title"
      :directs="TableConfig.currentRow?.directs"
      @upload="aouFlag = 'upload'"
      @direct-click="handleDirectClick"
    ></Banner>
    <Add
      v-if="aouFlag === 'upload'"
      @success="refreshData"
      :movie="TableConfig.currentRow"
    ></Add>
    <Detail
      :movie="TableConfig.currentRow"
      :next="TableConfig.nextRow"
      :prev="TableConfig.previewRow"
      @next="handleNext"
      @prev="handlePrev"
      @update-img="handleImgUpdate"
    ></Detail>
    <Edit
      v-if="aouFlag === 'edit'"
      :row="TableConfig.currentRow"
      @success="refreshData"
    ></Edit>
  </div>
</template>
<script lang="ts" setup>
import { getMovies, removeMovies } from "@/api";
import { computed, nextTick, onMounted, reactive, ref } from "vue";
import Table from "@/components/Table.vue";
import { DateFormtter } from "@/utils/Formatter";
import Banner from "./components/banner.vue";
import Search from "@/components/Search.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import Detail from "./components/detail.vue";
import Add from "./components/add.vue";
import Edit from "./components/edit.vue";
import List from "./components/list.vue";
const aouFlag = ref<"edit" | "upload">("edit");
const refSearch = ref<InstanceType<typeof Search>>();
const SearchConfig = reactive<ISearch>({
  labelWidth: 51,
  filters: [
    { type: "input", label: "搜索", field: "title" },
    { type: "input", label: "标签", field: "tags" },
    // {
    //   type: "datetimerange",
    //   label: "时间",
    //   field: "daterange",
    //   shortcuts: [
    //     {
    //       text: "最近一周",
    //       value: () => {
    //         const start = new Date();
    //         const end = new Date();
    //         start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
    //         return [start, end];
    //       },
    //     },
    //     {
    //       text: "最近一月",
    //       value: () => {
    //         const start = new Date();
    //         const end = new Date();
    //         start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
    //         return [start, end];
    //       },
    //     },
    //     {
    //       text: "最近半年",
    //       value: () => {
    //         const end = new Date();
    //         const start = new Date();
    //         start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
    //         return [start, end];
    //       },
    //     },
    //   ],
    // } as IDateRange,
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
    page: 1,
    limit: 20,
    refreshData: ({ page, size }) => {
      TableConfig.pagination.page = page;
      TableConfig.pagination.limit = size;
      refreshData();
    },
  },
  columns: [
    { label: "标题", prop: "title" },
    { label: "封面", prop: "img", image: true, fit: "contain" },
    { label: "标签", prop: "tags" },
    { label: "上传时间", prop: "createTime", formatter: DateFormtter },
  ],
  operations: [{ text: "观看", click: (row) => viewMovie(row) }],
  handleSelectChange: (rows) => {
    TableConfig.selected = rows || [];
  },
  rowClick: (row) => viewMovie(row),
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
  TableConfig.currentRow = row;
  togglePrevOrNext();
};
const handleImgUpdate = (img: string) => {
  refreshData();
};
const handleDirectClick = (direct: string) => {
  refreshData({ direct });
};
const refreshData = async (extraParams?: Record<string, any>) => {
  console.log(TableConfig.pagination.page);
  const params: any = {
    sortField: "_id",
    sortType: "asc",
    page: TableConfig.pagination.page || 1,
    size: TableConfig.pagination.limit || 20,
    ...(refSearch.value?.formData || {}),
    startTime: refSearch.value?.formData?.daterange?.[0]
      ? new Date(refSearch.value?.formData?.daterange?.[0]).valueOf()
      : undefined,
    endTime: refSearch.value?.formData?.daterange?.[1]
      ? new Date(refSearch.value?.formData?.daterange?.[1]).valueOf()
      : undefined,
    ...(extraParams || {}),
  };
  delete params.daterange;
  const res = await getMovies(params);
  TableConfig.data =
    res.data.data?.map((item: any) => {
      item.url = item.url?.replace(
        window.SITE_CONFIG.movieConfig.movieOriginBase,
        window.SITE_CONFIG.movieConfig.movieBase
      );
      item.img = item.img?.replace(
        window.SITE_CONFIG.movieConfig.imgOriginBase,
        window.SITE_CONFIG.movieConfig.imgBase
      );
      return item;
    }) || [];
  TableConfig.pagination.total = res.data.total || 0;
  togglePrevOrNext();
};
const togglePrevOrNext = async (offset = 0) => {
  aouFlag.value = "edit";
  await nextTick();
  const length = TableConfig.data.length;
  if (!length) return;
  let curIndex = TableConfig.data.findIndex(
    (item) => item._id === TableConfig.currentRow?._id
  );
  // 处理没有的情况
  if (curIndex < 0) {
    curIndex = 0;
  }
  // 处理当前索引
  curIndex += offset;
  curIndex < 0 && (curIndex = length - 1);
  curIndex > length - 1 && (curIndex = 0);
  // 处理前后索引
  const prevIndex = curIndex === 0 ? length - 1 : curIndex - 1;
  const nextIndex = curIndex === length - 1 ? 0 : curIndex + 1;
  TableConfig.currentRow = TableConfig.data[curIndex];
  TableConfig.previewRow = TableConfig.data[prevIndex];
  TableConfig.nextRow = TableConfig.data[nextIndex];
};
const handleNext = () => {
  togglePrevOrNext(1);
};
const handlePrev = () => {
  togglePrevOrNext(-1);
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
