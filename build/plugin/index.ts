import type { Plugin } from 'vite'
import { configImageminPlugin } from './imagemin'
export function createVitePlugins(viteEnv: any, isBuild: boolean) {
  const { VITE_USE_IMAGEMIN, VITE_USE_MOCK, VITE_LEGACY, VITE_BUILD_COMPRESS } = viteEnv
  console.log(viteEnv, VITE_USE_IMAGEMIN, VITE_USE_MOCK, VITE_LEGACY, VITE_BUILD_COMPRESS)
  if (isBuild) {
    console.log(isBuild)
  }
  const vitePlugins: (Plugin | Plugin[])[] = [configImageminPlugin()]
  return vitePlugins
}
