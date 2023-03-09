<template>
  <el-form v-if="movie.movie.value" ref="refForm" :model="movie.movie.value" label-width="120px">
    <el-form-item label="标题">
      <el-input v-model="movie.movie.value.title" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="路径">
      <el-input v-model="movie.movie.value.url" :readonly="true" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="封面">
      <el-input v-model="movie.movie.value.img" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="主演">
      <el-input v-model="movie.movie.value.starring" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="平台">
      <el-input v-model="movie.platforms.newPlatForm.value" placeholder="请输入">
        <template #append>
          <el-button @click="movie.addPlatForm">添加</el-button>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item label="">
      <el-checkbox-group
        v-model="movie.platforms.curPlatForms.value"
        @change="movie.setMoviePlatForms"
      >
        <el-checkbox
          v-for="tag in movie.platforms.platFormList.value"
          :key="tag._id"
          :label="tag.name"
        />
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="分类">
      <el-input v-model="movie.types.newType.value" placeholder="请输入">
        <template #append>
          <el-button @click="movie.addType">添加</el-button>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item label="">
      <el-checkbox-group v-model="movie.types.curTypes.value" @change="movie.setMovieTypes">
        <el-checkbox v-for="tag in movie.types.typeList.value" :key="tag._id" :label="tag.name" />
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="标签">
      <el-input v-model="movie.tags.newTag.value" placeholder="请输入">
        <template #append>
          <el-button @click="movie.addTag">添加</el-button>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item label="">
      <el-checkbox-group v-model="movie.tags.curTags.value" @change="movie.setMovieTags">
        <el-checkbox v-for="tag in movie.tags.tagList.value" :key="tag._id" :label="tag.name" />
      </el-checkbox-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">确定</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { useMovie } from '../hooks/useMovie'
const refForm = ref<any>()
const movie = useMovie()
const props = defineProps<{
  row: any
}>()
watch(
  () => props.row,
  () => {
    movie.movie.value = { ...(props.row || {}) }
  },
)

const onSubmit = async () => {
  try {
    const res = await refForm.value?.validate()
    if (res) {
      const submitForm = {
        ...movie.movie.value,
        tags: movie.movie.value?.tags,
        types: movie.movie.value?.types,
        platform: movie.movie.value?.platforms,
      }
      await movie.putMovie(movie.movie.value?._id, submitForm)
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
