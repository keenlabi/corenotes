import styles from "./mobilesidebar.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ReactComponent as IconMenu } from "src/assets/icons/icon-menu.svg";
import { ReactComponent as IconClose } from "src/assets/icons/icon-times.svg";
import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton";
import { useAuthStateValue } from "src/features/auth/state";
import logo from "src/assets/images/logo.png";
import ImageComponent from "src/components/ImageComponent";

export default function MobileSidebar(props:{
    extraStyle?:string,
    navOptions:{
        label:string,
        path:string,
        icon?:any,
        activeIcon?:any,
        active:boolean|undefined
    }[],
    isHashLink?:boolean,
    navigateTo?:(optionPosition:number)=> void
}) {

    const authState = useAuthStateValue();

    const [IsDrawerOpen, setIsDrawerOpen] = useState(false);

    const initNav = (navOptionPosition:number)=> {
        setIsDrawerOpen(false)
        props.navigateTo!(navOptionPosition);
    }

    const navigate = useNavigate();

    const location = useLocation()

    return (
        <div className={styles.container}>
            <div className={`${props.extraStyle!} ${styles.header}`}>
                <Link to={"/"}>
                    <div className={styles.mobile_logo_img_wrapper}>
                        <ImageComponent
                            src={logo}
                            width={"100px"}
                            extraStyles={styles.logo_image}
                        />
                    </div>
                </Link>

                {
                    IsDrawerOpen
                    ? <IconClose className={styles.fn_icon} onClick={()=> setIsDrawerOpen(false)} />
                    : <IconMenu className={styles.fn_icon} onClick={()=> setIsDrawerOpen(true)} />
                }
            </div>

            <div className={`
                ${styles.navigation_section}
                ${  
                    IsDrawerOpen
                    ? styles.drawer_open
                    : styles.drawer_close
                }
            `}>
                <div className={styles.navigation_bar}>
                    {
                        props.navOptions.map((navOption, index)=> 
                            <Link 
                                key={index}
                                to={navOption.path}
                                className={`${styles.navigation_item} ${(navOption.active) ?styles.active :null}`}
                                onClick={()=> initNav(index)}
                            >  
                                {
                                    (navOption?.icon) 
                                    ?   (navOption.active) ? <navOption.icon className={styles.nav_icon} /> :<navOption.activeIcon className={styles.nav_icon} />
                                    :   null
                                }
                                <div className={styles.nav_label}> { navOption.label } </div>
                            </Link>
                        )   
                    }
                </div> 
                
                {
                    authState.isSignedIn
                    ?   <div className={styles.user_profile}>
                        {
                            !location.pathname.includes('dashboard')
                            ?   <PrimaryTextButton
                                    label="Go to Dashboard"
                                    clickAction={()=> navigate({pathname: "/dashboard"})} 
                                />
                            :   null
                        }         
                        </div>
                    :   <div className={styles.auth_nav}>
                            <Link to={"/login"} className={styles.navigation_item}>
                                <div className={styles.nav_label}> Login </div>
                            </Link>
                            
                            <PrimaryTextButton
                                label="Create account"
                                clickAction={()=> navigate({ pathname: "/signup" })}
                            />
                        </div>
                }
            </div>
        </div>
    );
}