import { createBrowserRouter } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";


export const router = createBrowserRouter([
    /** RootLayout */
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                lazy: async () => ({ Component: (await import("@/app/Home")).default }),
            }
        ]
    },

    /** 공개 Router */
    {
        path: "login",
        lazy: async () => ({ Component: (await import('@/app/login/Login')).default }),
    },
    {
        path: "login",
        lazy: async () => ({ Component: (await import('@/app/register/Register')).default }),
    },


])