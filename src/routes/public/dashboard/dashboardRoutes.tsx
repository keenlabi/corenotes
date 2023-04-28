import { routerType } from "src/routes/types";
import Dashboard from "src/pages/Dashboard";

const DashboardRoutes:routerType[] = [
    {
        path:'/dashboard',
        title: 'Dashboard',
        element: <Dashboard />
    }
]

export default DashboardRoutes;