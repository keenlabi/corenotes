import { routerType } from "src/routes/types";
import Dashboard from "src/pages/Dashboard";
import Staffs from "src/pages/Dashboard/Staffs";
import StaffList from "src/pages/Dashboard/Staffs/StaffList";
import StaffProfile from "src/pages/Dashboard/Staffs/StaffProfile";
import StaffProfileInformation from "src/pages/Dashboard/Staffs/StaffProfile/StaffProfileInformation";
import StaffDocuments from "src/pages/Dashboard/Staffs/StaffProfile/StaffDocuments/StaffDocuments";
import StaffActivities from "src/pages/Dashboard/Staffs/StaffProfile/StaffActivities";
import StaffReports from "src/pages/Dashboard/Staffs/StaffProfile/StaffReports";
import StaffSecurity from "src/pages/Dashboard/Staffs/StaffProfile/StaffSecurity/StaffSecurity";

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
                        children: [
                            {
                                path:'',
                                title: 'Profile Information',
                                element: <StaffProfileInformation />,
                            },
                            {
                                path:'documents',
                                title: 'Documents',
                                element: <StaffDocuments />,
                            },
                            {
                                path:'activities',
                                title: 'Activities',
                                element: <StaffActivities />,
                            },
                            {
                                path:'reports',
                                title: 'Reports',
                                element: <StaffReports />,
                            },
                            {
                                path:'security',
                                title: 'Security',
                                element: <StaffSecurity />,
                            }
                        ]
                    }
                ]
            }
        ]
    },
]

export default DashboardRoutes;