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
import Compartments from "src/pages/Dashboard/Compartments/Compartments";
import CompartmentsList from "src/pages/Dashboard/Compartments/CompartmentsList";
import Services from "src/pages/Dashboard/Services/Services";
import ServiceDetails from "src/pages/Dashboard/Services/ServiceDetails";
import CompartmentDetails from "src/pages/Dashboard/Compartments/CompartmentDetails";
import IndividualServices from "src/pages/Dashboard/Individuals/IndividualProfile/IndividualServices/IndividualServices";
import AdministrationOutlet from "src/pages/Dashboard/Administration/AdministrationOutlet";
import StaffRolesList from "src/pages/Dashboard/Administration/StaffRolesList";
import StaffRoleDetails from "src/pages/Dashboard/Administration/StaffRoleDetails";
import ServiceIndividuals from "src/pages/Dashboard/Services/ServiceDetails/ServiceIndividuals/ServiceIndividuals";

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
                allowedRoles:['HR', 'DDP'],
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
                allowedRoles:['DDP', 'ADMIN'],
                children: [
                    {
                        path:'',
                        title: 'Individual List',
                        element: <IndividualsList />,
                    },
                    {
                        path:':individualId',
                        title: 'Individual profile',
                        element: <IndividualProfile />,
                        children: [
                            {
                                path:'',
                                title: 'Profile Information',
                                element: <IndividualProfileInformation />,
                            },
                            {
                                path:'services',
                                title: 'Services',
                                element: <IndividualServices />,
                            },
                            {
                                path:'assessments',
                                title: 'Assessments',
                                element: <IndividualAssessments />,
                            },
                            {
                                path:'documents',
                                title: 'Documents',
                                element: <div />,
                            },
                            {
                                path:'reports',
                                title: 'Reports',
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
            },
            {
                path:'compartments',
                element: <Compartments />,
                children: [
                    {
                        path:'',
                        title: 'Compartment list',
                        element: <CompartmentsList />,
                    },
                    {
                        path:':compartmentId',
                        title: 'Compartment Details',
                        element: <CompartmentDetails />
                    }
                ]
            },
            {
                path:'services',
                element: <Services />,
                children: [
                    {
                        path:':serviceId',
                        title: 'Service Details',
                        element: <ServiceDetails />,
                        children: [
                            {
                                path:'',
                                title: 'Service Individuals',
                                element: <ServiceIndividuals />,
                            },
                            {
                                path:'individuals',
                                title: 'Service Individuals',
                                element: <ServiceIndividuals />,
                            },
                            {
                                path:'staffs',
                                title: 'Service Staffs',
                                element: <div />,
                            },
                            {
                                path:'assessments',
                                title: 'Service Assessments',
                                element: <div />,
                            },
                        ]
                    },
                ]
            },
            {
                path:'administration',
                element: <AdministrationOutlet />,
                allowedRoles:['HR', 'DDP'],
                children: [
                    {
                        path:'',
                        title: 'Administration Roles',
                        element: <StaffRolesList />,
                    },
                    {
                        path: ':roleId',
                        title: 'Role Details',
                        element: <StaffRoleDetails />
                    }
                ]
            },
        ]
    },
]

export default DashboardRoutes;