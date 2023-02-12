<template>
  <div ref="refContainer" class="v-waterfall-content" id="v-waterfall">
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
      <img fit="contain" :src="img.src" alt="" style="width: 100%" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { getImageUrl } from "@/utils/UrlHelper";
import { onBeforeMount, onMounted, reactive, ref } from "vue";
const state = reactive<{
  waterfallList: any[]; //存放计算好的数据
  waterfallImgWidth: number; //每一列的宽度
  waterfallImgCol: number; //多少列
  waterfallImgRight: number; //右边距
  waterfallImgBottom: number; //下边距
  waterfallDeviationHeight: number[]; //存放瀑布流各个列的高度
  imgList: {
    title: string;
    img: string;
  }[];
}>({
  waterfallList: [], //存放计算好的数据
  waterfallImgWidth: 200, //每一列的宽度
  waterfallImgCol: 1, //多少列
  waterfallImgRight: 10, //右边距
  waterfallImgBottom: 10, //下边距
  waterfallDeviationHeight: [], //存放瀑布流各个列的高度
  imgList: [],
});
const pagination = reactive<IPagination>({
  refreshData: ({ page, size }) => {
    pagination.page = page;
    pagination.limit = size;
    initData();
  },
});
const initData = async () => {
  // const res = await getMovies({
  //   page: pagination.page || 1,
  //   size: pagination.limit || 20
  // })
  // state.imgList = res.data.data
  state.imgList = Array.from({ length: pagination.limit || 50 }).map(
    (item, i) => {
      const index = i % 5;
      const imgUrl = getImageUrl(index + ".jpg");
      return {
        title: i.toString(),
        img: imgUrl,
      };
    }
  );
};
const refContainer = ref<HTMLDialogElement>();
//计算每个图片的宽度或者是列数
const calculationWidth = () => {
  const domWidth = refContainer.value?.clientWidth;
  if (domWidth && domWidth > 400) {
    state.waterfallImgCol = Math.floor(
      domWidth / (state.waterfallImgWidth + state.waterfallImgRight)
    );
  }

  //初始化偏移高度数组
  state.waterfallDeviationHeight = new Array(state.waterfallImgCol);
  state.waterfallDeviationHeight = Array.from({
    length: state.waterfallImgCol,
  }).map(() => 0);
  imgPreloading();
};
const imgPreloading = () => {
  debugger;
  for (let i = 0; i < state.imgList.length; i++) {
    let aImg = new Image();
    aImg.src = state.imgList[i]?.img;
    aImg.onload = aImg.onerror = (e) => {
      let imgData: any = {};
      //根据设定的列宽度求出图片的高度
      imgData.height =
        aImg.width === 0
          ? 0
          : (state.waterfallImgWidth / aImg.width) * aImg.height;
      imgData.src = state.imgList[i]?.img;
      state.waterfallList.push(imgData);
      //调用图片位置计算方法
      rankImg(imgData);
    };
  }
};
const rankImg = (imgData: any) => {
  let {
    waterfallImgWidth,
    waterfallImgRight,
    waterfallImgBottom,
    waterfallDeviationHeight,
    waterfallImgCol,
  } = state;
  //找出当前最短列的索引
  const minIndex = state.waterfallDeviationHeight.indexOf(
    Math.min(...state.waterfallDeviationHeight)
  );
  //获取最短列底部高度，既下一张图片的顶部高度
  imgData.top = waterfallDeviationHeight[minIndex];
  //计算左侧偏移，最短列索引*（右边距+列宽度）
  imgData.left = minIndex * (waterfallImgRight + waterfallImgWidth);
  //改变当前列高度
  waterfallDeviationHeight[minIndex] += imgData.height + waterfallImgBottom;
};
onBeforeMount(() => {
  initData();
});
onMounted(() => {
  calculationWidth();
});
</script>
<style lang="scss" scoped>
.v-waterfall-content {
  width: 100%;
  height: 100%;
  max-width: 100%;
  position: relative;
}
.v-waterfall-item {
  float: left;
  position: absolute;
}
.v-waterfall-item img {
  width: auto;
  height: auto;
}
</style>
