<template>
  <div class="wrapper">
    <SearchMusic ref="refSearch" @search="refreshData" @remove="refMusicList?.remove"></SearchMusic>

    <MusicList
      ref="refMusicList"
      :params="params"
      @append="handleAppend"
      @refresh-data="refreshData"
    ></MusicList>
    <MusicBanner
      :title="refMusicList?.TableConfig.currentRow?.title"
      :directs="refMusicList?.TableConfig.currentRow?.directs"
      @upload="aouFlag = 'upload'"
      @direct-click="handleDirectClick"
    ></MusicBanner>
    <AddMusic
      v-if="aouFlag === 'upload'"
      :movie="refMusicList?.TableConfig.currentRow"
      @success="refreshData"
    ></AddMusic>
    <MusicDetail
      v-if="refMusicList"
      :pagination="refMusicList?.TableConfig.pagination"
      :movie="refMusicList?.TableConfig.currentRow"
      :next="refMusicList?.TableConfig.nextRow"
      :prev="refMusicList?.TableConfig.previewRow"
      @next="handleNext"
      @prev="handlePrev"
      @add-view-times="handleAddViewTimes"
    ></MusicDetail>
    <EditMusic
      v-if="aouFlag === 'edit'"
      :row="refMusicList?.TableConfig.currentRow"
      @success="refreshData"
    ></EditMusic>
  </div>
</template>
<script lang="ts" setup>
import MusicBanner from './components/MusicBanner.vue'
import MusicDetail from './components/MusicDetail.vue'
import AddMusic from './components/AddMusic.vue'
import EditMusic from './components/EditMusic.vue'
import MusicList from './components/MusicList.vue'
import SearchMusic from './components/SearchMusic.vue'
const refSearch = ref<InstanceType<typeof SearchMusic>>()
const aouFlag = ref<'edit' | 'upload'>('edit')
const refMusicList = ref<InstanceType<typeof MusicList>>()
const handleAddViewTimes = () => {
  if (!refMusicList.value?.TableConfig.currentRow) return
  refMusicList.value.TableConfig.currentRow.viewTimes =
    (refMusicList.value.TableConfig.currentRow.viewTimes ?? 0) + 1
}
const handleDirectClick = (direct: string) => {
  if (!refSearch.value?.refSearch) return
  refSearch.value.refSearch.formData.direct = direct
  nextTick().then(() => {
    refreshData()
  })
}
const handleNext = async () => {
  aouFlag.value = 'edit'
  await refMusicList.value?.togglePrevOrNext(1)
}
const handlePrev = async () => {
  aouFlag.value = 'edit'
  await refMusicList.value?.togglePrevOrNext(-1)
}
const handleAppend = () => {
  if (!refMusicList.value) return
  refMusicList.value.TableConfig.pagination.page =
    (refMusicList.value.TableConfig.pagination.page ?? 1) + 1
  refreshData(true)
}
const params = computed<any>(() => ({
  sortField: '_id',
  sortType: 'asc',
  page: refMusicList.value?.TableConfig.pagination.page || 1,
  size: refMusicList.value?.TableConfig.pagination.limit || 20,
  ...(refSearch.value?.refSearch?.formData || {}),
  startTime: refSearch.value?.refSearch?.formData?.daterange?.[0]
    ? new Date(refSearch.value?.refSearch?.formData?.daterange?.[0]).valueOf()
    : undefined,
  endTime: refSearch.value?.refSearch?.formData?.daterange?.[1]
    ? new Date(refSearch.value?.refSearch?.formData?.daterange?.[1]).valueOf()
    : undefined,
}))
const refreshData = (append?: boolean) => {
  refMusicList.value?.refresh(append)
}
onMounted(() => {
  refreshData()
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
