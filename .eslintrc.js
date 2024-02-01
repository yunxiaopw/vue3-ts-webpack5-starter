module.exports = {
  env: {
    node: true,
    browser: true,
    es6: true,
    commonjs: true
  },
  extends: ['plugin:vue/essential', 'airbnb-base', 'plugin:prettier/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'no-console': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'no-plusplus': 'off',
    'no-param-reassign': 'off',
    'vue/multi-word-component-names': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-shadow': 'off',
    'no-unused-expressions': 'off',
    'vue/no-multiple-template-root': 'off',
    'vue/no-v-for-template-key': 'off',
    'no-bitwise': 'off'
  }
}
