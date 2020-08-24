// 导入 path 路径模块
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

// 暴露出去
module.exports = {
  // 打包路口（告诉webpack用到了什么东西）
  entry: './src/main.js',
  // 出口，打包到哪里去去
  output: {
    // 文件名
    filename: 'main.js',
    // 路径
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [
      // ... 其它规则
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },

  plugins: [
    // 请确保引入这个插件！
    new VueLoaderPlugin()
  ]
};