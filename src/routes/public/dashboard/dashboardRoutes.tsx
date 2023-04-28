import { routerType } from "src/routes/types";
import Dashboard from "src/pages/Dashboard";
import Staffs from "src/pages/Dashboard/Staffs";

const DashboardRoutes:routerType[] = [
    {
        path:'/dashboard',
        title: 'Dashboard',
        element: <Dashboard />,
        children: [
            {
                path:'staffs',
                title: 'Staffs',
                element: <Staffs />
            }
        ]
    },
]

export default DashboardRoutes;