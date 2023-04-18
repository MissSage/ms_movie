<template>
  <div class="waterfall">
    <Pagination :config="TableConfig.pagination" style="padding: 0 0 20px"></Pagination>
    <div class="waterfall-box">
      <div ref="refContainer" class="waterfall-wrapper">
        <div
          v-for="(img, i) in state.data"
          :key="img.url"
          class="waterfall-item"
          :style="{
            top: img.top + 'px',
            left: img.left + 'px',
            width: imageWidth + 'px',
            height: img.height + 'px',
          }"
          @click="TableConfig.rowClick?.(img)"
        >
          <el-image
            :preview-src-list="previewList"
            :initial-index="i"
            :fit="'contain'"
            :src="img.url"
            :alt="img.title"
            style="width: 100%"
            :hide-on-click-modal="true"
          />
          <div :title="img.title" class="footer">
            <span class="title">{{ img.title }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="more">
      <el-button style="width: 100%" :loading="state.loading" @click="emit('append')"
        >加载更多...</el-button
      >
    </div>
    <Pagination :config="TableConfig.pagination"></Pagination>
  </div>
</template>

<script setup lang="ts">
import { getImages, removeImages } from '@/api'
import Pagination from '@/components/Pagination.vue'
import { DateFormtter } from '@/utils/Formatter'
import { getImageUrl } from '@/utils/UrlHelper'
import { ElMessage, ElMessageBox } from 'element-plus'
import { computed, onMounted, reactive, ref, watch } from 'vue'
const emit = defineEmits(['img-click', 'append'])
const props = defineProps<{ params: Record<string, any> }>()
const state = reactive<{
  data: any[] //存放计算好的数据
  imgWidth: number //每一列的宽度
  waterfallImgCol: number //多少列
  imgRightGap: number //右边距
  imgBottomGap: number //下边距
  colHeights: number[] //存放瀑布流各个列的高度
  isMobile: boolean
  mobileImgWidth: number
  loading: boolean
}>({
  data: [], //存放计算好的数据
  imgWidth: 200, //每一列的宽度

  waterfallImgCol: 1, //多少列
  imgRightGap: 10, //右边距
  imgBottomGap: 10, //下边距
  colHeights: [], //存放瀑布流各个列的高度
  isMobile: false,
  mobileImgWidth: 400,
  loading: false,
})
const previewList = computed(() => {
  return state.data.map((item) => item.url)
})
const imageWidth = computed(() => {
  return state.isMobile ? state.mobileImgWidth : state.imgWidth
})
const refContainer = ref<HTMLDivElement>()
//计算每个图片的宽度或者是列数
const calculationWidth = () => {
  const domWidth = refContainer.value?.clientWidth
  if (!domWidth) return
  if (domWidth > state.imgWidth * 2 - state.imgRightGap * 2) {
    state.isMobile = false
    state.waterfallImgCol = Math.floor(domWidth / (state.imgWidth + state.imgRightGap))
  } else {
    state.isMobile = true
    state.waterfallImgCol = 1
    state.mobileImgWidth = domWidth
  }

  //初始化偏移高度数组
  state.colHeights = new Array(state.waterfallImgCol)
  state.colHeights = Array.from({
    length: state.waterfallImgCol,
  }).map(() => 0)
  imgPreloading()
}
const imgPreloading = () => {
  const data = TableConfig.data || []
  state.data = []
  data.map((item) => {
    let aImg = new Image()
    aImg.src = item.url || getImageUrl('404.png')
    aImg.onload = aImg.onerror = () => {
      let imgData: any = {
        ...item,
        img: item.url || getImageUrl('404.png'),
        //根据设定的列宽度求出图片的高度
        height: aImg.width === 0 ? 0 : (state.imgWidth / aImg.width) * aImg.height + 44,
      }
      state.data.push(imgData)

      //调用图片位置计算方法
      rankImg(imgData)
    }
  })
}
const rankImg = (imgData: any) => {
  let { imgWidth, imgRightGap, imgBottomGap, colHeights } = state
  //找出当前最短列的索引
  const minIndex = state.colHeights.indexOf(Math.min(...state.colHeights))
  //获取最短列底部高度，既下一张图片的顶部高度
  imgData.top = colHeights[minIndex]
  //计算左侧偏移，最短列索引*（右边距+列宽度）
  imgData.left = minIndex * (imgRightGap + imgWidth)
  //改变当前列高度
  colHeights[minIndex] += imgData.height + imgBottomGap
  // 处理容器高度
  const maxHeight = Math.max(...colHeights)
  refContainer.value && (refContainer.value.style.height = maxHeight + 'px')
}

const TableConfig = reactive<ITable>({
  data: [],
  pagination: {
    page: 1,
    limit: 20,
    refreshData: ({ page, size }) => {
      TableConfig.pagination.page = page
      TableConfig.pagination.limit = size
      refresh()
    },
  },
  columns: [
    { label: '标题', prop: 'title' },
    { label: '封面', prop: 'img', image: true, fit: 'contain' },
    { label: '标签', prop: 'tags' },
    { label: '上传时间', prop: 'createTime', formatter: DateFormtter },
  ],
  operations: [
    { text: '观看', click: (row) => detail(row) },
    { text: '删除', click: (row) => remove(row) },
  ],
  handleSelectChange: (rows) => {
    TableConfig.selected = rows || []
  },
  rowClick: (row) => detail(row),
})
const detail = (row: any) => {
  TableConfig.currentRow = row
  togglePrevOrNext()
}
const remove = (row?: any) => {
  const rows = TableConfig.selected || []
  ElMessageBox.confirm('确定删除?', '提示信息')
    .then(async () => {
      try {
        if (row) {
          await removeImages([row._id])
        } else {
          await removeImages(rows.map((item) => item._id))
        }
        ElMessage.success('删除成功')
        refresh()
      } catch (error: any) {
        console.log(error)
      }
    })
    .catch(() => {
      //
    })
}

const refresh = async (append?: boolean) => {
  state.loading = true
  await nextTick()
  const params = {
    ...(props.params || { page: 1, size: 20 }),
  }
  try {
    delete params.daterange
    const res = await getImages(params)
    const data =
      res.data.data?.map((item: any) => {
        item.url = item.url?.replace(/^http:\/\/[^/]+/, window.SITE_CONFIG.imageConfig.imageBase)
        return item
      }) || []
    if (append) {
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
  } catch (error) {
    console.log(error)
  }
  state.loading = false
}
const togglePrevOrNext = async (offset = 0) => {
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
    await refresh(true)
  }
  // 处理前后索引
  const prevIndex = curIndex === 0 ? length - 1 : curIndex - 1
  const nextIndex = curIndex === length - 1 ? 0 : curIndex + 1
  TableConfig.currentRow = TableConfig.data[curIndex]
  TableConfig.previewRow = TableConfig.data[prevIndex]
  TableConfig.nextRow = TableConfig.data[nextIndex]
}
watch(
  () => TableConfig.data,
  () => {
    calculationWidth()
  },
)

onMounted(() => {
  calculationWidth()
  window.onresize = calculationWidth
})
defineExpose({
  TableConfig,
  refresh,
  remove,
  togglePrevOrNext,
})
</script>
<style lang="scss" scoped>
.waterfall {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  .more {
    padding: 20px;
  }
}

.waterfall-wrapper {
  position: relative;
  width: 100%;
  height: 100%;

  &::after {
    content: '';
    display: block;
    clear: both;
    height: 0;
  }
}

.waterfall-item {
  position: absolute;
  float: left;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    box-shadow: 1px 1px 3px rgb(0 0 0 / 25%);
  }

  &::after {
    content: '';
    display: block;
    clear: both;
    height: 0;
  }

  .img {
    position: absolute;
    top: 0;
    left: 0;
    width: auto;
    height: auto;

    &::after {
      content: '';
      display: block;
      clear: both;
    }
  }

  .footer {
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    width: 100%;
    height: 44px;
    background-color: antiquewhite;

    .title {
      display: -webkit-box;
      // white-space: nowrap;
      overflow: hidden;
      padding: 4px 12px;
      font-size: 12px;
      text-overflow: ellipsis;
      color: rgb(98 110 110);
      line-height: 1.5em;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      word-break: break-all;
    }
  }
}
</style>
