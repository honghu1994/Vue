const path = require('path');

module.exports = {
    //入口：告诉webpack先从哪开始打包
    entry: './src/index.js',
    //出口
    output: {
        // 文件名
        filename: 'main.js',
        // 打包后的路径
        // 根目录的dist文件夹里面
        path: path.resolve(__dirname, 'dist')
    },


    devServer: {
        contentBase: './dist'
    },

    module: {
        // 规则
        rules: [
            {
                // 匹配所有以.css结尾的文件
                test: /\.css$/,
                // 所有.css的文件用下面的loader进行解析
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },

            {
                // 匹配所有以.less结尾的文件
                test: /\.less$/,
                // 用以下的loader去解析
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }
                ]
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // 将 JS 字符串生成为 style 节点
                }, {
                    loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
                }, {
                    loader: "sass-loader" // 将 Sass 编译成 CSS
                }]
            }
        ]
    }
};