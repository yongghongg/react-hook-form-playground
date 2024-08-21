module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    node: true
  },
  extends: [
    'next/core-web-vitals',
    'eslint-config-love',
    'plugin:react/recommended',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier', 'sort-keys-fix'],
  rules: {
    camelcase: 'error',
    'no-duplicate-imports': 'error',
    quotes: ['error', 'single', { avoidEscape: true }],
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'sort-keys-fix/sort-keys-fix': 'warn',
    'spaced-comment': 'error'
  },
  settings: {
    'import/resolver': {
      typescript: {}
    }
  }
};
