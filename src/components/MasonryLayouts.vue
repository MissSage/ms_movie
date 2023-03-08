<template>
  <div id="v-waterfall" ref="refContainer" class="v-waterfall-content">
    <div
      v-for="(img, i) in state.waterfallList"
      :key="i"
      class="v-waterfall-item"
      :style="{
        top: img.top + 'px',
        left: img.left + 'px',
        width: state.waterfallImgWidth + 'px',
        height: img.height,
      }"
    >
      <img fit="contain" :src="img.img" alt="" style="width: 100%" />
    </div>
  </div>
  <Pagination :config="pagination"></Pagination>
</template>

<script setup lang="ts">
const props = defineProps<{
  data: any[]
  pagination: IPagination
}>()
const state = reactive<{
  waterfallList: any[] //存放计算好的数据
  waterfallImgWidth: number //每一列的宽度
  waterfallImgCol: number //多少列
  waterfallImgRight: number //右边距
  waterfallImgBottom: number //下边距
  waterfallDeviationHeight: number[] //存放瀑布流各个列的高度
}>({
  waterfallList: [], //存放计算好的数据
  waterfallImgWidth: 200, //每一列的宽度
  waterfallImgCol: 1, //多少列
  waterfallImgRight: 10, //右边距
  waterfallImgBottom: 10, //下边距
  waterfallDeviationHeight: [], //存放瀑布流各个列的高度
})
const refContainer = ref<HTMLDialogElement>()
//计算每个图片的宽度或者是列数
const calculationWidth = () => {
  const domWidth = refContainer.value?.clientWidth
  if (domWidth && domWidth > 400) {
    state.waterfallImgCol = Math.floor(
      domWidth / (state.waterfallImgWidth + state.waterfallImgRight),
    )
  }

  //初始化偏移高度数组
  state.waterfallDeviationHeight = new Array(state.waterfallImgCol)
  state.waterfallDeviationHeight = Array.from({
    length: state.waterfallImgCol,
  }).map(() => 0)
  imgPreloading()
}
const imgPreloading = () => {
  if (!props.data?.length) return
  props.data.map((item) => {
    let aImg = new Image()
    aImg.src = item.img
    aImg.onload = aImg.onerror = () => {
      let imgData: any = {
        ...item,
        //根据设定的列宽度求出图片的高度
        height:
          aImg.width === 0
            ? 0
            : (state.waterfallImgWidth / aImg.width) * aImg.height,
      }
      state.waterfallList.push(imgData)

      //调用图片位置计算方法
      rankImg(imgData)
    }
  })
}
const rankImg = (imgData: any) => {
  let {
    waterfallImgWidth,
    waterfallImgRight,
    waterfallImgBottom,
    waterfallDeviationHeight,
  } = state
  //找出当前最短列的索引
  const minIndex = state.waterfallDeviationHeight.indexOf(
    Math.min(...state.waterfallDeviationHeight),
  )
  //获取最短列底部高度，既下一张图片的顶部高度
  imgData.top = waterfallDeviationHeight[minIndex]
  //计算左侧偏移，最短列索引*（右边距+列宽度）
  imgData.left = minIndex * (waterfallImgRight + waterfallImgWidth)
  //改变当前列高度
  waterfallDeviationHeight[minIndex] += imgData.height + waterfallImgBottom
}
onMounted(() => {
  calculationWidth()
})
</script>
<style lang="scss" scoped>
.v-waterfall-content {
  position: relative;
  width: 100%;
  max-width: 100%;
  height: 100%;
}

.v-waterfall-item {
  position: absolute;
  float: left;
}

.v-waterfall-item img {
  width: auto;
  height: auto;
}
</style>
