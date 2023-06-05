import { defineConfig } from 'vitepress'
import themeConfig from './themeConfig'
import { componentPreview, containerPreview } from '@vitepress-demo-preview/plugin'

export default defineConfig({
  title: 'ms_movie',
  description: '自定义的description',
  base: '/ms_movie/',
  locales: {
    '/': {
      lang: 'zh-CN',
      title: '自定义的title',
      description: '自定义的description',
      label: '',
      link: '',
    },
    '/en/': {
      lang: 'en-US',
      title: 'Custom title',
      description: 'Custom description',
      label: '',
      link: '',
    },
  },
  themeConfig,
  markdown: {
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark'
    },
    lineNumbers: true,
    config: (md) => {
      md.use(containerPreview)
      md.use(componentPreview)
    },
  },
})
