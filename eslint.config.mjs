import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
	{ languageOptions: { globals: globals.node } },
	{
		rules: {
			'prettier/prettier': [
				'error',
				{
					singleQuote: true,
					trailingComma: 'all',
					useTabs: true,
					semi: true,
					bracketSpacing: true,
					printWidth: 100,
					endOfLine: 'auto',
				},
			],
		},
	},
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	eslintPluginPrettierRecommended,
];
