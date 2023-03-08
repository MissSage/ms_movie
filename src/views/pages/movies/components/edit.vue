<template>
  <el-form
    v-if="movie.movie.value"
    ref="refForm"
    :model="movie.movie.value"
    label-width="120px"
  >
    <el-form-item label="标题">
      <el-input v-model="movie.movie.value.title" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="路径">
      <el-input
        v-model="movie.movie.value.url"
        :readonly="true"
        placeholder="请输入"
      />
    </el-form-item>
    <el-form-item label="封面">
      <el-input v-model="movie.movie.value.img" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="标签">
      <el-input v-model="movie.newTag.value" placeholder="请输入">
        <template #append>
          <el-button @click="movie.addTag">添加</el-button>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item label="">
      <el-checkbox-group v-model="movie.curTags.value" @change="setMovieTags">
        <el-checkbox
          v-for="tag in movie.tags.tagList.value"
          :key="tag._id"
          :label="tag.name"
        />
      </el-checkbox-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">确定</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script lang="ts" setup>
import { ElForm, ElMessage } from 'element-plus'
import { ref, watch } from 'vue'
import { useMovie } from '../hooks/useMovie'
const refForm = ref<InstanceType<typeof ElForm>>()
const movie = useMovie()
const props = defineProps<{
  row: any
}>()
const checkedTags = ref<string[]>([])
watch(
  () => props.row,
  () => {
    checkedTags.value = props.row?.tags?.split(',')
    movie.movie.value = { ...(props.row || {}) }
  },
)
const setMovieTags = (value: any[]) => {
  if (!movie.movie.value) return
  movie.movie.value.tags = value.join(',')
}
const onSubmit = async () => {
  try {
    const res = await refForm.value?.validate()
    if (res) {
      const submitForm = {
        ...movie.movie.value,
        tags: movie.movie.value?.tags,
      }
      await movie.putMovie(movie.movie.value?._id, submitForm)
      ElMessage.success('保存成功')
    }
  } catch (error) {
    ElMessage.error('保存失败')
  }
}
const resetForm = () => {
  movie.movie.value = props.row
  refForm.value?.resetFields()
}
</script>
<style lang="scss" scoped></style>
