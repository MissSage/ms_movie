
interface IPagination {
  /** 当页码和条数改变时会触发此方法，设置此方法将使handSize和handlePage失效 */
  refreshData?: (pageSize: { page: number; size: number }) => any
  hide?: boolean
  page?: number
  limit?: number
  total?: number
  align?: 'left' | 'right' // 默认在左侧
  /** 操作按钮布局 默认total,sizes, prev, pager, next, jumper */
  layout?: string // 分布布局
  pageSize?: number[]
}
interface ITableColumn {
  label: string
  prop: string
  image?: boolean
  minWidth?: string | number
  formatter?: (row: any, value: any, field: string) => any
}
interface IButton {
  text: string
  click: (row: any, ...args) => any
}
interface ITable {
  data: any[]
  pagination: IPagination
  columns: ITableColumn[]
  operations: IButton[]
  operationWidth?: number
  currentRow?: any
}

interface IFormItem {
  type: string
  label: string
  field: string
}
interface ISearch {
  filters: IFormItem[]
  operations: IButton[]
  defaultQuery: Record<string,ang>
  submit?: (params: any) => any
}