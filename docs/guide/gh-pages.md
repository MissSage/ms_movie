# 使用 gh-pages 部署文档到 github pages

## gh-pages 简介

- gh-pages 可以帮助把文档部署到 github pages 上，开箱即用，一行命令即可上传打包资源到远程仓库，默认分支是 gh-pages

## 下载 gh-pages

- `pnpm i gh-pages -D`

## script 指令

```json
"scripts": {
  "docs:deploy": "gh-pages -d docs/.vitepress/dist",
}
```

## 注

- 仓库设置： rep=>Settings=>Pages=>Build and deployment=>选择 Deploy from a branch=> 指定 gh-pages 分支=>指定 root 目录=>点击 Save
