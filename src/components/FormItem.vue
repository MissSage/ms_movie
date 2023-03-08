<template>
  <el-input v-if="config.type === 'input'" v-model="value"></el-input>
  <el-date-picker v-if="config.type === 'dates'" v-model="value" type="dates" />
  <el-date-picker
    v-if="
      [
        'date',
        'year',
        'month',
        'dates',
        'week',
        'datetime',
        'datetimerange',
        'daterange',
        'monthrange',
      ].indexOf(config.type) !== -1
    "
    v-model="value"
    :type="(config.type as any)"
    unlink-panels
    range-separator="~"
    start-placeholder="开始时间"
    end-placeholder="结束时间"
    :shortcuts="(config as IDateRange).shortcuts"
  />
</template>
<script lang="ts" setup>
const emit = defineEmits(['change', 'update:modelValue'])
const props = defineProps<{
  config: IFormItem
  modelValue: any
}>()
const value = ref<string>(props.modelValue)
watch(
  () => props.modelValue,
  () => {
    if (props.modelValue === value.value) return
    value.value = props.modelValue
  },
)
watch(
  () => value.value,
  () => {
    emit('update:modelValue', value.value)
  },
)
</script>
