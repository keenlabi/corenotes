import { routerType } from "src/routes/types";
import Dashboard from "src/pages/Dashboard";
import Staffs from "src/pages/Dashboard/Staffs";
import StaffList from "src/pages/Dashboard/Staffs/StaffList";
import Individuals from "src/pages/Dashboard/Individuals";
import IndividualsList from "src/pages/Dashboard/Individuals/IndividualsList";
import StaffProfile from "src/pages/Dashboard/Staffs/StaffProfile";
import StaffProfileInformation from "src/pages/Dashboard/Staffs/StaffProfile/StaffProfileInformation";
import StaffDocuments from "src/pages/Dashboard/Staffs/StaffProfile/StaffDocuments/StaffDocuments";
import StaffActivities from "src/pages/Dashboard/Staffs/StaffProfile/StaffActivities";
import StaffReports from "src/pages/Dashboard/Staffs/StaffProfile/StaffReports";
import StaffSecurity from "src/pages/Dashboard/Staffs/StaffProfile/StaffSecurity/StaffSecurity";
import IndividualProfile from "src/pages/Dashboard/Individuals/IndividualProfile";
import IndividualProfileInformation from "src/pages/Dashboard/Individuals/IndividualProfile/IndividualProfileInformation";
import IndividualAssessments from "src/pages/Dashboard/Individuals/IndividualProfile/IndividualAssesments";
import Assessments from "src/pages/Dashboard/Assessments/Assessments";
import CreateAssessment from "src/pages/Dashboard/Assessments/CreateAssessment/CreateAssessment";

const DashboardRoutes:routerType[] = [
    {
        path:'/dashboard',
        title: 'Dashboard',
        protected: true,
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
            },
            {
                path:'individuals',
                element: <Individuals />,
                children: [
                    {
                        path:'',
                        title: 'Individual List',
                        element: <IndividualsList />,
                    },
                    {
                        path:':id',
                        title: 'Individual profile',
                        element: <IndividualProfile />,
                        children: [
                            {
                                path:'',
                                title: 'Profile Information',
                                element: <IndividualProfileInformation />,
                            },
                            {
                                path:'requested-services',
                                title: '',
                                element: <div></div>,
                            },
                            {
                                path:'assessments',
                                title: '',
                                element: <IndividualAssessments />,
                            },
                            {
                                path:'documents',
                                title: '',
                                element: <div />,
                            },
                            {
                                path:'reports',
                                title: '',
                                element: <div />,
                            },
                        ]
                    },
                    {
                        path:'assessments',
                        title: 'Assessments',
                        element: <Assessments />,
                        children: [
                            {
                                path:'create',
                                title: 'Create Assessment',
                                element: <CreateAssessment />,
                            },
                        ]
                    },
                ]
            }
        ]
    },
]

export default DashboardRoutes;