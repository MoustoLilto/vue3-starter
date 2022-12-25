import { isNetworkError as isAxiosRetryNetworkError } from 'axios-retry';
import axios from 'axios';
import errorMessages from '@/constants/errorMessages';
import EngieError from '@/types/CatchedError';

function isConnected() {
    return navigator.onLine;
}

function isErrorStatusCode(error: unknown, codeOrCodes: number | number[]) {
    const isAxiosError = axios.isAxiosError(error);
    if (!error || !isAxiosError || (isAxiosError && !error.response)) return false;
    const codes: number[] = [];
    const statusCode = error.response && error.response.status;
    return statusCode === undefined || statusCode === null
        ? false
        : codes.concat(codeOrCodes).includes(statusCode);
}

function isNetworkError(error: unknown) {
    return (
        !isConnected() ||
        (error instanceof Error &&
            (error.message === 'Network Error' || isAxiosRetryNetworkError(error)))
    );
}

export function getApiError(error: unknown, specificMessage: string, callerFileName?: string) {
    let title = errorMessages.UNKNOWN.TITLE;
    let message = specificMessage;
    let stack: string | undefined = `Unknown Api error: ${error}`;

    if (isNetworkError(error)) {
        title = errorMessages.NETWORK.TITLE;
        message = errorMessages.NETWORK.MESSAGE;
        stack = undefined;
    }
    if (isErrorStatusCode(error, 401)) {
        title = errorMessages.HTTP._401.TITLE;
        message = errorMessages.HTTP._401.MESSAGE;
        stack = undefined;
    }
    if (isErrorStatusCode(error, 403)) {
        title = errorMessages.HTTP._403;
        stack = undefined;
    }
    if (isErrorStatusCode(error, 404)) {
        title = errorMessages.HTTP._404;
        stack = undefined;
    }
    if (isErrorStatusCode(error, 409)) {
        title = errorMessages.HTTP._409;
        stack = undefined;
    }
    if (isErrorStatusCode(error, [500, 503, 504])) {
        title = errorMessages.HTTP._500;
        stack = `Server Api error: ${error}`;
    }
    return new EngieError({ title, message, fileName: callerFileName, stack });
}

export default {
    getApiError,
    isNetworkError,
    isErrorStatusCode,
    isConnected,
};
