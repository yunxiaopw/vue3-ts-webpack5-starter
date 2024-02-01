const { merge } = require('webpack-merge')
const path = require('path')
const WebpackBar = require('webpackbar')
const baseConfig = require('./webpack.base')

const devConfig = {
  mode: 'development',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
    clean: true, // webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
    assetModuleFilename: 'images/[name].[contenthash:8][ext]', // 图片资源输出路径
    publicPath: '/'
  },
  devServer: {
    hot: true,
    open: false,
    port: '9527',
    compress: false,
    setupExitSignals: true,
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, '../public') // 托管静态资源public文件夹
    },
    proxy: {
      '/api': {
        target: 'https://other.yingxiong.com/dev_mainland',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  devtool: 'eval-cheap-module-source-map',
  stats: 'errors-only',
  plugins: [new WebpackBar()]
}

module.exports = merge(devConfig, baseConfig)
