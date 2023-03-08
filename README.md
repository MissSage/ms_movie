# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## About Git

### 使用[ca-git](https://cz-git.qbb.sh/)

- 安装(共 4 步)

  1.  全局安装 commitizen: `npm i -g commitizen`
  2.  项目安装 cz-git: `pnpm install -D cz-git`
  3.  修改 package.json,增加`config`配置项

      ```json
      {
        "config": {
          "commitizen": {
            "path": "node_modules/cz-git"
          }
        }
      }
      ```

  4.  （可选）根目录添加 .commitlintrc.cjs 文件

      ```js
      // .commitlintrc.cjs
      /** @type {import('cz-git').UserConfig} */
      module.exports = {
        rule: {
          // ...
        },
        prompt: {
          useEmoji: false,
          // option...
        },
      }
      ```

      - 注意：vite3.x 开始生成的项目，package.json 会自动加上 "type": "module"，这时根目录的配置文件不能以 .js 结尾，要改为 .cjs，如 .commitlintrc.cjs, .prettierrc.cjs, .eslintrc.cjs。

- 使用

  1. `git add .`
  2. `git cz`

## About Eslint

### eslint+prettier

## About husky

```json
{
  "script": {
    "prepare": "husky install"
  }
}
```

- 该命令会在 pnpm install 之后运行，这样其他克隆该项目的同学就在装包的时候就会自动执行该命令来安装 husky。这里我们就不重新执行 pnpm install 了，直接执行 pnpm prepare，这个时候你会发现多了一个.husky 目录。
- 执行如下脚本，会在.husky 目录下生成 pre-commit 文件，以后提交前(pre-commit)都会执行 `pnpm format` 来进行格式化:
  `pnpm husky add .husky/pre-commit "pnpm format"`
