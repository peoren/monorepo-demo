module.exports = {
  plugins: [
    require('postcss-flexbugs-fixes'),
    // 支持css最新语法
    require('postcss-preset-env')({
      stage: 2,
      browsers: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 8', '> 1%'],
      autoprefixer: {
        grid: true
      }
    })
  ]
}
