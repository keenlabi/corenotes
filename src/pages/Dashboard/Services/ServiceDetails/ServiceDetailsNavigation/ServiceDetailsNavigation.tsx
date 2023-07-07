import { useState } from "react";
import styles from "./servicedetailsnavigation.module.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";

interface navItemsType {
    label:string, 
    path:string, 
    active:boolean
}

export default function ServiceDetailsNavigation() {

    const location = useLocation();
    const params = useParams();
    const navigate = useNavigate();

    const [navItems, setNavItems] = useState([
        {
            label: 'Individuals',
            path: 'individuals',
            active: isCurrentPath(params.serviceId!) || isCurrentPath('individuals')
        },
        {
            label: 'Assessments',
            path: 'assessments',
            active: isCurrentPath('assessments')
        },
        {
            label: 'Staffs',
            path: 'staffs',
            active: isCurrentPath('staffs')
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
        <div className={styles.compartment_details_navigation}>
            {
                navItems.map((navItem:navItemsType, index:number)=> {
                    return  <div 
                                key={navItem.label}
                                className={`
                                    ${styles.nav_item}
                                    ${navItem.active ?styles.active :null}
                                `}
                                onClick={()=> changeNav(index)}
                            >
                                { navItem.label }
                            </div>
                })
            }
        </div>
    )
}