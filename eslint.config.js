import eslint from '@eslint/js';
import eslintImport from 'eslint-plugin-import';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: ['dist/', 'eslint.config.js', 'stylelint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintImport.flatConfigs.typescript,
  {
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    settings: {
      react: {
        version: 'detect'
      },
    },
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        project: [
          './tsconfig.json',
          './tsconfig.app.json',
          './tsconfig.node.json',
        ]
      }
    },
    rules: {
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      ...reactRefresh.configs.vite.rules,
      // TODO: Remove import sorting rules when Prettier is added
      // For now, keeping minimal sorting config
      'import/order': ['error', {
        'alphabetize': { 'order': 'asc' },
        'newlines-between': 'always'
      }]
    }
  }
];