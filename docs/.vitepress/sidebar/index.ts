import guide from './guide'
import arcgis from './arcgis'
import { DefaultTheme } from 'vitepress'
const sidebar:DefaultTheme.Sidebar = {
  ...guide,
  ...arcgis
}
export default sidebar