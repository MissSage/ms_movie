<template>
  <div class="table-wrapper">
    <el-table
      class="table"
      :data="config.data"
      style="width: 100%"
      :height="config.height"
      @selection-change="config.handleSelectChange"
      @row-click="config.rowClick"
    >
      <el-table-column type="index" width="50" />
      <el-table-column type="selection" width="55" />
      <el-table-column
        v-for="column in config.columns"
        :key="column.label"
        :prop="column.prop"
        :label="column.label"
        :min-width="column.minWidth"
      >
        <template #default="scope">
          <el-image
            v-if="column.image"
            :fit="column.fit"
            style="margin-top: 5px; width: 50px; height: 50px"
            :src="scope.row[column.prop]"
            :preview-src-list="[scope.row[column.prop]]"
            :preview-teleported="true"
          >
            <template #error>
              <div class="image-slot">
                <Icon icon="ep:picture" style="font-size: 50px"></Icon>
              </div>
            </template>
          </el-image>
          <template v-else>
            {{
              column.formatter
                ? column.formatter(
                    scope.row[column.prop],
                    scope.row,
                    column.prop,
                  )
                : scope.row[column.prop]
            }}
          </template>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        :width="config.operationWidth || 120"
      >
        <template #default="scope">
          <el-button
            v-for="(btn, i) in config.operations"
            :key="i"
            link
            type="primary"
            size="small"
            @click="btn.click(scope.row)"
            >{{ btn.text }}</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <Pagination :config="config.pagination"></Pagination>
  </div>
</template>
<script lang="ts" setup>
import { Icon } from '@iconify/vue'
defineProps<{
  config: ITable
}>()
</script>
<style lang="scss" scoped>
.table-wrapper {
  height: 100%;
}

.table {
  height: calc(100% - 40px);
}
</style>
