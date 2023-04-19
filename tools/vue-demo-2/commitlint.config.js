module.exports = {
  extends: ['@commitlint/config-conventional'],
  // https://commitlint.js.org/#/reference-rules
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'upd', // 更新功能
        'wip', // 开发中
        'feat', // 新增功能
        'fix', // 修复 bug
        'perf', // 性能优化
        'types', // 类型修改
        'docs', // 文档或注释变更
        'style', // 代码格式（不影响功能，例如空格、分号等格式修正）
        'refactor', // 代码重构（不包括 bug 修复、功能新增）
        'build', // 构建流程、外部依赖变更（如升级 npm 包、修改 vite 配置等）
        'chore', // 对构建过程或辅助工具和库的更改（不影响源文件、测试用例）
        'revert', // 撤销 commit，回滚版本
        'test', // 添加、修改测试用例
        'ci', // 修改 CI 配置、脚本
        'workflow', // 工作流改进
        'release', // 版本发布
        'mod' // 不确定分类的修改
      ]
    ],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never']
  }
}
