import MainLayout from "../core/layout/MainLayout";
import DashboardPage from "../pages/dashboard";
import RolePage from "../pages/admin/role";
import PrivateRoute from "./ProtectedRouter.tsx";
import UserPage from "../pages/admin/user";
import VotePage from "../pages/vote";
import CampaignPage from "../pages/campaign";
import ListVoteByCampaign from "../pages/campaign/VotesByCampaign.tsx";

export const MainRouter = {
    path: "/page",
    element: (
        <PrivateRoute>
            <MainLayout />
        </PrivateRoute>
    ),
    children: [
        { path: "/page/dashboard", element: <DashboardPage /> },
        { path: "/page/role", element: <RolePage /> },
        { path: "/page/user", element: <UserPage /> },
        { path: "/page/vote", element: <VotePage /> },
        { path: "/page/campaign", element: <CampaignPage /> },
        { path: "/page/campaign/:id", element: <ListVoteByCampaign/>},
    ],
};