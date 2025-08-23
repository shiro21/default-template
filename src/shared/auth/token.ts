import { useAuthStore } from "./useAuthStore";


export const getAccessToken = () => useAuthStore.getState().accessToken;
export const getRefreshToken = () => useAuthStore.getState().refreshToken;

export const setTokens = (accessToken: string, refreshToken: string, accessExpireTime: string, refreshExpireTime: string, userId: string, nickname: string) => {
    useAuthStore.getState().setAuth({ accessToken, refreshToken, accessExpireTime, refreshExpireTime, userId, nickname })
}

export const clearAuthAll = () => useAuthStore.getState().clearAuth();