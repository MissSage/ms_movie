# 图片压缩

## 相关插件

- vite-plugin-image-optimizer
  - pnpm i sharp svgo vite-plugin-image-optimizer -D
  - 可选安装： sharp、svgo

## 问题汇总

1. 关于 sharp 安装失败

   参考关于 [sharp 安装失败](https://sharp.pixelplumbing.com/install)的解决方案

   当前采取配置镜像的办法解决问题：

   ```cmd
   pnpm config set sharp_binary_host "https://npmmirror.com/mirrors/sharp"
   pnpm config set sharp_libvips_binary_host "https://npmmirror.com/mirrors/sharp-libvips"
   pnpm install sharp -D
   ```
