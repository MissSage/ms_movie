import { defineConfig } from 'vitepress'
export default defineConfig({
  themeConfig: {
    docFooter: {prev: '上一篇',next: '下一篇'},
    editLink: {
      pattern: 'https://github.com/MissSage/ms_movie/edit/master/docs/:path',
      text: '在Github上编辑此页'
    },
    nav: [
      { text: 'Guide', link: '/guide/', activeMatch: '/guide/' },
      {
        text: '下拉选择框',
        items: [
          { text: 'options-1', link: '/' },
          { text: 'options-2', link: 'http://www.baidu.com' }
        ]
      }
    ],
    socialLinks: [
      {icon: 'github',link: 'https://github.com'}
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '快速开始', link: '/guide/getting-started' },
          ]
        }
      ],
      '/arcgis/': [
        {
          text: 'arcgis',
          items: [
            {text: '高斯-克吕格投影',link: '/arcgis/高斯-克吕格投影'}
          ]
        }
      ]
    }
  }
})