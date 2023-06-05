import guide from './guide'
import arcgis from './arcgis'
import components from './components'
import { DefaultTheme } from 'vitepress'

const sidebar: DefaultTheme.Sidebar = {
  ...guide,
  ...arcgis,
  ...components,
}
export default sidebar
