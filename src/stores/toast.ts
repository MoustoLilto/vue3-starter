import { acceptHMRUpdate, defineStore } from 'pinia';
import { ToastType } from '@/types';

export const useToastStore = defineStore('toast', () => {
    const toast = ref<ToastType>({
        value: false,
        status: 'success',
        title: '',
        message: '',
        dismiss: true,
    });

    function setToastValue(val: boolean) {
        toast.value.value = val;
    }

    function showToast({
        status = 'success',
        title = '',
        message = '',
        dismiss = true,
    }: Partial<ToastType>) {
        toast.value = {
            value: true,
            status,
            title,
            message,
            dismiss,
        };
    }

    function clearToast() {
        toast.value = {
            value: false,
            status: 'normal',
            title: '',
            message: '',
            dismiss: true,
        };
    }

    return {
        toast,

        setToastValue,
        showToast,
        clearToast,
    };
});

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useToastStore, import.meta.hot));
