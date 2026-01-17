import AuthLayout from "../core/layout/AuthLayout";
import LoginPage from "../pages/auth/login";
import VoteForm from "../pages/campaign/VoteForm.tsx";
import RegisterPage from "../pages/auth/register";
import TransactionStatisticsPublic from "../pages/campaign/TransactionStatisticsPublic.tsx";

export const AuthRouter = {
    path: "/",
    element:
        <AuthLayout />
    ,
    children: [
        { path: "/login", element: <LoginPage /> },
        { path: "/register", element: <RegisterPage /> },
        { path: "/page/campaign/:id/:voteId", element: <VoteForm/>},
        { path: "/page/campaign/statistics/public/:id", element: <TransactionStatisticsPublic/>},
    ],
};
