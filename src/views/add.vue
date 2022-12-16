<template>
  <el-form ref="refForm" :model="form" label-width="120px">
    <el-form-item label="标题">
      <el-input v-model="form.title" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="分类">
      <el-radio-group v-model="form.type">
        <el-radio label="movie">视频</el-radio>
        <el-radio label="image">图片</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="路径">
      <el-input v-model="form.url" :rows="2" type="textarea" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="封面图片">
      <el-input v-model="form.img" :rows="2" type="textarea" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="简介">
      <el-input v-model="form.remark" :rows="6" type="textarea" placeholder="请输入" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">确定</el-button>
      <el-button @click="resetForm">重置</el-button>
      <el-button @click="back">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script lang="ts" setup>
import { ElForm, ElMessage } from "element-plus"
import { reactive, ref } from "vue"
import { postMovie } from "../api"
import router from "../router"
const refForm = ref<InstanceType<typeof ElForm>>()
const defaultValue = {
  type: "",
  title: "",
  remark: "",
  url: "",
  img: ""
}
const form = ref({
  ...defaultValue
})

const onSubmit = async () => {
  try {
    const res = await refForm.value?.validate()
    if (res) {
      const submitForm = {
        ...form.value
      }
      const res = await postMovie(submitForm)
      if (res.status === 201) {
        ElMessage.success("保存成功")
      }
    }
  } catch (error) {
    ElMessage.error("保存失败")
  }
}
const resetForm = () => {
  form.value = {
    ...defaultValue
  }
  refForm.value?.resetFields()
}
const back = () => {
  router.back()
}
</script>
<style lang="scss" scoped></style>
