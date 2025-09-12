import axios, { AxiosError } from "axios";
import type { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";


const BASE_URL = import.meta.env.VITE_BACKEND_URL as string;

const axiosInstance = axios.create({
    baseURL : BASE_URL,
    withCredentials : true
}) 

let isRefreshing = false;
let pendingRequests: Array<(tokenRefreshed: boolean) => void> = [];

const subscribeTokenRefresh = (cb: (tokenRefreshed: boolean) => void) => {
    pendingRequests.push(cb);
};

const onRefreshed = (success: boolean) => {
    pendingRequests.forEach((cb) => cb(success));
    pendingRequests = [];
};

const retryOriginalRequest = (originalConfig: InternalAxiosRequestConfig) => {
    return axiosInstance.request(originalConfig as AxiosRequestConfig);
};

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const status = error.response?.status;
        const originalConfig = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        if ((status === 401 || status === 403) && !originalConfig?._retry) {
            originalConfig._retry = true;

            if (!isRefreshing) {
                isRefreshing = true;
                try {
                    await axiosInstance.post("tenant/refresh-token");
                    onRefreshed(true);
                    return retryOriginalRequest(originalConfig);
                } catch (refreshErr: any) {
                    onRefreshed(false);
                    window.location.href = "/sign-in";
                    return Promise.reject(refreshErr);
                } finally {
                    isRefreshing = false;
                }
            } else {
                return new Promise((resolve, reject) => {
                    subscribeTokenRefresh((success) => {
                        if (!success) {
                            reject(error);
                            return;
                        }
                        retryOriginalRequest(originalConfig).then(resolve).catch(reject);
                    });
                });
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
