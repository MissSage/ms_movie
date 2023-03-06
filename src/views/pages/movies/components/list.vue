<template>
  <div class="waterfall">
    <div class="waterfall-box">
      <div ref="refContainer" class="waterfall-wrapper">
        <div
          v-for="(img, i) in state.data"
          :key="img.img"
          class="waterfall-item"
          :style="{
            top: img.top + 'px',
            left: img.left + 'px',
            width: state.imgWidth + 'px',
            height: img.height,
          }"
          @click="config.rowClick?.(img)"
        >
          <img
            fit="contain"
            :src="img.img"
            :alt="img.title"
            style="width: 100%"
          />
          <div :title="img.title" class="footer">
            <span class="title">{{ img.title }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="more">
      <el-button style="width: 100%;" @click="emit('append')">加载更多...</el-button>
    </div>
    <Pagination :config="config.pagination"></Pagination>
  </div>
</template>

<script setup lang="ts">
import Pagination from "@/components/Pagination.vue";
import { getImageUrl } from "@/utils/UrlHelper";
import { onMounted, reactive, ref, watch } from "vue";
const emit = defineEmits(["img-click", "append"]);
const props = defineProps<{
  config: ITable;
}>();
const state = reactive<{
  data: any[]; //存放计算好的数据
  imgWidth: number; //每一列的宽度
  waterfallImgCol: number; //多少列
  imgRightGap: number; //右边距
  imgBottomGap: number; //下边距
  colHeights: number[]; //存放瀑布流各个列的高度
}>({
  data: [], //存放计算好的数据
  imgWidth: 150, //每一列的宽度
  waterfallImgCol: 1, //多少列
  imgRightGap: 10, //右边距
  imgBottomGap: 10, //下边距
  colHeights: [], //存放瀑布流各个列的高度
});
const refContainer = ref<HTMLDivElement>();
//计算每个图片的宽度或者是列数
const calculationWidth = () => {
  const domWidth = refContainer.value?.clientWidth;
  if (!domWidth) return;
  if (domWidth > 400) {
    state.waterfallImgCol = Math.floor(
      domWidth / (state.imgWidth + state.imgRightGap)
    );
  } else {
    state.imgWidth = domWidth || 400;
  }

  //初始化偏移高度数组
  state.colHeights = new Array(state.waterfallImgCol);
  state.colHeights = Array.from({
    length: state.waterfallImgCol,
  }).map(() => 0);
  imgPreloading();
};
const imgPreloading = () => {
  const data = props.config.data || [];
  state.data = [];
  data.map((item) => {
    let aImg = new Image();
    aImg.src = item.img || getImageUrl("404.png");
    aImg.onload = aImg.onerror = (e) => {
      let imgData: any = {
        ...item,
        img: item.img || getImageUrl("404.png"),
        //根据设定的列宽度求出图片的高度
        height:
          aImg.width === 0 ? 0 : (state.imgWidth / aImg.width) * aImg.height,
      };
      state.data.push(imgData);

      //调用图片位置计算方法
      rankImg(imgData);
    };
  });
};
const rankImg = (imgData: any) => {
  let { imgWidth, imgRightGap, imgBottomGap, colHeights, waterfallImgCol } =
    state;
  //找出当前最短列的索引
  const minIndex = state.colHeights.indexOf(Math.min(...state.colHeights));
  //获取最短列底部高度，既下一张图片的顶部高度
  imgData.top = colHeights[minIndex];
  //计算左侧偏移，最短列索引*（右边距+列宽度）
  imgData.left = minIndex * (imgRightGap + imgWidth);
  //改变当前列高度
  colHeights[minIndex] += imgData.height + imgBottomGap;
  // 处理容器高度
  const maxHeight = Math.max(...colHeights);
  refContainer.value && (refContainer.value.style.height = maxHeight + "px");
};
watch(
  () => props.config.data,
  () => {
    calculationWidth();
  }
);

onMounted(() => {
  calculationWidth();
  window.onresize = calculationWidth;
});
</script>
<style lang="scss" scoped>
.waterfall {
  display: flex;
  flex-direction: column;
  .more{
    padding: 20px;
  }
}
.waterfall-wrapper {
  position: relative;
  height: 100%;
  width: 100%;

  &::after {
    content: "";
    display: block;
    clear: both;
    height: 0;
  }
}
.waterfall-item {
  overflow: hidden;
  float: left;
  position: absolute;
  cursor: pointer;
  &:hover {
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.25);
  }
  &::after {
    content: "";
    display: block;
    clear: both;
    height: 0;
  }
  .img {
    width: auto;
    height: auto;
    position: absolute;
    top: 0;
    left: 0;
    &::after {
      content: "";
      display: block;
      clear: both;
    }
  }
  .footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    .title {
      padding: 4px 12px;
      background-color: antiquewhite;
      text-overflow: ellipsis;
      // white-space: nowrap;
      overflow: hidden;
      color: aqua;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      word-break: break-all;
    }
  }
}
</style>
