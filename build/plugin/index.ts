import type { Plugin } from 'vite'
export function createVitePlugins(viteEnv: any, isBuild: boolean) {
  const { VITE_USE_IMAGEMIN, VITE_USE_MOCK, VITE_LEGACY, VITE_BUILD_COMPRESS } = viteEnv

  const vitePlugins: (Plugin | Plugin[])[] = []
  return vitePlugins
}
