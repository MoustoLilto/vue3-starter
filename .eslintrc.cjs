module.exports = {
    root: true,
    env: {
        node: true,
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'plugin:vue/vue3-recommended',
        'prettier',
    ],
    plugins: ['prettier', '@typescript-eslint'],
    rules: {
        'prettier/prettier': [
            'warn',
            {
                tabWidth: 4,
                semi: true,
                trailingComma: 'es5',
                arrowParens: 'always',
                printWidth: 100,
                singleQuote: true,
                htmlWhitespaceSensitivity: 'ignore',
            },
        ],
        'vue/attribute-hyphenation': 'off',
        'no-undef': 'off',
        'no-use-before-define': 'off',
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
        'vue/component-tags-order': [
            'warn',
            {
                order: ['template', 'script', 'style'],
            },
        ],
        'vue/multi-word-component-names': 'off',
    },
    ignorePatterns: ['dist'],
};
