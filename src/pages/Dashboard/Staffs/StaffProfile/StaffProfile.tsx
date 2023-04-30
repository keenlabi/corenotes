import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./staffprofile.module.css";
import { useState } from "react";
import StaffProfileHeader from "./StaffProfileHeader/StaffProfileHeader";

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

    return (
        <div className={styles.staff_profile}>
            <div className={styles.heading}>Staff Profile</div>

            <div className={styles.main}>
                <StaffProfileHeader 
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