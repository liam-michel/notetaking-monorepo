// @ts-check

import eslint from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import { plugin as ex } from 'eslint-plugin-exception-handling'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import { configs as sonarjsConfigs } from 'eslint-plugin-sonarjs'
import toplevel from 'eslint-plugin-toplevel'
import tseslint from 'typescript-eslint'
import unusedImports from 'eslint-plugin-unused-imports'

export default tseslint.config(
  // 🔹 Global ignores
  {
    ignores: ['**/*.cjs', 'node_modules/**', 'build/**', 'extension/**', '**/__test__/**', 'tmp/**'],
  },

  // 🔹 Strict defaults (ALL TS files)
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      'simple-import-sort': simpleImportSort,
      toplevel,
      ex,
      'unused-imports': unusedImports,
    },
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      sonarjsConfigs.recommended,
      eslintConfigPrettier,
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      // 🔥 Hygiene
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      // Disable overlaps
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'sonarjs/no-unused-vars': 'off',

      // Strict rules
      'sonarjs/todo-tag': 'warn',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'toplevel/no-toplevel-side-effect': 'error',
      'toplevel/no-toplevel-var': 'error',
      'toplevel/no-toplevel-let': 'error',
      'ex/might-throw': 'off',
      'ex/no-unhandled': 'error',
      'ex/use-error-cause': 'error',
      'no-console': 'error',
    },
  },

  // 🔹 Relaxed rules for tests only
  {
    files: ['**/__tests__/**/*.ts', '**/*.spec.ts', '**/*.test.ts'],
    rules: {
      // Still keep unused imports strict
      'unused-imports/no-unused-imports': 'error',

      // Relax the noisy stuff
      'no-console': 'off',
      'toplevel/no-toplevel-side-effect': 'off',

      // Optional: allow TODOs in tests
      'sonarjs/todo-tag': 'off',
    },
  },
)
