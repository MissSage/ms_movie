<template>
  <div class="wrapper">
    <SearchMovie
      ref="refSearch"
      @search="refreshData"
      @remove="refList?.remove"
      @edit="toggleEdit"
    ></SearchMovie>
    <el-row>
      <el-col :xs="24" :lg="6">
        <List
          ref="refList"
          :params="params"
          :img-width="100"
          :show-type="'table'"
        ></List>
      </el-col>
      <el-col :xs="24" :lg="12">
        <Banner
          :title="refList?.TableConfig.currentRow?.title"
          :directs="refList?.TableConfig.currentRow?.directs"
          @click="handleDirectClick"
        ></Banner>
        <Add
          v-if="aouFlag === 'upload'"
          :movie="refList?.TableConfig.currentRow"
          @success="refreshData"
          @cancel="aouFlag = ''"
        ></Add>
        <Edit
          v-if="aouFlag === 'edit'"
          ref="refEdit"
          :row="refList?.TableConfig.currentRow"
          @success="refreshData"
          @cancel="aouFlag = ''"
        ></Edit>
        <Detail
          v-show="aouFlag === ''"
          ref="refDetail"
          class="mocie-detail"
          :pagination="refList?.TableConfig.pagination"
          :movie="refList?.TableConfig.currentRow"
          :next="refList?.TableConfig.nextRow"
          :prev="refList?.TableConfig.previewRow"
          @next="handleNext"
          @prev="handlePrev"
          @add-view-times="handleAddViewTimes"
        ></Detail>
      </el-col>
      <el-col :xs="24" :lg="6">
        <MovieTags ref="refTags" @check="refreshData"></MovieTags>
      </el-col>
    </el-row>
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
const aouFlag = ref<'edit' | 'upload' | ''>('')
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
  await refList.value?.togglePrevOrNext(1)
}
const handlePrev = async () => {
  await refList.value?.togglePrevOrNext(-1)
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
const toggleEdit = (flag: 'edit' | 'upload') => {
  if (!aouFlag.value || aouFlag.value !== flag) {
    aouFlag.value = flag
  } else {
    aouFlag.value = ''
  }
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
          break
        case 'r':
          refreshData()
          break
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
  height: 100%;
}
.el-row {
  height: calc(100% - 50px);
  .el-col {
    height: 100%;
    &.el-col {
      height: 100%;
    }
  }
}
.mocie-detail{
  height: calc(100% - 40px);
}
@media only screen and (max-width: 768px) {
  .el-row {
    height: calc(100% - 50px);
    .el-col {
      &.el-col-xs-24 {
        height: unset;
      }
    }
  }
}

.el-tag {
  margin-bottom: 12px;

  & + .el-tag {
    margin-left: 8px;
  }
}
</style>
