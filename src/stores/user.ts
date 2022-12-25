import { acceptHMRUpdate, defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
    const user = ref({
        name: 'Test Mousto',
        mail: 'test.com',
    });

    const isUserLoaded = computed(() => user.value.name);

    async function loadUser(name: string, mail: string) {
        user.value = {
            name,
            mail,
        };
    }

    return {
        user,
        isUserLoaded,
        loadUser,
    };
});

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
