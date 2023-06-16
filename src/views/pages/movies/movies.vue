<template>
  <div class="wrapper">
    <SearchMovie
      ref="refSearch"
      @search="refreshData"
      @remove="refList?.remove"
    ></SearchMovie>

    <div class="content">
      <div class="left">
        <List
          ref="refList"
          :params="params"
          :img-width="90"
          :mobile-img-width="400"
          @append="handleAppend"
          @refresh-data="refreshData"
        ></List>
      </div>
      <div class="main">
        <!-- <div class="type-search">
          <el-check-tag
            v-for="(item, i) in refEdit?.movie?.types.typeList.value"
            :key="i"
            :checked="refEdit?.movie?.types.newType.value === item.name"
            @change="(flag:boolean) =>handleTypeChange(item.name,flag)"
          >
            {{ item.name }}
          </el-check-tag>
        </div> -->
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
          ref="refDetail"
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
      <div class="right">
        <MovieTags ref="refTags" @check="refreshData"></MovieTags>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Banner from './components/MovieBanner.vue'
import Detail from './components/MovieDetail.vue'
import Add from './components/AddMovie.vue'
import Edit from './components/EditMovie.vue'
import List from './components/MovieList.vue'
import SearchMovie from './components/SearchMovie.vue'
import MovieTags from './components/MovieTags.vue'
const refSearch = ref<InstanceType<typeof SearchMovie>>()
const aouFlag = ref<'edit' | 'upload'>('edit')
const refEdit = ref<InstanceType<typeof Edit>>()
const refList = ref<InstanceType<typeof List>>()
const refTags = ref<InstanceType<typeof MovieTags>>()
const refDetail = ref<InstanceType<typeof Detail>>()
const handleAddViewTimes = () => {
  if (!refList.value?.TableConfig.currentRow) return
  refList.value.TableConfig.currentRow.viewTimes =
    (refList.value.TableConfig.currentRow.viewTimes ?? 0) + 1
}
const handleDirectClick = (direct: string) => {
  if (!refSearch.value?.refSearch) return
  refTags.value?.handleDirectCheck(direct, true)
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
  refList.value.TableConfig.pagination.page =
    (refList.value.TableConfig.pagination.page ?? 1) + 1
  refreshData(true)
}
const handleNextPage = () => {
  if (!refList.value) return
  refList.value.TableConfig.pagination.page =
    (refList.value.TableConfig.pagination.page ?? 1) + 1
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
  direct: refTags.value?.directs.curDirect.value,
}))
const refreshData = (append?: boolean) => {
  refList.value?.refresh(append)
}
onMounted(() => {
  refreshData()
  document.onkeydown = (e) => {
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
        case 'l':
          refDetail.value?.savePic()
        default:
          break
      }
      return false
    }
  }
})
</script>
<style lang="scss" scoped>
.wrapper {
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
}

.el-tag {
  margin-bottom: 12px;

  & + .el-tag {
    margin-left: 8px;
  }
}
.content {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  .left {
    width: 300px;
  }
  .main {
    max-width: 100%;
    flex: 1;
  }
  .right {
    width: 300px;
    height: 1080px;
    overflow-y: auto;
  }
}
</style>
