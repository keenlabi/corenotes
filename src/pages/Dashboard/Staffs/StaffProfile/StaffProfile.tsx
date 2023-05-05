import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./staffprofile.module.css";
import { useEffect, useState } from "react";
import StaffProfileNavigation from "./StaffProfileNavigation/StaffProfileNavigation";
import { useStaffState } from "src/features/staff/state";
import { staffDetailsType } from "src/features/staff/utils/formatStaff";
import { useFetchStaffSelector } from "src/features/staff/selector";

export default function StaffProfile() {

    const location = useLocation();
    const params = useParams();
    const navigate = useNavigate();
    
    const [navItems, setNavItems] = useState([
        {
            label: 'Profile Information',
            path: '',
            active: isCurrentPath('')
        },
        {
            label: 'Documents',
            path: 'documents',
            active: isCurrentPath('documents')
        },
        {
            label: 'Activities',
            path: 'activities',
            active: isCurrentPath('activities')
        },
        {
            label: 'Reports',
            path: 'reports',
            active: isCurrentPath('reports')
        },
        {
            label: 'Security',
            path: 'security',
            active: isCurrentPath('security')
        }
    ])

    function isCurrentPath(activePath:string) {
        const locationWithoutTrailingSLash:string = location.pathname.replace(/\/+$/, "");
        const allPaths:string[] = locationWithoutTrailingSLash.split('/')

        const currentPath:string = allPaths[allPaths.length-1];

        if(currentPath === activePath) return true
        if(!activePath) return params.id === currentPath

        return false
    }

    function changeNav(index:number) {
        navItems.forEach(navItem => navItem.active = false);
        navItems[index].active = true;
        
        try {
            setNavItems([...navItems]);
        }
        finally {
            navigate({pathname: navItems[index].path});
        }
    }

    const { id } = useParams();

    const [staffState, setStaffState] = useStaffState();

    const staffDetailsResponse:{
        code:number,
        message:string,
        error: boolean,
        staff:staffDetailsType

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = useFetchStaffSelector(id!)

    useEffect(()=> {
        if(!staffDetailsResponse.error) {
            setStaffState((state)=> {
                return {
                    ...state,
                    status: 'SUCCESS',
                    details: staffDetailsResponse.staff
                }
            })
        } else {
            setStaffState((state)=> {
                return {
                    ...state,
                    status: 'FAILED',
                    details: staffDetailsResponse.staff
                }
            })
        }
    }, [setStaffState, staffDetailsResponse, staffState.details])

    return (
        <div className={styles.staff_profile}>
            <div className={styles.heading}>Staff Profile</div>

            <div className={styles.main}>
                <StaffProfileNavigation 
                    navItems={navItems} 
                    changeNav={(index:number)=> changeNav(index)}  
                />

                <div className={styles.content}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}