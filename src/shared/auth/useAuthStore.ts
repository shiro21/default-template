// useAuthStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface User {
  id: string;
  nickname: string;
  email: string;
  loginId: string;
  profileImage: string;
  backgroundImage: string;
  introduction: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  accessExpireTime: string | null;
  refreshExpireTime: string | null;
  userId: string | null;
  nickname: string | null;
  setAuth: (p: {
    accessToken: string;
    refreshToken: string;
    accessExpireTime: string;
    refreshExpireTime: string;
    userId: string;
    nickname: string;
  }) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      accessExpireTime: null,
      refreshExpireTime: null,
      userId: null,
      nickname: null,
      setAuth: ({
        accessToken,
        refreshToken,
        accessExpireTime,
        refreshExpireTime,
        userId,
        nickname,
      }) =>
        set({
          accessToken,
          refreshToken,
          accessExpireTime,
          refreshExpireTime,
          userId,
          nickname,
        }),
      clearAuth: () =>
        set({
          accessToken: null,
          refreshToken: null,
          accessExpireTime: null,
          refreshExpireTime: null,
          userId: null,
          nickname: null,
        }),
    }),
    {
      name: 'auth', // ✅ 필수: 스토리지 키
      storage: createJSONStorage(() => localStorage), // 기본 localStorage 사용
      // 저장할 키만 선택적으로 보존(권장)
      partialize: (s) => ({
        accessToken: s.accessToken,
        refreshToken: s.refreshToken,
        accessExpireTime: s.accessExpireTime,
        refreshExpireTime: s.refreshExpireTime,
        userId: s.userId,
        nickname: s.nickname,
      }),
      // version: 1,
      // migrate: (persisted, version) => persisted as AuthState,
    }
  )
);
