declare module 'axios-concurrency' {
    export function ConcurrencyManager(axios: any, max: number): any;
    export = ConcurrencyManager;
}
