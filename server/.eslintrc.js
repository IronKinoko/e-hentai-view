module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    browser: false,
  },
  extends: ['standard', 'plugin:prettier/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    camelcase: 'off',
  },
}
