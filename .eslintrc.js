module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    "@typescript-eslint/no-empty-interface": 'off',
    "@typescript-eslint/ban-types": 'off',
    "@typescript-eslint/no-unused-vars": ['warn', {
      "argsIgnorePattern": "^_"
    }],
    'no-console': process.env.NODE_ENV === 'production' ? ['error', {
      allow: ['warn', 'error']
    }] : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-var': 0,
    "no-unused-vars": ['warn', {
      "argsIgnorePattern": "^_"
    }],
    'prefer-rest-params': 0
  },
};
