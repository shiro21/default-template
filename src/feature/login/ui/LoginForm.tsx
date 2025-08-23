import type React from "react";
import { useLogin } from "../hooks/useLogin";
import { useState } from "react";
import type { LoginModel } from "../model/login-model";


interface LoginFormProps {
    onSuccess?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
    
    const { mutateAsync, isPending, error } = useLogin();

    const [values, setValues] = useState<LoginModel>({
        loginId: "",
        password: "",
    });

    /** Field Error */
    const [fieldErr, setFieldErr] = useState<Partial<Record<keyof LoginModel, string>>>({});

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setValues((v) => ({ ...v, [name]: value }));
    };

    const onLogin = async () => {
        setFieldErr({});

        try {
            await mutateAsync(values);
            onSuccess?.();
        } catch (err: any) {
            console.error("ERR", err);
        }
    }

    return (
        <div>
            <div>
                <input
                    name="loginId"
                    type="text"
                    placeholder="로그인"
                    value={values.loginId}
                    onChange={onChange}
                    required
                />
                {fieldErr.loginId && <p style={{ color: "crimson" }}>{fieldErr.loginId}</p>}
            </div>

            <div>
                <input
                    name="password"
                    type="password"
                    placeholder="비밀번호"
                    value={values.password}
                    onChange={onChange}
                    required
                />
                {fieldErr.password && <p style={{ color: "crimson" }}>{fieldErr.password}</p>}
            </div>

            <button type="submit" disabled={isPending} onClick={() => onLogin()}>
                {isPending ? '로그인 중..' : '로그인'}
            </button>

            {error instanceof Error && <p style={{ color: 'crimson' }}>{error.message}</p>}
        </div>
    );
}

export default LoginForm;