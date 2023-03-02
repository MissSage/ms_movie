import FormItem from './FormItem.vue';

<template>
  <div class="search">
    <el-form
      ref="refForm"
      :model="state.formData"
      label-width="120"
      :inline="true"
    >
      <el-form-item
        v-for="item in config.filters"
        :key="item.field"
        :label="item.label"
        :prop="item.field"
      >
        <FormItem
          :config="item"
          v-model="state.formData[item.field]"
        ></FormItem>
      </el-form-item>
      <el-form-item>
        <el-button
          v-for="(btn, i) in config.operations"
          :key="i"
          @click="() => btn.click?.(state.formData)"
          >{{ btn.text }}</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { ElForm } from "element-plus";
import { reactive, ref, toRefs } from "vue";
import FormItem from "./FormItem.vue";
const props = defineProps<{
  config: ISearch;
}>();
const refForm = ref<InstanceType<typeof ElForm>>();
const state = reactive<{
  formData: Record<string, any>;
}>({
  formData: { ...(props.config.defaultQuery || {}) },
});
const submit = async () => {
  try {
    const flag = await refForm.value?.validate();
    if (flag) {
      props.config.submit?.(state.formData);
    }
  } catch (error) {}
};
defineExpose({
  submit,
  ...toRefs(state),
});
</script>
