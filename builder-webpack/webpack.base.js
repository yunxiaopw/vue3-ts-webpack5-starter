const path = require('path')
const { DefinePlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const ESLintPlugin = require('eslint-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const dotenv = require('dotenv')

const isDev = process.env.NODE_ENV === 'development'

// 加载配置文件
const envConfig = dotenv.config({
  path: path.resolve(__dirname, `../.env.${process.env.BASE_ENV}`)
})

console.log('envConfig', envConfig.parsed)

const vueRegex = /\.vue$/
const jsRegex = /\.(js|ts|tsx)$/
const cssRegex = /\.css$/
const lessRegex = /\.less$/
const imageRegex = /\.(png|jpe?g|gif|svg)$/i
const fontRegex = /\.(ttf|woff2?|eot|otf)$/
const mediaRegex = /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/

const styleLoadersArray = [
  isDev ? 'style-loader' : MiniCssExtractPlugin.loader, // 开发环境使用style-looader,打包模式抽离css
  {
    loader: 'css-loader'
  },
  'postcss-loader'
]

module.exports = {
  entry: path.resolve(__dirname, '../src/index.ts'),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    },
    extensions: ['.ts', '.tsx', '.vue', '.js', '.json'] // 使用 resolve.extensions 声明自动解析 .ts 后缀文件，这意味着代码如 import "./a.ts" 可以忽略后缀声明，简化为 import "./a" 文件
  },
  cache: {
    type: 'filesystem'
  },
  module: {
    rules: [
      {
        test: vueRegex,
        use: 'vue-loader',
        exclude: /node_modules/
      },
      {
        test: jsRegex,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: cssRegex,
        use: styleLoadersArray
      },
      {
        test: lessRegex,
        use: [
          ...styleLoadersArray,
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                less: {
                  importLoaders: 2,
                  // DO NOT REMOVE THIS LINE
                  javascriptEnabled: true
                }
              }
            }
          }
        ]
      },
      {
        test: imageRegex,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 8kb  大于 8kb，asset 选择用 asset/resource 处理它； 小于 8kb，asset 选择用 asset/inline 处理它。
          }
        },
        generator: {
          filename: 'static/images/[name].[contenthash:8][ext]' // 文件输出目录和命名
        }
      },
      {
        test: fontRegex,
        type: 'asset/resource',
        generator: {
          filename: 'static/fonts/[name].[contenthash:8][ext]' // 文件输出目录和命名
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 8kb  大于 8kb，asset 选择用 asset/resource 处理它； 小于 8kb，asset 选择用 asset/inline 处理它。
          }
        }
      },
      {
        test: mediaRegex, // 匹配媒体文件
        type: 'asset', // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 小于10kb转base64
          }
        },
        generator: {
          filename: 'static/media/[name].[contenthash:8][ext]' // 文件输出目录和命名
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      title: 'global-mall-web',
      filename: 'index.html',
      inject: true, // 自动注入静态资源
      hash: true,
      cache: false,
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true, // 去空格
        removeComments: true, // 去注释
        minifyJS: true, // 在脚本元素和事件属性中缩小JavaScript(使用UglifyJS)
        minifyCSS: true // 缩小CSS样式元素和样式属性
      },
      nodeModules: path.resolve(__dirname, '../node_modules')
    }),
    new DefinePlugin({
      'process.env': JSON.stringify(envConfig.parsed),
      'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new ESLintPlugin({ cache: true }),
    AutoImport({
      resolvers: [
        ElementPlusResolver({
          importStyle: false
        })
      ]
    }),
    Components({
      include: ['./src/**/*.{js,jsx,ts,tsx,vue,html}'],
      resolvers: [
        ElementPlusResolver({
          importStyle: false
        })
      ]
    })
  ]
}
