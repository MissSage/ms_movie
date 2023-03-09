import { defineConfig, loadEnv } from 'vite'
import type { UserConfig, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Imagemin from 'vite-plugin-imagemin'
import { ElementPlusResolver, VueUseComponentsResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'
function pathResolve(dir: string) {
  return path.resolve(__dirname, '.', dir)
}
// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }: ConfigEnv): UserConfig => {
  console.log(command, mode, ssrBuild)
  const root = process.cwd()
  return {
    root,
    mode: 'development',

    resolve: {
      alias: [
        {
          find: /^\@\//,
          replacement: pathResolve('src') + '/',
        },
      ],
    },
    esbuild: {
      drop: ['console', 'debugger'],
    },
    server: {
      hmr: {
        overlay: true,
      },
    },
    plugins: [
      vue({
        template: {
          compilerOptions: {
            isCustomElement: (tag) => tag.startsWith('fc-') || tag.startsWith('css-'),
          },
        },
      }),
      Imagemin({
        gifsicle: {
          optimizationLevel: 7,
          interlaced: false,
        },
        optipng: {
          optimizationLevel: 7,
        },
        mozjpeg: {
          quality: 20,
        },
        pngquant: {
          quality: [0.8, 0.9],
          speed: 4,
        },
        svgo: {
          plugins: [
            {
              name: 'removeViewBox',
            },
            {
              name: 'removeEmptyAttrs',
              active: false,
            },
          ],
        },
      }),
      AutoImport({
        // 这里除了引入 vue 以外还可以引入pinia、vue-router、vueuse等，
        // 甚至你还可以使用自定义的配置规则，见 https://github.com/antfu/unplugin-auto-import#configuration
        imports: ['vue', 'pinia', 'vue-router', '@vueuse/core'],
        // 第三方组件库的解析器
        resolvers: [ElementPlusResolver()],
        dts: './src/auto-imports.d.ts',
        eslintrc: {
          enabled: true,
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true,
        },
      }),
      Components({
        // dirs 指定组件所在位置，默认为 src/components
        // 可以让我们使用自己定义组件的时候免去 import 的麻烦
        dirs: ['src/components/'],
        // 配置需要将哪些后缀类型的文件进行自动按需引入
        extensions: ['vue', 'md'],
        // 解析的 UI 组件库，这里以 Element Plus 和 Ant Design Vue 为例
        resolvers: [ElementPlusResolver(), VueUseComponentsResolver()],
        dts: './src/components.d.ts',
      }),
    ],
    build: {
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: '[ext]/[name]-[hash].[ext]',
          manualChunks(id) {
            if (id.includes('node_modules')) {
              // 超大静态资源拆分
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          },
        },
      },
    },
    define: {
      __VUE_I18N_LEGACY_API__: false,
      __VUE_I18N_FULL_INSTALL__: false,
      __INTLIFY_PROD_DEVTOOLS__: false,
    },
    css: {
      preprocessorOptions: {
        scss: {
          charset: false,
          additionalData: `
          @import "@/assets/styles/globalVariables.scss";
          `,
          javascriptEnabled: true,
        },
      },
    },
    optimizeDeps: {
      include: ['moment/dist/locale/zh-cn', 'moment/dist/locale/eu'],
    },
  }
})
