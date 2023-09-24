import Staffs from "src/pages/Dashboard/Staffs";
import StaffList from "src/pages/Dashboard/Staffs/StaffList";
import StaffProfile from "src/pages/Dashboard/Staffs/StaffProfile";
import StaffActivities from "src/pages/Dashboard/Staffs/StaffProfile/StaffActivities";
import StaffDocuments from "src/pages/Dashboard/Staffs/StaffProfile/StaffDocuments/StaffDocuments";
import StaffProfileInformation from "src/pages/Dashboard/Staffs/StaffProfile/StaffProfileInformation";
import StaffReports from "src/pages/Dashboard/Staffs/StaffProfile/StaffReports";
import StaffSecurity from "src/pages/Dashboard/Staffs/StaffProfile/StaffSecurity/StaffSecurity";
import { routerType } from "../types";
import StaffShiftSchedule from "src/pages/Dashboard/Staffs/StaffProfile/StaffShiftSchedule";

const staffRoutes:routerType = {
    path:'staffs',
    element: <Staffs />,
    allowedRoles:['HR', 'DDP', "ADMINISTRATOR"],
    children: [
        {
            path:'',
            title: 'Staffs',
            element: <StaffList />,
        },
        {
            path:':staffId',
            title: 'Staff Profile',
            element: <StaffProfile />,
            children: [
                {
                    path:'',
                    title: 'Profile Information',
                    element: <StaffProfileInformation />,
                },
                {
                    path:'shifts',
                    title: 'Staff Shifts',
                    element: <StaffShiftSchedule />,
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

export default staffRoutes;