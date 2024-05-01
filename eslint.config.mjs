// @ts-check
import antfu from '@antfu/eslint-config'

import withNuxt from './.nuxt/eslint.config.mjs'

const antfuConfig = antfu({
  formatters: true,
  rules: {
    complexity: ['error', 5],
  },
})
  .override('antfu/imports/rules', {
    rules: {
      'import/order': ['error', { 'newlines-between': 'always' }],
    },
  })

export default withNuxt(antfuConfig, {
  rules: {
    'nuxt/prefer-import-meta': 'error',
  },
})
