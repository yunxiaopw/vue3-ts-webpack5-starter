module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3,
        targets: {
          chrome: '58'
        }
      }
    ],
    [
      '@babel/preset-typescript', // 引用Typescript插件
      {
        isTSX: true, // 必须设置，否者编译tsx时会报错
        allExtensions: true // 支持所有文件扩展名，否则在vue文件中使用ts会报错
      }
    ]
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 3
      }
    ],
    '@babel/plugin-transform-arrow-functions',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-async-generator-functions'
  ]
}
