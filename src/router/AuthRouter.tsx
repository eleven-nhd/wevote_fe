import AuthLayout from "../core/layout/AuthLayout";
import LoginPage from "../pages/auth/login";

export const AuthRouter = {
    path: "/",
    element: <AuthLayout />,
    children: [
        { path: "/login", element: <LoginPage /> },
        // { path: "/register", element: <RegisterPage /> },
    ],
};
