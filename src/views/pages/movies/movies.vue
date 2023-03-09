<template>
  <div class="wrapper">
    <Search ref="refSearch" :config="SearchConfig"></Search>
    <div class="type-search">
      <el-check-tag
        v-for="(item, i) in types.typeList.value"
        :key="i"
        :checked="types.newType.value === item.name"
        @change="(flag:boolean) =>handleTypeChange(item.name,flag)"
      >
        {{ item.name }}
      </el-check-tag>
    </div>
    <List :config="TableConfig" @append="handleAppend"></List>
    <!-- <Table :config="TableConfig"></Table> -->
    <Banner
      :title="TableConfig.currentRow?.title"
      :directs="TableConfig.currentRow?.directs"
      @upload="aouFlag = 'upload'"
      @direct-click="handleDirectClick"
    ></Banner>
    <Add v-if="aouFlag === 'upload'" :movie="TableConfig.currentRow" @success="refreshData"></Add>
    <Detail
      :pagination="TableConfig.pagination"
      :movie="TableConfig.currentRow"
      :next="TableConfig.nextRow"
      :prev="TableConfig.previewRow"
      @next="handleNext"
      @prev="handlePrev"
      @add-view-times="handleAddViewTimes"
    ></Detail>
    <Edit v-if="aouFlag === 'edit'" :row="TableConfig.currentRow" @success="refreshData"></Edit>
  </div>
</template>
<script lang="ts" setup>
import { getMovies, removeMovies } from '@/api'
import { DateFormtter } from '@/utils/Formatter'
import Search from '@/components/Search.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import Banner from './components/banner.vue'
import Detail from './components/detail.vue'
import Add from './components/add.vue'
import Edit from './components/edit.vue'
import List from './components/list.vue'
import { useTypes } from './hooks/useType'
const types = useTypes()
const aouFlag = ref<'edit' | 'upload'>('edit')
const refSearch = ref<InstanceType<typeof Search>>()
const SearchConfig = reactive<ISearch>({
  labelWidth: 51,
  filters: [
    { type: 'input', label: '搜索', field: 'title' },
    { type: 'input', label: '标签', field: 'tags' },
  ],
  defaultQuery: {},
  operations: [
    { text: '搜索', click: () => refSearch.value?.submit() },
    { text: '删除', click: () => handleRemove() },
  ],
  submit: () => {
    refreshData()
  },
})
const TableConfig = reactive<ITable>({
  data: [],
  pagination: {
    page: 1,
    limit: 20,
    refreshData: ({ page, size }) => {
      TableConfig.pagination.page = page
      TableConfig.pagination.limit = size
      refreshData()
    },
  },
  columns: [
    { label: '标题', prop: 'title' },
    { label: '封面', prop: 'img', image: true, fit: 'contain' },
    { label: '标签', prop: 'tags' },
    { label: '上传时间', prop: 'createTime', formatter: DateFormtter },
  ],
  operations: [{ text: '观看', click: (row) => viewMovie(row) }],
  handleSelectChange: (rows) => {
    TableConfig.selected = rows || []
  },
  rowClick: (row) => viewMovie(row),
})
const handleAddViewTimes = () => {
  if (!TableConfig.currentRow) return
  TableConfig.currentRow.viewTimes = (TableConfig.currentRow.viewTimes ?? 0) + 1
}
const handleRemove = () => {
  const rows = TableConfig.selected || []
  ElMessageBox.confirm('确定删除?', '提示信息')
    .then(async () => {
      try {
        await removeMovies(rows.map((item) => item._id))
        ElMessage.success('删除成功')
        refreshData()
      } catch (error: any) {
        console.log(error)
      }
    })
    .catch(() => {
      //
    })
}
const viewMovie = (row: any) => {
  TableConfig.currentRow = row
  togglePrevOrNext()
}

const handleDirectClick = (direct: string) => {
  refreshData({ direct })
}
const handleTypeChange = (type: string, flag: boolean) => {
  if (!flag) {
    types.newType.value = ''
  } else {
    types.newType.value = type
  }
  refreshData()
}
const refreshData = async (
  extraParams?: Record<string, any>,
  options?: {
    append?: boolean
  },
) => {
  const params: any = {
    sortField: '_id',
    sortType: 'asc',
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
    type: types.newType.value,
  }
  delete params.daterange
  const res = await getMovies(params)
  const data =
    res.data.data?.map((item: any) => {
      item.url = item.url?.replace(
        window.SITE_CONFIG.movieConfig.movieOriginBase,
        window.SITE_CONFIG.movieConfig.movieBase,
      )
      item.img = item.img?.replace(
        window.SITE_CONFIG.movieConfig.imgOriginBase,
        window.SITE_CONFIG.movieConfig.imgBase,
      )
      return item
    }) || []
  if (options?.append) {
    let tData = TableConfig.data
    if (TableConfig.data.length > 200 && TableConfig.data.length > data.length) {
      tData = TableConfig.data.slice(data.length)
    }
    TableConfig.data = [...tData, ...data]
  } else {
    TableConfig.data = data
  }
  TableConfig.pagination.total = res.data.total || 0
  togglePrevOrNext()
}
const togglePrevOrNext = async (offset = 0) => {
  aouFlag.value = 'edit'
  await nextTick()
  const length = TableConfig.data.length
  if (!length) return
  let curIndex = TableConfig.data.findIndex((item) => item._id === TableConfig.currentRow?._id)
  // 处理没有的情况
  if (curIndex < 0) {
    curIndex = 0
  }
  // 处理当前索引
  curIndex += offset
  curIndex < 0 && (curIndex = length - 1)
  if (curIndex > length - 1) {
    TableConfig.pagination.page = (TableConfig.pagination.page ?? 1) + 1
    await refreshData(undefined, { append: true })
  }
  // 处理前后索引
  const prevIndex = curIndex === 0 ? length - 1 : curIndex - 1
  const nextIndex = curIndex === length - 1 ? 0 : curIndex + 1
  TableConfig.currentRow = TableConfig.data[curIndex]
  TableConfig.previewRow = TableConfig.data[prevIndex]
  TableConfig.nextRow = TableConfig.data[nextIndex]
}
const handleNext = () => {
  togglePrevOrNext(1)
}
const handlePrev = () => {
  togglePrevOrNext(-1)
}
const handleAppend = () => {
  TableConfig.pagination.page = (TableConfig.pagination.page ?? 1) + 1
  refreshData(undefined, { append: true })
}
onMounted(() => {
  refreshData()
  types.getTypeList()
})
</script>
<style lang="scss" scoped>
.wrapper {
  padding: 20px;
}

.el-tag {
  margin-bottom: 12px;

  & + .el-tag {
    margin-left: 8px;
  }
}
</style>
