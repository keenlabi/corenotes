import styles from "./dashboard.module.css";
import { Suspense, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "src/components/Navigation/Sidebar/sidebar";
import {ReactComponent as iconOverview} from "src/assets/icons/icon-home.svg";
import {ReactComponent as iconBriefcase} from "src/assets/icons/icon-briefcase.svg";
import {ReactComponent as iconUsers} from "src/assets/icons/icon-users.svg";
import {ReactComponent as iconFlag} from "src/assets/icons/icon-flag.svg";
import {ReactComponent as iconSettings} from "src/assets/icons/icon-setting.svg";
import { NavOptionsType } from "src/components/Navigation/types.ts";
import ComponentLoader from "src/components/Loaders/ComponentLoader";

export default function Dashboard() {

    const location = useLocation();

    const isCurrentNav = (path:string[])=> {
        const allDir = location.pathname.substring(1, location.pathname.length).split('/');
        const firstTwoDirMax = (allDir.length > 1) ? `/${allDir[0]}/${allDir[1]}` :`/${allDir[0]}`

        if(path.includes(firstTwoDirMax)) return true;
        else return false;
    }

    const [NavOptions, setNavOptions] = useState<NavOptionsType[]>([
        {
            label: "overview",
            pageTitle: "overview",
            pageSubtitle: "",
            path: "/dashboard",
            icon: iconOverview,
            activeIcon: iconOverview,
            active: isCurrentNav(['/dashboard', '/dashboard/'])
        },
        {
            label: "staffs",
            pageTitle: "staffs",
            pageSubtitle: "",
            path: "/dashboard/staffs",    
            icon: iconBriefcase,
            activeIcon: iconBriefcase,
            active: isCurrentNav(['/dashboard/staffs'])
        },
        {
            label: "individuals",
            pageTitle: "individuals",
            pageSubtitle: "",
            path: "/dashboard/individuals",
            icon: iconUsers,
            activeIcon: iconUsers,
            active: isCurrentNav(['/dashboard/individuals'])
        },
        {
            label: "Compartments",
            pageTitle: "Compartments",
            pageSubtitle: "",
            path: "/dashboard/compartments",
            icon: iconFlag,
            activeIcon: iconFlag,
            active: isCurrentNav(['/dashboard/compartments'])
        },
        {
            label: "Settings",
            pageTitle: "settings",
            pageSubtitle: "",
            path: "/dashboard/settings",    
            icon: iconSettings,
            activeIcon: iconSettings,
            active: isCurrentNav(['/dashboard/settings'])
        }
    ]);

    const [activeNavPosition, setActiveNavPosition] = useState(0);

    useEffect(()=> {
        const setActiveNav = (optionPosition:number)=> {
            setNavOptions((navOptions:any)=> {
                return [...navOptions.map((navOption:NavOptionsType, index:number)=> {
                    return (optionPosition)
                    ?   (index === optionPosition)
                        ? { ...navOption, active: true }
                        : { ...navOption, active:false }

                    :   (
                            [navOption.path, `${navOption.path}/`].includes(location.pathname)
                            || navOption.path === `/${location.pathname.split('/')[1]}/${location.pathname.split('/')[2]}`
                        )
                        ? { ...navOption, active: true }
                        : { ...navOption, active:false }

                })
            ]
            });
        }

        setActiveNav(activeNavPosition)

    }, [activeNavPosition, location])

        return (
            <div className={styles.body}>
                <Sidebar 
                    navOptions={NavOptions} 
                    navigateTo={setActiveNavPosition} 
                />
                
                <div className={styles.main}>
                    <Suspense fallback={<ComponentLoader />}>
                        <Outlet />
                    </Suspense>
                </div>
            </div>
        )
}