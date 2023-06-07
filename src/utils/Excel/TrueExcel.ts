import Excel, { ImagePosition, ImageRange, Workbook, Worksheet } from 'exceljs'
import fileDownload from 'file-saver'
import { ElTable } from 'element-plus'
export class TrueExcel {
  /**
   * excel对象
   */
  private _workbook: Workbook
  /**
   * 当前正在操作的worksheet
   */
  _sheet: Worksheet
  /**
   * 当前worksheet的列数据
   */
  private _sheetColumns: Partial<Excel.Column>[]
  /**
   * 当前workSheet的合并配置
   */
  private _mergeCellConfigs: [number, number, number, number][]

  /**
   * 头部行数
   */
  private _headerRows = 0
  /**
   * 图片开始的行数
   */
  private _imageStartRow = 0

  constructor() {
    this._workbook = new Excel.Workbook()
    this._workbook.created = new Date()
    this._sheet = this._workbook.addWorksheet('My Sheet')
    this._mergeCellConfigs = []
    this._sheetColumns = []
  }
  /**
   * 添加一个worksheet
   * @param name
   */
  addSheet(name: string) {
    this._sheet = this._workbook.addWorksheet(name)
  }
  setSheetName(name: string) {
    if (!name) {
      console.log('请不要将worksheet的名称设置为空白字符')
      return
    }
    this._sheet.name = name
  }
  /**
   * 根据id或name切换当前的worksheet
   * @param indexOrName
   */
  shiftSheet(indexOrName: string | number) {
    this._sheet = this._workbook.getWorksheet(indexOrName)
    this._sheetColumns = this._sheet.columns
  }

  /**
   * 根据elementplus的table实例生成excel sheet
   * @param table elementplus table
   */
  addElTable(table: InstanceType<typeof ElTable>) {
    if (!table) {
      console.log('eltable实例未找到')
      return
    }
    this._mergeCellConfigs = []
    this._headerRows = 0
    this._addElTableHeader(table)
    this._addElTableBody(table)
    this._mergeCells()
  }
  /**
   * 往当前worksheet中添加一个表格
   * @param tableColumns 表头配置
   * @param tableData 表格数据
   * @param _mergeCellConfigs 处定义的数据合并项，格式：[起始行号，起始列号，结尾行号，结尾列号][],值都从1开始
   */
  addConfigTable(
    tableColumns: ITableColumn[],
    tableData: any[],
    _mergeCellConfigs?: [number, number, number, number][],
  ) {
    debugger
    this._mergeCellConfigs = []
    this._sheetColumns = []
    this._addConfigTableHeader(tableColumns)
    this._addConfigTableBody(tableData)
    this._mergeCells(_mergeCellConfigs)
  }
  /**
   * 往workbook添加图片，并将图片插入到当前sheet中
   * @param img Image对象
   * @param range 图片的位置
   * @return 返回图片id
   */
  addImage(img: HTMLImageElement | string, range?: ImagePosition) {
    const lastCol = this._sheet?.columns?.length || 0
    if (typeof img === 'string') {
      const imageNode = document.createElement('img')
      imageNode.setAttribute('src', img)
      img = imageNode
    }
    const imgId = this._workbook.addImage({
      base64: img.src,
      extension: 'png',
    })
    this._sheet.addImage(
      imgId,
      range || {
        tl: {
          col: lastCol,
          row: 0,
        } as any,
        br: {
          col: lastCol + img.width,
          row: img.height,
        } as any,
        editAs: 'oneCell',
      },
    )
    this._imageStartRow += img.height
    return imgId
  }
  /**
   * 导出表格
   * @param name
   */
  export(name?: string) {
    this._workbook.xlsx
      .writeBuffer()
      .then((xls64) => {
        const blob = new Blob([xls64], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
        })
        fileDownload.saveAs(blob, (name || 'export') + '.xlsx')
      })
      .catch((err) => {
        console.log(err)
      })
  }
  /**
   * 添加el-table的表数据
   * @param {*} table el-table实例
   */
  private _addElTableBody(
    table: InstanceType<typeof ElTable>,
    startPosition?: [number, number],
  ) {
    const el: Element = table.$el
    const bodyRows = el.querySelectorAll(
      '.el-table__body-wrapper .el-table__body tr',
    )
    bodyRows.forEach((row, i) => {
      const rowArray: any[] = []
      const rowItems = row.querySelectorAll('td')
      const startRowNumber = this._headerRows + i + (startPosition?.[0] || 0)
      let startColNumber = startPosition?.[1] || 0
      rowItems.forEach((item) => {
        // 处理选择框
        if (item.classList.contains('el-table-column--selection')) {
          return
        }
        while (this._judgeIsMerged(startRowNumber + 1, startColNumber + 1)) {
          startColNumber++
        }
        const colSpan = item.colSpan || 1
        const rowSpan = item.rowSpan || 1
        if (colSpan > 1 || rowSpan > 1) {
          this._mergeCellConfigs.push([
            startRowNumber + 1,
            startColNumber + 1,
            startRowNumber + rowSpan,
            startColNumber + colSpan,
          ])
        }
        rowArray[startColNumber] = item.innerText || ''
        startColNumber += colSpan
      })
      const rowData: any[] = []
      this._sheetColumns.map((item, j) => {
        let cellData = rowArray[j]
        switch (typeof cellData) {
          case 'string':
          case 'number':
          case 'bigint':
            cellData = rowArray[j]
            break
          case 'object':
            cellData = JSON.stringify(rowArray[j])
            break
          default:
            cellData = ''
            break
        }
        rowData[j] = cellData
      })
      // 添加一行并设置行高为20
      const newRow = this._sheet.addRow(rowData)
      newRow.height = 20
      newRow.alignment = {
        vertical: 'middle',
        horizontal: 'left',
      }
      newRow.font = {
        size: 14,
      }
    })
  }
  /**
   * 添加表头
   * @param {*} table
   */
  private _addElTableHeader(table: InstanceType<typeof ElTable>) {
    // const headerArray: any[] = []
    const el: HTMLElement = table.$el
    const _headerRows = el.querySelectorAll(
      '.el-table__header-wrapper .el-table__header tr',
    )

    this._headerRows = _headerRows.length || 0
    _headerRows.forEach((item, i) => {
      this._resolveHeaderRow(i, item)
    })
    this._resolveHeaderCells()
  }

  /**
   * 处理el-table的表头的行
   * @param i 行，从0 开始
   * @param row 当前行对象，el-table的row
   */
  private _resolveHeaderRow(i: number, row: Element) {
    const headerItems = row.querySelectorAll('th')
    let startColNumber = 0
    headerItems.forEach((item) => {
      // 处理选择框
      if (item.classList.contains('el-table-column--selection')) {
        return
      }
      // 处理操作按钮
      if (item.innerText === '操作') {
        return
      }
      while (this._judgeIsMerged(i + 1, startColNumber + 1)) {
        startColNumber++
      }
      const colSpan = item.colSpan || 1
      const rowSpan = item.rowSpan || 1
      if (colSpan > 1 || rowSpan > 1) {
        this._mergeCellConfigs.push([
          i + 1,
          startColNumber + 1,
          i + rowSpan,
          startColNumber + colSpan,
        ])
      }
      const header: string[] =
        (this._sheetColumns[startColNumber]?.header as string[]) || []
      header[i] = item.innerText || ''
      this._sheetColumns[startColNumber] = {
        header,
        key: item.innerText,
        width: 30 * colSpan,
      }
      startColNumber += colSpan
    })
  }
  /**
   * 通过配置数据添加表格
   * @param tableColumns
   */
  private _addConfigTableHeader(tableColumns: ITableColumn[]) {
    this._headerRows = 0
    let startColNumber = 0
    tableColumns.map((item) => {
      // 计算每个单元格的colspan和rowspan
      const colspan = this._resolveTableColumn(item, startColNumber)
      startColNumber += colspan
    })
    // 处理表头各列的行数不统一时的情况，添加合并配置
    this._sheetColumns.map((item, i) => {
      const header = (item.header as string[]) || []
      if (header.length < this._headerRows) {
        this._mergeCellConfigs.push([
          header.length,
          i + 1,
          this._headerRows,
          i + 1,
        ])
      }
    })

    this._resolveHeaderCells()
  }
  /**
   * 处理表头信息
   * @param column
   * @param depth
   * @param startColNumber
   * @returns
   */
  private _resolveTableColumn(
    column: ITableColumn,
    startColNumber = 0,
    depth = 1,
  ) {
    let colspan = 0
    if (column.subColumns?.length) {
      column.subColumns.map((cColumn) => {
        colspan += this._resolveTableColumn(
          cColumn,
          startColNumber + colspan,
          depth + 1,
        )
      })
    }
    const header: string[] =
      (this._sheetColumns[startColNumber]?.header as string[]) || []
    header[depth - 1] = column.label || ''

    if (colspan > 1) {
      this._mergeCellConfigs.push([
        depth,
        startColNumber + 1,
        depth,
        startColNumber + colspan,
      ])
    } else {
      colspan = 1
    }
    this._sheetColumns[startColNumber] = {
      header,
      key: column.prop,
      width: 30,
    }
    if (depth > this._headerRows) this._headerRows = depth
    return colspan
  }
  /**
   * 处理表格数据
   * @param tableData
   */
  private _addConfigTableBody(tableData: any[]) {
    tableData.map((row) => {
      const rowData: any[] = []
      this._sheetColumns.map((item, j) => {
        let cellData = row[item.key ?? ''] ?? ''
        switch (typeof cellData) {
          case 'string':
          case 'number':
          case 'bigint':
            break
          case 'object':
            cellData = JSON.stringify(cellData)
            break
          default:
            cellData = ''
            break
        }
        rowData[j] = cellData
      })
      // 添加一行并设置行高为20
      const newRow = this._sheet.addRow(rowData)
      newRow.height = 20
      newRow.alignment = {
        vertical: 'middle',
        horizontal: 'left',
      }
      newRow.font = {
        size: 14,
      }
    })
  }
  /********************* 公共方法 ******************** */
  /**
   * 处理表头单元格
   */
  private _resolveHeaderCells() {
    this._dealEmptyHeaderCells()
    // 设置当前sheet的表头列
    this._sheet.columns = this._sheetColumns
    this._setHeaderStyle()
  }
  /**
   * 设置当前表头的样式
   */
  private _setHeaderStyle() {
    Array.from({ length: this._headerRows || 0 }).map((item, i) => {
      const row = this._sheet.getRow(i + 1)
      row.height = 20
      row.eachCell((cell) => {
        cell.alignment = {
          vertical: 'middle',
          horizontal: 'center',
        }
        cell.border = {
          top: { style: 'thin', color: { argb: 'b1b3b8' } },
          left: { style: 'thin', color: { argb: 'b1b3b8' } },
          bottom: { style: 'thin', color: { argb: 'b1b3b8' } },
          right: { style: 'thin', color: { argb: 'b1b3b8' } },
        }
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'c8c9cc' },
        }
        cell.font = {
          bold: true,
          size: 14,
        }
      })
    })
  }
  /**
   * 处理表头空值
   */
  private _dealEmptyHeaderCells() {
    this._sheetColumns.map((item) => {
      const header: string[] = item.header as string[]
      item.header = header.map((head) => {
        if (head === null || head === undefined) {
          return ''
        }
        return head
      })
      return item
    })
  }

  /**
   * 根据rowspan和colspan合并单元格
   */
  private _mergeCells(_mergeCellConfigs?: [number, number, number, number][]) {
    this._mergeCellConfigs.map((item) => {
      this._sheet.mergeCells(item)
    })
    if (_mergeCellConfigs) {
      _mergeCellConfigs.map((item) => {
        this._sheet.mergeCells(item)
      })
    }
  }

  /**
   * 判断当前单元格是否已经被合并过,仅对新添加的table有效，切换过worksheet后置空
   * @param row 行号，从1 开始
   * @param col 列号，从1 开始
   */
  private _judgeIsMerged(row: number, col: number) {
    const flag = this._mergeCellConfigs.findIndex(
      (item) =>
        item[0] <= row && item[2] >= row && item[1] <= col && item[3] >= col,
    )
    return flag !== -1
  }
}
