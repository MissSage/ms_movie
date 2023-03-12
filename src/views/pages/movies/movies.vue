<template>
  <div class="wrapper">
    <SearchMovie ref="refSearch" @search="refreshData" @remove="refList?.remove"></SearchMovie>
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
      :row="refList?.TableConfig.currentRow"
      @success="refreshData"
    ></Edit>
  </div>
</template>
<script lang="ts" setup>
import Banner from './components/banner.vue'
import Detail from './components/detail.vue'
import Add from './components/add.vue'
import Edit from './components/edit.vue'
import List from './components/list.vue'
import { useTypes } from './hooks/useType'
import SearchMovie from './components/SearchMovie.vue'
const types = useTypes()
const refSearch = ref<InstanceType<typeof SearchMovie>>()
const aouFlag = ref<'edit' | 'upload'>('edit')
const refList = ref<InstanceType<typeof List>>()
const handleAddViewTimes = () => {
  if (!refList.value?.TableConfig.currentRow) return
  refList.value.TableConfig.currentRow.viewTimes =
    (refList.value.TableConfig.currentRow.viewTimes ?? 0) + 1
}
const handleDirectClick = (direct: string) => {
  if (!refSearch.value?.refSearch) return
  refSearch.value.refSearch.formData.direct = direct
  nextTick().then(() => {
    refreshData()
  })
}
const handleTypeChange = (type: string, flag: boolean) => {
  if (!flag) {
    types.newType.value = ''
  } else {
    types.newType.value = type
  }
  refreshData()
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
  type: types.newType.value,
}))
const refreshData = (append?: boolean) => {
  refList.value?.refresh(append)
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
