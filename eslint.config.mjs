import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'plugin:tailwindcss/recommended', 'prettier'),
  ...compat.plugins('prettier', 'tailwindcss'),
  {
    rules: {
      'prettier/prettier': ['error', { printWidth: 120 }],
    },
    ignores: ['build/*', 'dist/*', 'node_modules/*', 'config/*', '*.ico', '*.png', '*.jpg', '*.jpeg', '*.gif', '*.svg'],
  },
]

export default eslintConfig
