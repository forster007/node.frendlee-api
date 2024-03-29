module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'prettier'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'prettier'
  ],
  rules: {
    "class-methods-use-this": "off",
    "camelcase": "off",
    "no-console": "off",
    "no-param-reassign": "off",
    "no-unused-vars": ["error", { "argsIgnorePattern": "next" }],
    "prettier/prettier": "error"
  },
};
