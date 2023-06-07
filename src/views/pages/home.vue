<template>
  <div class="home">
    {{ vitePort }}
    <el-button @click="download">下载</el-button>
  </div>
</template>
<script lang="ts" setup>
import { TrueExcel } from '@/utils/Excel/TrueExcel'
import { getImageUrl } from '@/utils/UrlHelper'

const vitePort = ref(import.meta.env.VITE_PORT)
const download = () => {
  const excel = new TrueExcel()
  excel.addConfigTable(
    [
      { label: '11', prop: '11' },
      {
        label: '12',
        prop: '12',
        subColumns: [
          { label: '121', prop: '121' },
          {
            label: '122',
            prop: '122',
            subColumns: [
              { label: '1221', prop: '1221' },
              {
                label: '1222',
                prop: '1222',
                subColumns: [
                  { label: '12221', prop: '12221' },
                  { label: '12222', prop: '12222' },
                ],
              },
            ],
          },
          { label: '123', prop: '123' },
        ],
      },
      { label: '13', prop: '13' },
      {
        label: '14',
        prop: '14',
        subColumns: [
          {
            label: '141',
            prop: '141',
            subColumns: [
              {
                label: '1411',
                prop: '1411',
                subColumns: [
                  {
                    label: '14111',
                    prop: '14111',
                    subColumns: [{ label: '141111', prop: '141111' }],
                  },
                ],
              },
              { label: '1412', prop: '1412' },
            ],
          },
          { label: '142', prop: '142' },
          { label: '143', prop: '143' },
        ],
      },
      { label: '15', prop: '15' },
    ],
    [
      { '11': '测试', '141111': ' 测试', '1412': '1412' },
      { '11': '测试1', '141111': ' 测试1' },
    ],
  )
  excel.addSheet('sheet2')
  excel.addConfigTable(
    [{ label: 'col1', prop: 'col1' }],
    [{ col1: 'col1data' }],
  )
  excel.addImage(getImageUrl('404.png'), {
    tl: {
      col: excel._sheet.columnCount,
      row: 0,
    },
    ext: {
      width: 200,
      height: 100,
    },
  })
  excel.export('测试')
}
</script>
