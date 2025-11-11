// eslint.config.mjs
import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';
import unusedImports from 'eslint-plugin-unused-imports';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
	{
		ignores: ['dist', 'node_modules', 'public', '.next'],
	},
	{
		files: ['**/*.{js,jsx,ts,tsx}'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				...globals.browser,
				...globals.node,
			},
			parserOptions: {
				ecmaFeatures: { jsx: true },
			},
		},
		plugins: {
			'@next/next': nextPlugin,
			react,
			'unused-imports': unusedImports,
		},
		extends: [
			js.configs.recommended,
			...tseslint.configs.recommended,
			eslintPluginPrettierRecommended,
		],
		rules: {
			// неиспользуемые
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{ varsIgnorePattern: '^[A-Z_]', argsIgnorePattern: '^_' },
			],
			'unused-imports/no-unused-imports': 'error',

			// next
			'@next/next/no-html-link-for-pages': 'off',
			'@next/next/no-img-element': 'warn',
			'@next/next/no-sync-scripts': 'error',
			'@next/next/no-head-element': 'warn',

			// react
			'react/jsx-no-target-blank': 'error',
			'react/prop-types': 'off',
			'react/react-in-jsx-scope': 'off',

			'@typescript-eslint/no-empty-object-type': [
				'off',
				{
					allowSingleExtends: true,
				},
			],
		},
		settings: {
			react: { version: 'detect' },
		},
	},
]);
