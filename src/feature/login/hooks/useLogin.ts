import { useAuthStore } from "@/shared/auth/useAuthStore"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { LoginModel } from "../model/login-model";
import { loginApi } from "../api/login/api";

export const MY_KEY = ['my_key'] as const;


export function useLogin() {

    const queryClient = useQueryClient();
    const setAuth = useAuthStore((s) => s.setAuth);

    /** Login Mutation */
    const loginMutation = useMutation({
        mutationFn: async (values: LoginModel) => loginApi(values),
        onSuccess: (res) => {
            const {
                accessToken,
                refreshToken,
                accessExpireTime,
                refreshExpireTime,
                userId,
                nickname
            } = res;

            setAuth({
                accessToken,
                refreshToken,
                accessExpireTime,
                refreshExpireTime,
                userId,
                nickname
            });

            queryClient.invalidateQueries({ queryKey: MY_KEY });
        },
    });

    return loginMutation
}