const path = require('path')

const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
        entry:'./src/main.js',// entry是指定打包文件的入口, 可以使用相对路径
        output: {
            path:path.join(__dirname,'dist'),// output是指输出的目录, 必须是绝对路径
            filename:'bundle.js',
        },
        mode:'development',
        devServer: {
            // contentBase: "./src", // 托管的根目录
            hot: true, // 我要开启或关闭HMR
            open: true, // 自动打开浏览器
            port: 4000 // 设置devServer的端口号
          },
        plugins: [
            // 装了插件表示当前项目有资格开启HMR
            new webpack.HotModuleReplacementPlugin(),
             // 如果不传入任何配置选项, 默认也会创建一个index.html托管在服务器根路径
	        // 只不过这个HTML是空的, title默认是webpack app
            new HtmlWebpackPlugin({
                title: '传智大法好!!!', // 如果模板中有title, 会覆盖这里的配置
                template: './src/index.html'
              })
          ],
        module: {
            rules: [
              {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
              },
              {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
              },
              {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
              },
              {
                //处理图片路径的loader
                test: /\.(jpg|gif|png)$/,
                use:"url-loader?limit=81920&name=[hash:8]-[name].[ext]"
              },
              {
                //处理字体图标的loader
                test: /.(eot|svg|ttf|woff|woff2)$/,
                use:"url-loader"
              },
              { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }
            ]
          },
        resolve:{
          alias:{
            "vue$":"vue/dist/vue.js"
          }
        }  
}