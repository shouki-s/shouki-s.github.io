import { createConfigForNuxt } from '@nuxt/eslint-config/flat'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default createConfigForNuxt({
  features: {
    // Prettier が整形を担当するので stylistic ルールは無効
    stylistic: false,
  },
})
  .append(eslintPluginPrettierRecommended)
  .append({
    files: ['**/*.ts', '**/*.vue'],
    rules: {
      'sort-imports': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error',
    },
  })
  .append({
    ignores: ['dist/**', '.output/**', '.nuxt/**', 'public/**'],
  })
