import DefaultTheme from 'vitepress/theme' //引入默认主题

import {
  AntDesignContainer
} from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'

export default {
  ...DefaultTheme,
  enhanceApp: async ({ app }) => {
    app.component('demo-preview', AntDesignContainer)
  }
}
