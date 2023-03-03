<template>
  <el-form ref="refForm" :model="form" label-width="120px">
    <el-form-item label="标题">
      <el-input v-model="form.title" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="路径">
      <el-input v-model="form.path" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="替换路径">
      <el-input v-model="form.replacePath" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="封面">
      <el-input v-model="form.img" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="标签">
      <el-input
        v-model="form.tags"
        :rows="2"
        type="textarea"
        placeholder="请输入"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">确定</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script lang="ts" setup>
import { ElForm, ElMessage } from "element-plus";
import { ref } from "vue";
import { importMovies } from "@/api";
const emit = defineEmits(["success"]);
const refForm = ref<InstanceType<typeof ElForm>>();
const defaultValue = {
  path: "",
  replacePath: "",
  tags: "",
  title: "",
  img: "",
};
const importedFiles = ref<any[]>([]);
const form = ref({
  ...defaultValue,
});

const onSubmit = async () => {
  try {
    const res = await refForm.value?.validate();
    if (res) {
      const submitForm = {
        ...form.value,
      };
      const res = await importMovies(submitForm);
      ElMessage.success("保存成功");
      importedFiles.value = res.data.data;
      emit("success");
    }
  } catch (error) {
    ElMessage.error("保存失败");
  }
};
const resetForm = () => {
  form.value = {
    ...defaultValue,
  };
};
</script>
<style lang="scss" scoped></style>
