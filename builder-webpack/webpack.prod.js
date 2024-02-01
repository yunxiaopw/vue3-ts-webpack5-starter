const { merge } = require('webpack-merge')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const baseConfig = require('./webpack.base')

const isProd = process.env.BASE_ENV === 'production'
console.log('isProd', isProd)
const prodConfig = {
  mode: 'production',
  output: {
    filename: 'static/js/[name]-[contenthash:7].js',
    path: path.resolve(__dirname, '../dist'),
    clean: true, // webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
    assetModuleFilename: 'images/[name].[contenthash:8][ext]', // 图片资源输出路径
    publicPath: '/shop/'
  },
  devtool: 'source-map',
  optimization: {
    realContentHash: true,
    runtimeChunk: {
      name: 'mainifels'
    },
    minimize: true, // 代码压缩和混淆
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        parallel: true, // 开启多线程压缩
        extractComments: false, // 是否将注释剥离到单独文件，默认是true
        terserOptions: {
          ecma: 5, // ECMAScript 版本
          compress: {
            drop_console: true // 删除console
          },
          output: {
            ecma: 5,
            comments: false, // 删除掉代码中所有注释
            beautify: false // 不必要的空格
          }
        }
      }),
      new HtmlMinimizerPlugin()
    ],
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.(s?css|less|sass)$/,
          chunks: 'all',
          enforce: true,
          priority: 10
        },
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: 2,
          enforce: true,
          reuseExistingChunk: true
        }
      }
    },
    usedExports: true
  },
  plugins: [
    // 复制文件插件
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'), // 复制public下文件
          to: path.resolve(__dirname, '../dist'), // 复制到dist目录中
          filter: source => {
            return !source.includes('index.html') // 忽略index.html
          }
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].css'
    }),
    new CompressionPlugin({
      test: /\.(js|css)$/, // 只生成css,js压缩文件
      filename: '[path][base].gz', // 文件命名
      algorithm: 'gzip', // 压缩格式,默认是gzip
      threshold: 10240, // 只有大小大于该值的资源会被处理。默认值是 10k
      minRatio: 0.8 // 压缩率,默认值是 0.8
    })
  ]
}

module.exports = merge(prodConfig, baseConfig)
