<template>
    <div
        v-if="toastStore.toast.value"
        class="fixed bottom-2 m-a left-0 right-0 w-90 h-fit text-white"
        :class="toastClass.bgColor"
    >
        <div class="flex flex-row gap-2 p-2">
            <div class="inline-block text-hecto leading-6" :class="toastClass.icon" />

            <div class="flex flex-col flex-1 gap-1 font-700">
                <div class="font-bold leading-6">
                    {{ toastStore.toast.title }}
                </div>

                <div class="flex flex-1 font-400">
                    {{ toastStore.toast.message }}
                </div>
            </div>

            <a
                v-if="toastStore.toast.dismiss"
                class="i-material-symbols:close text-hecto inline-block leading-6"
                @click="toastStore.setToastValue(false)"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
const toastStore = useToastStore();

const toastClass = computed(() => {
    switch (toastStore.toast.status) {
        case 'success':
            return {
                bgColor: 'bg-success',
                icon: 'i-material-symbols:check-circle-outline',
            };
        case 'error':
            return {
                bgColor: 'bg-error',
                icon: 'i-material-symbols:error-outline',
            };
        case 'warning':
            return {
                bgColor: 'bg-warning',
                icon: 'i-material-symbols:warning-outline',
            };
        case 'normal':
            return {
                bgColor: 'bg-primary',
                icon: 'i-material-symbols:info-outline',
            };
    }
});
</script>
