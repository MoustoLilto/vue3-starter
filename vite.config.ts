/// <reference types="vitest" />

import Vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import Pages from 'vite-plugin-pages';
import Unocss from 'unocss/vite';

export default defineConfig({
    base: '/',
    envDir: new URL('./env', import.meta.url).pathname,
    resolve: {
        alias: {
            '@/': new URL('./src/', import.meta.url).pathname,
        },
    },
    build: {
        sourcemap: true,
    },

    plugins: [
        // https://vuejs.org/guide/extras/reactivity-transform.html
        Vue({
            reactivityTransform: true,
        }),

        // https://www.npmjs.com/package/vite-plugin-pages
        Pages({
            dirs: [{ dir: 'src/pages', baseRoute: '' }],
            extensions: ['vue'],
        }),

        // https://www.npmjs.com/package/unplugin-auto-import
        AutoImport({
            dts: 'src/types/auto-imports.d.ts',
            vueTemplate: true,
            dirs: ['src/stores', './src/composables'],
            imports: [
                'vue',
                'vue-router',
                'vue/macros',
                // '@vueuse/core',
            ],
        }),

        // https://github.com/antfu/vite-plugin-components
        Components({
            dts: 'src/types/components.d.ts',
        }),

        // https://uno.antfu.me/?s=guide:
        Unocss(),
    ],

    // https://github.com/vitest-dev/vitest
    test: {
        environment: 'jsdom',
        coverage: {
            provider: 'istanbul',
            reporter: ['cobertura', 'text'],
        },
    },
});
