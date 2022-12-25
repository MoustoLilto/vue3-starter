import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import axiosRetry, { IAxiosRetryConfig } from 'axios-retry';
import { ConcurrencyManager } from 'axios-concurrency';

const DEFAULT_RETRIES = 2;
const DEFAULT_MAX_CONCURRENT_REQUESTS = 50;
const DEFAULT_RETRY_DELAY_FUNCTION = (retryCount: number) => 1000 * retryCount;

type interceptorType = {
    requestHandler?: (request: any) => Promise<any>;
    requestErrorHandler?: (request: any) => Promise<any>;
    responseSuccessHandler?: (response: any) => Promise<any>;
    responseErrorHandler?: (response: any) => Promise<any>;
};
class AxiosApiBuilder {
    private axiosConfig: AxiosRequestConfig;
    private interceptors: interceptorType[];
    private axiosRetryConfig: IAxiosRetryConfig;
    private maxConcurrentRequests: number;

    constructor(baseURL: string) {
        this.axiosConfig = {
            baseURL,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        };
        this.interceptors = [];
        this.axiosRetryConfig = {
            retries: DEFAULT_RETRIES,
            retryDelay: DEFAULT_RETRY_DELAY_FUNCTION,
        };
        this.maxConcurrentRequests = DEFAULT_MAX_CONCURRENT_REQUESTS;
    }

    build() {
        const newAxiosClient = axios.create(this.axiosConfig);
        axiosRetry(newAxiosClient, this.axiosRetryConfig);
        ConcurrencyManager(newAxiosClient, this.maxConcurrentRequests);

        this.interceptors.forEach(
            ({
                requestHandler,
                requestErrorHandler,
                responseSuccessHandler,
                responseErrorHandler,
            }) => {
                if (requestHandler || requestErrorHandler) {
                    newAxiosClient.interceptors.request.use(requestHandler, requestErrorHandler);
                }
                if (responseSuccessHandler || responseErrorHandler) {
                    newAxiosClient.interceptors.response.use(
                        responseSuccessHandler,
                        responseErrorHandler
                    );
                }
            }
        );
        return newAxiosClient;
    }
}

let apiClientInstance: AxiosInstance;
function getApiClient() {
    if (!apiClientInstance) {
        apiClientInstance = new AxiosApiBuilder(import.meta.env.VITE_API_BASE_URL).build();
    }
    return apiClientInstance;
}

export const apiClient = getApiClient();

export default {
    apiClient,
};
