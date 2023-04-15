<template>
  <div class="wrapper">
    <SearchImage ref="refSearch" @search="refreshData" @remove="refList?.remove"></SearchImage>
    <ImageList
      ref="refList"
      :params="params"
      @append="handleAppend"
      @refresh-data="refreshData"
    ></ImageList>
    <MusicBanner
      :title="refList?.TableConfig.currentRow?.title"
      :directs="refList?.TableConfig.currentRow?.directs"
      @direct-click="handleDirectClick"
    ></MusicBanner>
    <AddImage :movie="refList?.TableConfig.currentRow" @success="refreshData"></AddImage>
  </div>
</template>
<script lang="ts" setup>
import ImageList from './components/ImageList.vue'
import SearchImage from './components/SearchImage.vue'
import AddImage from './components/AddImage.vue'
import MusicBanner from './components/MusicBanner.vue'
const refSearch = ref<InstanceType<typeof SearchImage>>()

const refList = ref<InstanceType<typeof ImageList>>()

const handleNext = async () => {
  await refList.value?.togglePrevOrNext(1)
}
const handlePrev = async () => {
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

const handleDirectClick = (direct: string) => {
  if (!refSearch.value?.refSearch) return
  refSearch.value.refSearch.formData.direct = direct
  refreshData()
}
const params = computed<any>(() => ({
  sortField: '_id',
  sortType: 'asc',
  page: refList.value?.TableConfig.pagination.page || 1,
  size: refList.value?.TableConfig.pagination.limit || 20,
  ...(refSearch.value?.refSearch?.formData || {}),
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
</style>
