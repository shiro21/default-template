import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import { clearAuthAll, getAccessToken, getRefreshToken } from "../auth/token";
import { useAuthStore } from "../auth/useAuthStore";


const BASE_URL = import.meta.env.DEV ? '/api' : (import.meta.env.VITE_API_BASE_URL || '/api');

export const axiosPublic = axios.create({
    baseURL: BASE_URL,
    // withCredentials: true
})

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
    /** 다른 정보가 필요한 경우 여기 추가 */
    /** if (config.headers) config.headers['X-USER-ID'] = `userId` */

    return config;
})

let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
    if (!refreshPromise) {
        refreshPromise = (async () => {
            try {
                const reToken = getRefreshToken();
                if (!reToken) return null;

                const { data } = await axiosPublic.post('/v1/authentication/refresh-token', { reToken });
                const { accessToken, refreshToken, accessExpireTime, refreshExpireTime, userId, nickname } = data?.payload?.content;
                
                if (!accessToken || !refreshToken) return null;

                useAuthStore.getState().setAuth({
                    accessToken,
                    refreshToken,
                    accessExpireTime,
                    refreshExpireTime,
                    userId,
                    nickname
                });

                return accessToken as string;
            } catch (err: any) {
                return null;
            } finally {
                refreshPromise = null;
            }
        })();
    }

    return refreshPromise;
}

/** 응답 인터셉터: 401 => 자동 리프레시 & 재시도 (1회 진행) */
axiosInstance.interceptors.response.use((res) => res, async (error: AxiosError) => {
    const original = error.config as AxiosRequestConfig & { _retry?: boolean };

    const status = error.response?.status;
    if (status === 401 && !original._retry) {
        original._retry = true;

        const newAccess = await refreshAccessToken();
    
        if (newAccess) {
            original.headers = { ...(original.headers || {}), Authorization: `Bearer ${newAccess}`};
            
            return axiosInstance(original);
        }

        /** 리프레시 실패 => 로그아웃 */
        clearAuthAll();
        /** 위치이동 */

    }

    return Promise.reject(error);
})