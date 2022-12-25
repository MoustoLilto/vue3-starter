<template>
    <header>
        <div
            class="flex justify-between items-center py-3 border-b border-gray-300"
            xs="px-2"
            md="px-4"
        >
            <img src="@/assets/etime-logo.svg" @click="goToLandingPage()" />

            <div class="flex items-center gap-1">
                <i class="i-material-symbols:android-contacts text-hecto" />
                <span v-if="userStore.isUserLoaded" xs="hidden" sm="flex">
                    {{ userStore.user.name }}
                </span>
            </div>
        </div>

        <nav
            v-if="!errorStrore.hasFatalError"
            class="mx-a border-b border-gray-300 mt-2"
            xs="max-w-100%"
            md="max-w-80%"
        >
            <div class="flex h-10 items-center gap-2" xs="justify-center" md="justify-start">
                <a
                    v-for="(route, index) in routes"
                    :key="index"
                    class="flex items-center justify-center text-black text-center h-full decoration-none cursor-pointer"
                    hover="bg-gray-200 border-b-2 border-blue"
                    xs="px-0 flex-auto"
                    md="px-3 flex-none"
                    :class="{ 'active-nav': actualPage.path === route.path }"
                    @click="goTo(route)"
                >
                    {{ route.meta ? route.meta.title : 'Titre' }}
                </a>
            </div>
        </nav>
    </header>
</template>

<script setup lang="ts">
import { LANDING_PAGE_PATH } from '@/constants';
import type { RouteRecordRaw } from 'vue-router';
import routes from '~pages';

const errorStrore = useErrorStore();
const userStore = useUserStore();
const router = useRouter();
const actualPage = useRoute();

function goTo(route: RouteRecordRaw) {
    router.push(route.path);
}
function goToLandingPage() {
    router.push(LANDING_PAGE_PATH);
}
</script>

<style scoped>
.active-nav {
    @apply border-b-2 border-blue font-700;
}
</style>
