<template>
  <el-form v-if="music.music.value" ref="refForm" :model="music.music.value" label-width="120px">
    <el-form-item label="标题">
      <el-input v-model="music.music.value.title" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="路径">
      <el-input v-model="music.music.value.url" :readonly="true" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="封面">
      <el-input v-model="music.music.value.img" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="主演">
      <el-input v-model="music.music.value.starring" placeholder="请输入" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">确定</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { useMusic } from '../hooks/useMusic'
const refForm = ref<any>()
const music = useMusic()
const props = defineProps<{
  row: any
}>()
watch(
  () => props.row,
  () => {
    music.music.value = { ...(props.row || {}) }
  },
)

const onSubmit = async () => {
  try {
    const res = await refForm.value?.validate()
    if (res) {
      const submitForm = {
        ...music.music.value,
        tags: music.music.value?.tags,
        types: music.music.value?.types,
        platform: music.music.value?.platforms,
      }
      await music.putMusic(music.music.value?._id, submitForm)
    }
  } catch (error) {
    ElMessage.error('保存失败')
  }
}
const resetForm = () => {
  music.music.value = props.row
  refForm.value?.resetFields()
}
</script>
<style lang="scss" scoped></style>
