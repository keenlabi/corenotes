import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./individualprofile.module.css";
import { useEffect, useState } from "react";
import { useIndividualState } from "src/features/Individual/state";
import { useFetchIndividualSelector } from "src/features/Individual/selector";
import { IndividualProfileType } from "src/features/Individual/types";
import IndividualProfileNavigation from "./IndividualProfileNavigation";

export default function IndividualProfile() {

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
            label: 'Requested services',
            path: 'requested-services',
            active: isCurrentPath('requested-services')
        },
        {
            label: 'Assessments',
            path: 'assessments',
            active: isCurrentPath('assessments')
        },
        {
            label: 'Documents',
            path: 'documents',
            active: isCurrentPath('documents')
        },
        {
            label: 'Reports',
            path: 'reports',
            active: isCurrentPath('reprt')
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

    const [individualState, setIndividualState] = useIndividualState();

    const individualProfileResponse:{
        code:number,
        message:string,
        error: boolean,
        individual:IndividualProfileType

    } = useFetchIndividualSelector(id!)

    useEffect(()=> {
        if(!individualProfileResponse.error) {
            setIndividualState((state)=> {
                return {
                    ...state,
                    status: 'SUCCESS',
                    profile: individualProfileResponse.individual
                }
            })
        } else {
            setIndividualState((state)=> {
                return {
                    ...state,
                    status: 'FAILED',
                    profile: individualProfileResponse.individual
                }
            })
        }
    }, [setIndividualState, individualProfileResponse, individualState.profile])

    return (
        <div className={styles.staff_profile}>
            <div className={styles.heading}>Individual Profile</div>

            <div className={styles.main}>
                <IndividualProfileNavigation 
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