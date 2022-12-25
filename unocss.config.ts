import {
    defineConfig,
    presetIcons,
    presetUno,
    transformerDirectives,
    presetAttributify,
    transformerVariantGroup,
} from 'unocss';

export default defineConfig({
    theme: {
        colors: {
            primary: '#a855f7',
            secondary: '#d97706',
            tertiary: '#22d3ee',
            success: '#10b981',
            warning: '#ca8a04',
            error: '#ef4444',
        },
        fontFamily: {
            'sans-serif': [
                'Lato',
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'ui-sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ],
            monospace: [
                'SFMono-Regular',
                'Menlo',
                'Monaco',
                'Consolas',
                '"Liberation Mono"',
                '"Courier New"',
                'monospace',
            ],
        },
        breakpoints: {
            xs: '0px',
            sm: '576px',
            md: '768px',
            lg: '992px',
            xl: '1200px',
        },
    },
    shortcuts: [
        [
            'btn-secondary',
            'bg-white border-blue text-blue w-fit px-2.5 p-1 border truncate cursor-pointer hover:bg-blue-200 focus:ring-2 active:(bg-blue-200 outline outline-blue outline-offset-1 outline-2)',
        ],
        [
            'tag',
            'w-fit px-1 py-0.5 bg-blue-200 border border-blue truncate xs:(text-lg) sm:(text-base)',
        ],
    ],
    presets: [
        presetUno(),
        presetIcons({
            scale: 1.2,
            warn: true,
        }),
        presetAttributify({
            prefix: 'un-',
        }),
    ],
    transformers: [transformerDirectives(), transformerVariantGroup()],
});
