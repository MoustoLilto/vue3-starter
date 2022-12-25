interface String {
    toParamString(...params: any): string;
}

declare module '*.vue' {
    import { type DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
}
