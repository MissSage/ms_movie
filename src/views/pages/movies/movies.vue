<template>
  <div class="wrapper">
    <SearchMovie ref="refSearch" @search="refreshData" @remove="refList?.remove"></SearchMovie>
    <div class="type-search">
      <el-check-tag
        v-for="(item, i) in refEdit?.movie?.types.typeList.value"
        :key="i"
        :checked="refEdit?.movie?.types.newType.value === item.name"
        @change="(flag:boolean) =>handleTypeChange(item.name,flag)"
      >
        {{ item.name }}
      </el-check-tag>
    </div>
    <List ref="refList" :params="params" @append="handleAppend" @refresh-data="refreshData"></List>
    <Banner
      :title="refList?.TableConfig.currentRow?.title"
      :directs="refList?.TableConfig.currentRow?.directs"
      @upload="aouFlag = 'upload'"
      @direct-click="handleDirectClick"
    ></Banner>
    <Add
      v-if="aouFlag === 'upload'"
      :movie="refList?.TableConfig.currentRow"
      @success="refreshData"
    ></Add>
    <Detail
      v-if="refList"
      :pagination="refList?.TableConfig.pagination"
      :movie="refList?.TableConfig.currentRow"
      :next="refList?.TableConfig.nextRow"
      :prev="refList?.TableConfig.previewRow"
      @next="handleNext"
      @prev="handlePrev"
      @add-view-times="handleAddViewTimes"
    ></Detail>
    <Edit
      v-if="aouFlag === 'edit'"
      ref="refEdit"
      :row="refList?.TableConfig.currentRow"
      @success="refreshData"
    ></Edit>
  </div>
</template>
<script lang="ts" setup>
import Banner from './components/MovieBanner.vue'
import Detail from './components/MovieDetail.vue'
import Add from './components/AddMovie.vue'
import Edit from './components/EditMovie.vue'
import List from './components/MovieList.vue'
import SearchMovie from './components/SearchMovie.vue'
const refSearch = ref<InstanceType<typeof SearchMovie>>()
const aouFlag = ref<'edit' | 'upload'>('edit')
const refEdit = ref<InstanceType<typeof Edit>>()
const refList = ref<InstanceType<typeof List>>()
const handleAddViewTimes = () => {
  if (!refList.value?.TableConfig.currentRow) return
  refList.value.TableConfig.currentRow.viewTimes =
    (refList.value.TableConfig.currentRow.viewTimes ?? 0) + 1
}
const handleDirectClick = (direct: string) => {
  if (!refSearch.value?.refSearch) return
  refSearch.value.refSearch.formData.direct = direct
  refreshData()
}
const handleTypeChange = (type: string, flag: boolean) => {
  if (refEdit.value?.movie) {
    if (!flag) {
      refEdit.value.movie.types.newType.value = ''
    } else {
      refEdit.value.movie.types.newType.value = type
    }
    refreshData()
  }
}

const handleNext = async () => {
  aouFlag.value = 'edit'
  await refList.value?.togglePrevOrNext(1)
}
const handlePrev = async () => {
  aouFlag.value = 'edit'
  await refList.value?.togglePrevOrNext(-1)
}
const handleAppend = () => {
  if (!refList.value) return
  refList.value.TableConfig.pagination.page = (refList.value.TableConfig.pagination.page ?? 1) + 1
  refreshData(true)
}
const handleNextPage = () => {
  if (!refList.value) return
  refList.value.TableConfig.pagination.page = (refList.value.TableConfig.pagination.page ?? 1) + 1
  refreshData()
}
const handlePrevPage = () => {
  if (!refList.value) return
  const oldPage = refList.value.TableConfig.pagination.page ?? 1
  if (oldPage <= 1) return
  refList.value.TableConfig.pagination.page = oldPage - 1
  refreshData()
}
const params = computed<any>(() => ({
  sortField: '_id',
  sortType: 'asc',
  page: refList.value?.TableConfig.pagination.page || 1,
  size: refList.value?.TableConfig.pagination.limit || 20,
  ...(refSearch.value?.refSearch?.formData || {}),
  startTime: refSearch.value?.refSearch?.formData?.daterange?.[0]
    ? new Date(refSearch.value?.refSearch?.formData?.daterange?.[0]).valueOf()
    : undefined,
  endTime: refSearch.value?.refSearch?.formData?.daterange?.[1]
    ? new Date(refSearch.value?.refSearch?.formData?.daterange?.[1]).valueOf()
    : undefined,
  type: refEdit.value?.movie?.types.newType.value,
}))
const refreshData = (append?: boolean) => {
  refList.value?.refresh(append)
}
onMounted(() => {
  refreshData()
  document.onkeydown = (e) => {
    console.log(e.key)
    if (e.altKey === true) {
      switch (e.key) {
        case 'ArrowLeft':
          handlePrev()
          break
        case 'ArrowRight':
          handleNext()
          break
        case 'PageDown':
          handleNextPage()
          break
        case 'PageUp':
          handlePrevPage()
          break
        default:
          break
      }
    }
  }
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
