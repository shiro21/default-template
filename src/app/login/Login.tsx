import LoginForm from "@/feature/login/ui/LoginForm";
import { useAuthStore } from "@/shared/auth/useAuthStore";
import { Navigate, useLocation, useNavigate } from "react-router-dom";


const Login = () => {

    const nav = useNavigate();
    const loc = useLocation() as any;
    const from = loc.state?.from || "/";
    const { accessToken } = useAuthStore();

    if (accessToken) return <Navigate to={from} replace />

    return (
        <section>
            <h1>로그인</h1>
            <LoginForm onSuccess={() => nav(from, {replace: true })} />
        </section>
    );
}

export default Login;
