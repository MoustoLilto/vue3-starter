export interface FatalErrorType {
    id: number;
    title: string;
    message: string;
    solution?: FatalErrorSolutionType;
}
export interface FatalErrorSolutionType {
    title: string;
    action: () => void;
}

export type ToastStatus = 'success' | 'error' | 'warning' | 'normal';
export interface ToastType {
    value: boolean;
    status: ToastStatus;
    title: string;
    message: string;
    dismiss: boolean;
}
