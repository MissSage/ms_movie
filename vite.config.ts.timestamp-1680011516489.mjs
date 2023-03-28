// vite.config.ts
import { defineConfig } from "file:///D:/18407/Documents/MissSage/ms_movie/node_modules/.pnpm/vite@4.1.4_bbhgkqmop4v24vevyan3j2nitq/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/18407/Documents/MissSage/ms_movie/node_modules/.pnpm/@vitejs+plugin-vue@4.0.0_vite@4.1.4+vue@3.2.47/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import AutoImport from "file:///D:/18407/Documents/MissSage/ms_movie/node_modules/.pnpm/unplugin-auto-import@0.15.1_@vueuse+core@9.13.0/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///D:/18407/Documents/MissSage/ms_movie/node_modules/.pnpm/unplugin-vue-components@0.24.1_vue@3.2.47/node_modules/unplugin-vue-components/dist/vite.mjs";
import { ElementPlusResolver, VueUseComponentsResolver } from "file:///D:/18407/Documents/MissSage/ms_movie/node_modules/.pnpm/unplugin-vue-components@0.24.1_vue@3.2.47/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import ImageMin from "file:///D:/18407/Documents/MissSage/ms_movie/node_modules/.pnpm/vite-plugin-imagemin@0.6.1_vite@4.1.4/node_modules/vite-plugin-imagemin/dist/index.mjs";
import Compression from "file:///D:/18407/Documents/MissSage/ms_movie/node_modules/.pnpm/vite-plugin-compression@0.5.1_vite@4.1.4/node_modules/vite-plugin-compression/dist/index.mjs";
import { visualizer } from "file:///D:/18407/Documents/MissSage/ms_movie/node_modules/.pnpm/rollup-plugin-visualizer@5.9.0/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import path from "path";
var __vite_injected_original_dirname = "D:\\18407\\Documents\\MissSage\\ms_movie";
function pathResolve(dir) {
  return path.resolve(__vite_injected_original_dirname, ".", dir);
}
var vite_config_default = defineConfig(() => {
  const root = process.cwd();
  return {
    root,
    mode: "production",
    resolve: {
      alias: [
        {
          find: /^\@\//,
          replacement: pathResolve("src") + "/"
        }
      ]
    },
    esbuild: {
      drop: ["console", "debugger"]
    },
    server: {
      hmr: {
        overlay: true
      },
      host: true
    },
    plugins: [
      vue({
        template: {
          compilerOptions: {
            isCustomElement: (tag) => tag.startsWith("fc-") || tag.startsWith("css-")
          }
        }
      }),
      AutoImport({
        // 这里除了引入 vue 以外还可以引入pinia、vue-router、vueuse等，
        // 甚至你还可以使用自定义的配置规则，见 https://github.com/antfu/unplugin-auto-import#configuration
        imports: ["vue", "pinia", "vue-router", "@vueuse/core"],
        // 第三方组件库的解析器
        resolvers: [ElementPlusResolver()],
        // dts: './src/auto-imports.d.ts',
        eslintrc: {
          enabled: true,
          filepath: "./.eslintrc-auto-import.json",
          globalsPropValue: true
        }
      }),
      Components({
        // dirs 指定组件所在位置，默认为 src/components
        // 可以让我们使用自己定义组件的时候免去 import 的麻烦
        // dirs: ['src/components/'],
        // 配置需要将哪些后缀类型的文件进行自动按需引入
        extensions: ["vue", "md"],
        // 解析的 UI 组件库，这里以 Element Plus 和 Ant Design Vue 为例
        resolvers: [ElementPlusResolver(), VueUseComponentsResolver()],
        dts: "./src/components.d.ts"
      }),
      ImageMin({
        gifsicle: {
          optimizationLevel: 7,
          interlaced: false
        },
        optipng: {
          optimizationLevel: 7
        },
        webp: {
          quality: 75
        },
        mozjpeg: {
          quality: 8
        },
        pngquant: {
          quality: [0.8, 0.9],
          speed: 4
        },
        svgo: {
          plugins: [
            {
              name: "removeViewBox"
            },
            {
              name: "removeEmptyAttrs",
              active: false
            }
          ]
        }
      }),
      Compression(),
      visualizer()
    ],
    build: {
      chunkSizeWarningLimit: 2e3,
      rollupOptions: {
        output: {
          chunkFileNames: "js/[name]-[hash].js",
          entryFileNames: "js/[name]-[hash].js",
          assetFileNames: "[ext]/[name]-[hash].[ext]",
          manualChunks(id) {
            if (id.includes(".pnpm")) {
              return id.toString().split(".pnpm/")[1].split("/")[0].toString();
            }
          }
        }
      }
    },
    define: {
      __VUE_I18N_LEGACY_API__: false,
      __VUE_I18N_FULL_INSTALL__: false,
      __INTLIFY_PROD_DEVTOOLS__: false
    },
    optimizeDeps: {
      include: ["moment/dist/locale/zh-cn", "moment/dist/locale/eu"],
      exclude: ["@arcgis/core"]
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFwxODQwN1xcXFxEb2N1bWVudHNcXFxcTWlzc1NhZ2VcXFxcbXNfbW92aWVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXDE4NDA3XFxcXERvY3VtZW50c1xcXFxNaXNzU2FnZVxcXFxtc19tb3ZpZVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovMTg0MDcvRG9jdW1lbnRzL01pc3NTYWdlL21zX21vdmllL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBVc2VyQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXHJcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXHJcbmltcG9ydCB7IEVsZW1lbnRQbHVzUmVzb2x2ZXIsIFZ1ZVVzZUNvbXBvbmVudHNSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycydcclxuaW1wb3J0IEltYWdlTWluIGZyb20gJ3ZpdGUtcGx1Z2luLWltYWdlbWluJ1xyXG5pbXBvcnQgQ29tcHJlc3Npb24gZnJvbSAndml0ZS1wbHVnaW4tY29tcHJlc3Npb24nXHJcbmltcG9ydCB7IHZpc3VhbGl6ZXIgfSBmcm9tICdyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXInXHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXHJcbmZ1bmN0aW9uIHBhdGhSZXNvbHZlKGRpcjogc3RyaW5nKSB7XHJcbiAgcmV0dXJuIHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuJywgZGlyKVxyXG59XHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoKTogVXNlckNvbmZpZyA9PiB7XHJcbiAgY29uc3Qgcm9vdCA9IHByb2Nlc3MuY3dkKClcclxuICByZXR1cm4ge1xyXG4gICAgcm9vdCxcclxuICAgIG1vZGU6ICdwcm9kdWN0aW9uJyxcclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgYWxpYXM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBmaW5kOiAvXlxcQFxcLy8sXHJcbiAgICAgICAgICByZXBsYWNlbWVudDogcGF0aFJlc29sdmUoJ3NyYycpICsgJy8nLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF0sXHJcbiAgICB9LFxyXG4gICAgZXNidWlsZDoge1xyXG4gICAgICBkcm9wOiBbJ2NvbnNvbGUnLCAnZGVidWdnZXInXSxcclxuICAgIH0sXHJcbiAgICBzZXJ2ZXI6IHtcclxuICAgICAgaG1yOiB7XHJcbiAgICAgICAgb3ZlcmxheTogdHJ1ZSxcclxuICAgICAgfSxcclxuICAgICAgaG9zdDogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgIHZ1ZSh7XHJcbiAgICAgICAgdGVtcGxhdGU6IHtcclxuICAgICAgICAgIGNvbXBpbGVyT3B0aW9uczoge1xyXG4gICAgICAgICAgICBpc0N1c3RvbUVsZW1lbnQ6ICh0YWcpID0+IHRhZy5zdGFydHNXaXRoKCdmYy0nKSB8fCB0YWcuc3RhcnRzV2l0aCgnY3NzLScpLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICB9KSxcclxuICAgICAgQXV0b0ltcG9ydCh7XHJcbiAgICAgICAgLy8gXHU4RkQ5XHU5MUNDXHU5NjY0XHU0RTg2XHU1RjE1XHU1MTY1IHZ1ZSBcdTRFRTVcdTU5MTZcdThGRDhcdTUzRUZcdTRFRTVcdTVGMTVcdTUxNjVwaW5pYVx1MzAwMXZ1ZS1yb3V0ZXJcdTMwMDF2dWV1c2VcdTdCNDlcdUZGMENcclxuICAgICAgICAvLyBcdTc1MUFcdTgxRjNcdTRGNjBcdThGRDhcdTUzRUZcdTRFRTVcdTRGN0ZcdTc1MjhcdTgxRUFcdTVCOUFcdTRFNDlcdTc2ODRcdTkxNERcdTdGNkVcdTg5QzRcdTUyMTlcdUZGMENcdTg5QzEgaHR0cHM6Ly9naXRodWIuY29tL2FudGZ1L3VucGx1Z2luLWF1dG8taW1wb3J0I2NvbmZpZ3VyYXRpb25cclxuICAgICAgICBpbXBvcnRzOiBbJ3Z1ZScsICdwaW5pYScsICd2dWUtcm91dGVyJywgJ0B2dWV1c2UvY29yZSddLFxyXG4gICAgICAgIC8vIFx1N0IyQ1x1NEUwOVx1NjVCOVx1N0VDNFx1NEVGNlx1NUU5M1x1NzY4NFx1ODlFM1x1Njc5MFx1NTY2OFxyXG4gICAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKV0sXHJcbiAgICAgICAgLy8gZHRzOiAnLi9zcmMvYXV0by1pbXBvcnRzLmQudHMnLFxyXG4gICAgICAgIGVzbGludHJjOiB7XHJcbiAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgZmlsZXBhdGg6ICcuLy5lc2xpbnRyYy1hdXRvLWltcG9ydC5qc29uJyxcclxuICAgICAgICAgIGdsb2JhbHNQcm9wVmFsdWU6IHRydWUsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSksXHJcbiAgICAgIENvbXBvbmVudHMoe1xyXG4gICAgICAgIC8vIGRpcnMgXHU2MzA3XHU1QjlBXHU3RUM0XHU0RUY2XHU2MjQwXHU1NzI4XHU0RjREXHU3RjZFXHVGRjBDXHU5RUQ4XHU4QkE0XHU0RTNBIHNyYy9jb21wb25lbnRzXHJcbiAgICAgICAgLy8gXHU1M0VGXHU0RUU1XHU4QkE5XHU2MjExXHU0RUVDXHU0RjdGXHU3NTI4XHU4MUVBXHU1REYxXHU1QjlBXHU0RTQ5XHU3RUM0XHU0RUY2XHU3Njg0XHU2NUY2XHU1MDE5XHU1MTREXHU1M0JCIGltcG9ydCBcdTc2ODRcdTlFQkJcdTcwRTZcclxuICAgICAgICAvLyBkaXJzOiBbJ3NyYy9jb21wb25lbnRzLyddLFxyXG4gICAgICAgIC8vIFx1OTE0RFx1N0Y2RVx1OTcwMFx1ODk4MVx1NUMwNlx1NTRFQVx1NEU5Qlx1NTQwRVx1N0YwMFx1N0M3Qlx1NTc4Qlx1NzY4NFx1NjU4N1x1NEVGNlx1OEZEQlx1ODg0Q1x1ODFFQVx1NTJBOFx1NjMwOVx1OTcwMFx1NUYxNVx1NTE2NVxyXG4gICAgICAgIGV4dGVuc2lvbnM6IFsndnVlJywgJ21kJ10sXHJcbiAgICAgICAgLy8gXHU4OUUzXHU2NzkwXHU3Njg0IFVJIFx1N0VDNFx1NEVGNlx1NUU5M1x1RkYwQ1x1OEZEOVx1OTFDQ1x1NEVFNSBFbGVtZW50IFBsdXMgXHU1NDhDIEFudCBEZXNpZ24gVnVlIFx1NEUzQVx1NEY4QlxyXG4gICAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKSwgVnVlVXNlQ29tcG9uZW50c1Jlc29sdmVyKCldLFxyXG4gICAgICAgIGR0czogJy4vc3JjL2NvbXBvbmVudHMuZC50cycsXHJcbiAgICAgIH0pLFxyXG4gICAgICBJbWFnZU1pbih7XHJcbiAgICAgICAgZ2lmc2ljbGU6IHtcclxuICAgICAgICAgIG9wdGltaXphdGlvbkxldmVsOiA3LFxyXG4gICAgICAgICAgaW50ZXJsYWNlZDogZmFsc2UsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBvcHRpcG5nOiB7XHJcbiAgICAgICAgICBvcHRpbWl6YXRpb25MZXZlbDogNyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHdlYnA6IHtcclxuICAgICAgICAgIHF1YWxpdHk6IDc1LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbW96anBlZzoge1xyXG4gICAgICAgICAgcXVhbGl0eTogOCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBuZ3F1YW50OiB7XHJcbiAgICAgICAgICBxdWFsaXR5OiBbMC44LCAwLjldLFxyXG4gICAgICAgICAgc3BlZWQ6IDQsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdmdvOiB7XHJcbiAgICAgICAgICBwbHVnaW5zOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBuYW1lOiAncmVtb3ZlVmlld0JveCcsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBuYW1lOiAncmVtb3ZlRW1wdHlBdHRycycsXHJcbiAgICAgICAgICAgICAgYWN0aXZlOiBmYWxzZSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIF0sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSksXHJcbiAgICAgIENvbXByZXNzaW9uKCksXHJcbiAgICAgIHZpc3VhbGl6ZXIoKSxcclxuICAgIF0sXHJcbiAgICBidWlsZDoge1xyXG4gICAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDIwMDAsXHJcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgICBvdXRwdXQ6IHtcclxuICAgICAgICAgIGNodW5rRmlsZU5hbWVzOiAnanMvW25hbWVdLVtoYXNoXS5qcycsXHJcbiAgICAgICAgICBlbnRyeUZpbGVOYW1lczogJ2pzL1tuYW1lXS1baGFzaF0uanMnLFxyXG4gICAgICAgICAgYXNzZXRGaWxlTmFtZXM6ICdbZXh0XS9bbmFtZV0tW2hhc2hdLltleHRdJyxcclxuICAgICAgICAgIG1hbnVhbENodW5rcyhpZCkge1xyXG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJy5wbnBtJykpIHtcclxuICAgICAgICAgICAgICAvLyBcdThEODVcdTU5MjdcdTk3NTlcdTYwMDFcdThENDRcdTZFOTBcdTYyQzZcdTUyMDZcclxuICAgICAgICAgICAgICByZXR1cm4gaWQudG9TdHJpbmcoKS5zcGxpdCgnLnBucG0vJylbMV0uc3BsaXQoJy8nKVswXS50b1N0cmluZygpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBkZWZpbmU6IHtcclxuICAgICAgX19WVUVfSTE4Tl9MRUdBQ1lfQVBJX186IGZhbHNlLFxyXG4gICAgICBfX1ZVRV9JMThOX0ZVTExfSU5TVEFMTF9fOiBmYWxzZSxcclxuICAgICAgX19JTlRMSUZZX1BST0RfREVWVE9PTFNfXzogZmFsc2UsXHJcbiAgICB9LFxyXG4gICAgb3B0aW1pemVEZXBzOiB7XHJcbiAgICAgIGluY2x1ZGU6IFsnbW9tZW50L2Rpc3QvbG9jYWxlL3poLWNuJywgJ21vbWVudC9kaXN0L2xvY2FsZS9ldSddLFxyXG4gICAgICBleGNsdWRlOiBbJ0BhcmNnaXMvY29yZSddLFxyXG4gICAgfSxcclxuICB9XHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBd1MsU0FBUyxvQkFBZ0M7QUFDalYsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMscUJBQXFCLGdDQUFnQztBQUM5RCxPQUFPLGNBQWM7QUFDckIsT0FBTyxpQkFBaUI7QUFDeEIsU0FBUyxrQkFBa0I7QUFDM0IsT0FBTyxVQUFVO0FBUmpCLElBQU0sbUNBQW1DO0FBU3pDLFNBQVMsWUFBWSxLQUFhO0FBQ2hDLFNBQU8sS0FBSyxRQUFRLGtDQUFXLEtBQUssR0FBRztBQUN6QztBQUVBLElBQU8sc0JBQVEsYUFBYSxNQUFrQjtBQUM1QyxRQUFNLE9BQU8sUUFBUSxJQUFJO0FBQ3pCLFNBQU87QUFBQSxJQUNMO0FBQUEsSUFDQSxNQUFNO0FBQUEsSUFDTixTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsUUFDTDtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sYUFBYSxZQUFZLEtBQUssSUFBSTtBQUFBLFFBQ3BDO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE1BQU0sQ0FBQyxXQUFXLFVBQVU7QUFBQSxJQUM5QjtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sS0FBSztBQUFBLFFBQ0gsU0FBUztBQUFBLE1BQ1g7QUFBQSxNQUNBLE1BQU07QUFBQSxJQUNSO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxJQUFJO0FBQUEsUUFDRixVQUFVO0FBQUEsVUFDUixpQkFBaUI7QUFBQSxZQUNmLGlCQUFpQixDQUFDLFFBQVEsSUFBSSxXQUFXLEtBQUssS0FBSyxJQUFJLFdBQVcsTUFBTTtBQUFBLFVBQzFFO0FBQUEsUUFDRjtBQUFBLE1BQ0YsQ0FBQztBQUFBLE1BQ0QsV0FBVztBQUFBO0FBQUE7QUFBQSxRQUdULFNBQVMsQ0FBQyxPQUFPLFNBQVMsY0FBYyxjQUFjO0FBQUE7QUFBQSxRQUV0RCxXQUFXLENBQUMsb0JBQW9CLENBQUM7QUFBQTtBQUFBLFFBRWpDLFVBQVU7QUFBQSxVQUNSLFNBQVM7QUFBQSxVQUNULFVBQVU7QUFBQSxVQUNWLGtCQUFrQjtBQUFBLFFBQ3BCO0FBQUEsTUFDRixDQUFDO0FBQUEsTUFDRCxXQUFXO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQUtULFlBQVksQ0FBQyxPQUFPLElBQUk7QUFBQTtBQUFBLFFBRXhCLFdBQVcsQ0FBQyxvQkFBb0IsR0FBRyx5QkFBeUIsQ0FBQztBQUFBLFFBQzdELEtBQUs7QUFBQSxNQUNQLENBQUM7QUFBQSxNQUNELFNBQVM7QUFBQSxRQUNQLFVBQVU7QUFBQSxVQUNSLG1CQUFtQjtBQUFBLFVBQ25CLFlBQVk7QUFBQSxRQUNkO0FBQUEsUUFDQSxTQUFTO0FBQUEsVUFDUCxtQkFBbUI7QUFBQSxRQUNyQjtBQUFBLFFBQ0EsTUFBTTtBQUFBLFVBQ0osU0FBUztBQUFBLFFBQ1g7QUFBQSxRQUNBLFNBQVM7QUFBQSxVQUNQLFNBQVM7QUFBQSxRQUNYO0FBQUEsUUFDQSxVQUFVO0FBQUEsVUFDUixTQUFTLENBQUMsS0FBSyxHQUFHO0FBQUEsVUFDbEIsT0FBTztBQUFBLFFBQ1Q7QUFBQSxRQUNBLE1BQU07QUFBQSxVQUNKLFNBQVM7QUFBQSxZQUNQO0FBQUEsY0FDRSxNQUFNO0FBQUEsWUFDUjtBQUFBLFlBQ0E7QUFBQSxjQUNFLE1BQU07QUFBQSxjQUNOLFFBQVE7QUFBQSxZQUNWO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGLENBQUM7QUFBQSxNQUNELFlBQVk7QUFBQSxNQUNaLFdBQVc7QUFBQSxJQUNiO0FBQUEsSUFDQSxPQUFPO0FBQUEsTUFDTCx1QkFBdUI7QUFBQSxNQUN2QixlQUFlO0FBQUEsUUFDYixRQUFRO0FBQUEsVUFDTixnQkFBZ0I7QUFBQSxVQUNoQixnQkFBZ0I7QUFBQSxVQUNoQixnQkFBZ0I7QUFBQSxVQUNoQixhQUFhLElBQUk7QUFDZixnQkFBSSxHQUFHLFNBQVMsT0FBTyxHQUFHO0FBRXhCLHFCQUFPLEdBQUcsU0FBUyxFQUFFLE1BQU0sUUFBUSxFQUFFLENBQUMsRUFBRSxNQUFNLEdBQUcsRUFBRSxDQUFDLEVBQUUsU0FBUztBQUFBLFlBQ2pFO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04seUJBQXlCO0FBQUEsTUFDekIsMkJBQTJCO0FBQUEsTUFDM0IsMkJBQTJCO0FBQUEsSUFDN0I7QUFBQSxJQUNBLGNBQWM7QUFBQSxNQUNaLFNBQVMsQ0FBQyw0QkFBNEIsdUJBQXVCO0FBQUEsTUFDN0QsU0FBUyxDQUFDLGNBQWM7QUFBQSxJQUMxQjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
