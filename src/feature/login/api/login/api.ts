import { axiosInstance } from "@/shared/api/axios"
import type { LoginModel } from "../../model/login-model"

export const loginApi = async (loginData: LoginModel) => {
    const { data } = await axiosInstance.post(`/v1/authentication/sign-in`, loginData);

    return data;
}