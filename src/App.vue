<template>
    <div class="min-h-100vh min-w-100vw flex flex-col font-sans-serif bg-tertiary">
        <DefaultHeader />

        <Toast v-if="toastStore.toast.value" />

        <main class="flex-1 min-h-full mx-a mt-4 text-black" xs="max-w-100%" md="max-w-80%">
            <FatalErrorViewer v-if="errorStore.hasFatalError" />
            <router-view v-else></router-view>
        </main>

        <div class="bg-green h-20px"></div>
    </div>
</template>

<script setup lang="ts">
const errorStore = useErrorStore();
const toastStore = useToastStore();
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap');
body {
    margin: 0;
}

#nprogress {
    @apply pointer-events-none;
}

#nprogress .bar {
    @apply bg-green-darker op-75 fixed z-1031 top-0 left-0 w-100% h-2px;
}
</style>
