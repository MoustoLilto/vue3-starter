import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';
import NProgress from 'nprogress';

import App from './App.vue';
import routes from '~pages';

import '@unocss/reset/normalize.css';
import 'uno.css';

const pinia = createPinia();

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, from) => {
    if (to.path !== from.path) {
        NProgress.start();
    }
});
router.afterEach(() => {
    NProgress.done();
});

const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount('#app');
