import router from '@/router'; import router from '@/router';

<template>
  <div class="detail">
    <el-row :gutter="0">
      <el-col :lg="18">
        <div class="video">
          <video
            style="max-width: 100%; height: 600px"
            autoplay
            controls
            :src="movie?.url"
            @onendedNew="addViewTime"
          ></video>
        </div>
      </el-col>
      <el-col :lg="12">
        <div class="tags">
          <div class="tag-item">
            <el-tag v-for="tag in tags" :key="tag">{{ tag }}</el-tag>
          </div>
          <div class="tag-add">
            <el-input v-model="newTag" autocomplete="true"></el-input>
            <el-button @click="addTag()"> 添加 </el-button>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="comment">这里是评论区</div>
    <div class="footer">
      <span class="footer-item">{{
        DateFormtter(props.movie?.createTime)
      }}</span>
      <span class="footer-item">观看{{ props.movie?.viewTimes || 0 }}次</span>
      <span class="footer-item">上一部:</span>
      <span class="footer-item prev" v-if="props.prev" @click="emit('prev')">{{
        prev?.title
      }}</span>
      <span class="footer-item" v-else>没有了</span>
      <span class="footer-item">下一部:</span>
      <span class="footer-item next" v-if="props.next" @click="emit('next')">{{
        next?.title
      }}</span>
      <span v-else class="footer-item">没有了</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { editMovie } from "@/api";
import { ElMessage } from "element-plus";
import { computed, ref } from "vue";
import { DateFormtter } from "@/utils/Formatter";
const props = defineProps<{
  movie?: Record<string, any>;
  prev?: Record<string, any>;
  next?: Record<string, any>;
}>();
const emit = defineEmits(["next", "prev"]);
const newTag = ref<string>("");
const tags = computed<string[]>(() => {
  return props.movie?.tags?.split(",") || [];
});
const addTag = async () => {
  if (!props.movie) return;
  const newTags =
    newTag.value
      ?.split(",")
      .filter((item) => !!item && tags.value.indexOf(item) === -1) || [];
  if (newTags.length) {
    try {
      const res = await editMovie(props.movie._id, {
        tags: [...tags.value, ...newTags].join(","),
      });
      ElMessage.success("添加成功");
    } catch (error) {
      ElMessage.error("添加失败");
      console.log(error);
    }
  }
};
const addViewTime = async () => {
  if (!props.movie?._id) return;
  let times = props.movie?.viewTimes || 0;
  await editMovie(props.movie._id, { viewTimes: ++times });
  ElMessage.success("观看次数 +1 !");
};
</script>
<style lang="scss" scoped>
.detail {
  padding: 20px;
  .video {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .tags {
      width: 50%;
    }
    .right {
      width: 50%;
    }
  }
  .comment {
    max-height: 560px;
    display: grid;
    place-items: center;
  }
  .footer {
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    .footer-item {
      margin-left: 15px;
      &.prev,
      &.next {
        color: aqua;
        cursor: pointer;
        &:hover{
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
