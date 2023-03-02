<template>
  <el-input v-if="config.type === 'input'" v-model="value"></el-input>
</template>
<script lang="ts" setup>
import { ref, watch } from "vue";
const emit = defineEmits(["change", "update:modelValue"]);
const props = defineProps<{
  config: IFormItem;
  modelValue: any;
}>();
const value = ref<string>(props.modelValue);
watch(
  () => props.modelValue,
  () => {
    if (props.modelValue === value.value) return;
    value.value = props.modelValue;
  }
);
watch(
  () => value.value,
  () => {
    emit("update:modelValue", value.value);
  }
);
</script>
