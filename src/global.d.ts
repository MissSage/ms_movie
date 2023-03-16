interface IQueryParams {
  page?: number
  size?: number
  sortType?: string
  sortField?: string
  startTime?: number
  endTime?: number
}

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
  fit?: '' | 'fill' | 'none' | 'contain' | 'cover' | 'scale-down'
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
  height?: number
  operationWidth?: number
  currentRow?: any
  selected?: any[]
  nextRow?: any
  previewRow?: any
  rowClick?: (row: any) => void
  handleSelectChange?: (selected: any) => void
}

interface IFormItem {
  type: string
  label: string
  field: string
  onChange?: (value: any) => any
}
interface IDateRange extends IFormItem {
  type: 'daterange' | 'datetimerange'
  shortcuts: { text: string; value: () => Date[] }[]
}
interface ISearch {
  filters: IFormItem[]
  labelWidth?: number
  operations: IButton[]
  defaultQuery: Record<string, ang>
  submit?: (params: any) => any
}
interface Window {
  SITE_CONFIG: {
    movieConfig: {
      apiBase: string
      audioBase: string
      imgBase: string
      movieBase: string
    }
    gisConfig: {
      tdtToken: string
    }
  }
}
