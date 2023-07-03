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
import CompartmentRequestedServiceOutlet from "src/pages/Dashboard/Compartments/CompartmentDetails/RequestedServicesList/CompartmentRequestedServiceOutlet";
import CompartmentDetailsOutlet from "src/pages/Dashboard/Compartments/CompartmentDetails/CompartmentDetailsOutlet";
import RequestedServiceDetails from "src/pages/Dashboard/Compartments/CompartmentDetails/RequestedServiceDetails";
import IndividualServices from "src/pages/Dashboard/Individuals/IndividualProfile/IndividualServices/IndividualServices";
import AdministrationOutlet from "src/pages/Dashboard/Administration/AdministrationOutlet";
import StaffRolesList from "src/pages/Dashboard/Administration/StaffRolesList";

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
                                path:'requested-services',
                                title: 'Requested Services',
                                element: <IndividualServices />,
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
                        element: <CompartmentDetailsOutlet />,
                        children: [
                            {
                                path:'services',
                                title: 'Compartment Services List',
                                element: <CompartmentRequestedServiceOutlet />,
                                children: [
                                    {
                                        path:'',
                                        title: 'Compartment Services',
                                        element: <CompartmentDetails />
                                    },
                                    {
                                        path:':serviceId',
                                        title: 'Compartment Service Details',
                                        element: <RequestedServiceDetails />,
                                        children: [
                                            {
                                                path:'individuals',
                                                title: 'Compartment Individuals',
                                                element: <div />
                                            },
                                            {
                                                path:'assessments',
                                                title: 'Comparment Assessments',
                                                element: <div />,
                                            },
                                            {
                                                path:'staffs',
                                                title: 'Compartment Staffs',
                                                element: <div />
                                            }
                                        ]
                                    },
                                ]
                            },
                        ]
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
                    },
                ]
            },
            {
                path:'administration',
                element: <AdministrationOutlet />,
                children: [
                    {
                        path:'',
                        title: 'Service Details',
                        element: <StaffRolesList />,
                    },
                ]
            },
        ]
    },
]

export default DashboardRoutes;