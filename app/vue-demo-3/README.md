## ⚡ 简介

基于 Vue3、TypeScript、Element Plus、Pinia 和 Vite 等主流技术的开发模板。

## 技术栈

- 包管理工具：[pnpm](https://pnpm.io/)
- 编程语言：[TypeScript 4.x](https://www.typescriptlang.org/zh/) + [JavaScript](https://www.javascript.com/)
- 构建工具：[Vite 4.x](https://cn.vitejs.dev/)
- 前端框架：[Vue 3.x](https://v3.cn.vuejs.org/)
- 路由工具：[Vue Router 4.x](https://next.router.vuejs.org/zh/index.html)
- 状态管理：[Pinia 2.x](https://pinia.vuejs.org/zh/)
- UI 框架：[Element Plus](https://element-plus.org/#/zh-CN)
- CSS 预编译：[Sass](https://sass.bootcss.com/documentation)
- HTTP 工具：[Axios](https://axios-http.com/)
- Git Hook 工具：[husky](https://typicode.github.io/husky/#/) + [lint-staged](https://github.com/okonet/lint-staged)
- 代码规范：[EditorConfig](http://editorconfig.org) + [Prettier](https://prettier.io/) + [ESLint](https://eslint.org/) + [StyleLint](https://stylelint.io/)
- 提交规范：[Commitizen](http://commitizen.github.io/cz-cli/) + [Commitlint](https://commitlint.js.org/#/)

```bash
# 配置
1. 一键安装 .vscode 目录中推荐的插件
3. node 版本 16+
4. pnpm 版本 7.x

# 安装依赖
pnpm i

# 启动服务
pnpm dev
```

## 🔧 代码格式检查

```bash
pnpm lint
```

## Pull Request

1. Fork 代码
2. 创建自己的分支: `git checkout -b feat/xxxx`
3. 提交你的修改: `git commit -am 'feat(function): add xxxxx'`
4. 推送您的分支: `git push origin feat/xxxx`
5. 提交 `pull request`

## Git 提交规范参考

- `upd` 更新功能
- `wip` 开发中
- `feat` 新增功能
- `fix` 修复 bug
- `perf` 性能优化
- `types` 类型修改
- `docs` 文档或注释变更
- `style` 代码格式（不影响功能，例如空格、分号等格式修正）
- `refactor` 代码重构（不包括 bug 修复、功能新增）
- `build` 构建流程、外部依赖变更（如升级 npm 包、修改 vite 配置等）
- `chore` 对构建过程或辅助工具和库的更改（不影响源文件、测试用例）
- `revert` 撤销 commit，回滚版本
- `test` 添加、修改测试用例
- `ci` 修改 CI 配置、脚本
- `workflow` 工作流改进
- `release` 版本发布
- `mod` 不确定分类的修改
