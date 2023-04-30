import { routerType } from "src/routes/types";
import Dashboard from "src/pages/Dashboard";
import Staffs from "src/pages/Dashboard/Staffs";
import StaffList from "src/pages/Dashboard/Staffs/StaffList";
import StaffProfile from "src/pages/Dashboard/Staffs/StaffProfile";

const DashboardRoutes:routerType[] = [
    {
        path:'/dashboard',
        title: 'Dashboard',
        element: <Dashboard />,
        children: [
            {
                path:'staffs',
                element: <Staffs />,
                children: [
                    {
                        path:'',
                        title: 'Staffs',
                        element: <StaffList />,
                    },
                    {
                        path:':id',
                        title: 'Staff Profile',
                        element: <StaffProfile />,
                    }
                ]
            }
        ]
    },
]

export default DashboardRoutes;