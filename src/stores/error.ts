import { acceptHMRUpdate, defineStore } from 'pinia';
import CatchedError from '@/types/CatchedError';
import { FatalErrorType, FatalErrorSolutionType, ToastStatus } from '@/types';
import errorMessages from '@/constants/errorMessages';

interface FatalErrorParam {
    error: Error;
    fileName: string;
    solution?: FatalErrorSolutionType;
}
interface ErrorToastType {
    error: unknown;
    fileName: string;
    dismiss?: boolean;
    status?: ToastStatus;
}

export const useErrorStore = defineStore('error', () => {
    const toastStore = useToastStore();

    // STATE
    const fatalErrors = ref<FatalErrorType[]>([]);

    // GETTERS
    const hasFatalError = computed(() => fatalErrors.value.length > 0);
    const fatalError = computed(() => (hasFatalError.value ? fatalErrors.value[0] : undefined));

    // MUTATIONS / ACTIONS
    function showErrorToast({
        error,
        fileName = '',
        dismiss = true,
        status = 'error',
    }: ErrorToastType) {
        let title;
        let message;

        if (error instanceof CatchedError) {
            if (error.stack && error.fileName) {
                console.error(error.fileName, error.stack);
            }
            title = error.title;
            message = error.message;
        } else {
            console.error(fileName, `Interception d'une erreur non gérée: ${error}`);
            title = errorMessages.UNKNOWN.TITLE;
            message = errorMessages.UNKNOWN.MESSAGE;
        }
        toastStore.showToast({
            status,
            title,
            message,
            dismiss,
        });
    }

    function addFatalError({ error, fileName = '', solution }: FatalErrorParam) {
        let fatalError: FatalErrorType;
        if (error instanceof CatchedError) {
            if (error.stack && error.fileName) {
                console.error(error.fileName, error.stack);
            }
            fatalError = {
                id: fatalErrors.value.length,
                title: error.title,
                message: error.message,
                solution,
            };
        } else {
            console.error(fileName, `Interception d'une erreur fatale non gérée: ${error}`);
            fatalError = {
                id: fatalErrors.value.length,
                title: errorMessages.UNKNOWN.TITLE,
                message: errorMessages.UNKNOWN.MESSAGE,
                solution,
            };
        }
        fatalErrors.value.push(fatalError);
    }
    function removeFatalError(errorId: number) {
        fatalErrors.value.splice(errorId, 1);
    }
    function clearFatalErrors() {
        fatalErrors.value = [];
    }

    return {
        hasFatalError,
        fatalError,
        addFatalError,
        showErrorToast,
        removeFatalError,
        clearFatalErrors,
    };
});

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useErrorStore, import.meta.hot));
