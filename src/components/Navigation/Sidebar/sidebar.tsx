import logo from "src/assets/images/logo-with-name.png";
import { Link } from "react-router-dom";
import styles from "./sidebar.module.css";
import {sideBarNavOptionsType} from "./types";
import ImageComponent from "src/components/ImageComponent";

export default function Sidebar({ navOptions, navigateTo }: sideBarNavOptionsType) {

    return (
        <div className={styles.sidebar}>
            <ImageComponent
                src={logo}
                width={"100px"}
                extraStyles={styles.logo_image}
            />

            <div className={styles.navigation_section}>
                <div className={styles.navigation_bar}>
                    {
                        navOptions.map((navOption, index)=> 
                            <Link 
                                key={index}
                                to={navOption.path}
                                className={`${styles.navigation_item} ${(navOption.active) ?styles.active :null}`}
                                onClick={()=> navigateTo(index)}
                            >
                                    {(navOption.active) ? <navOption.icon className={styles.nav_icon} /> :<navOption.activeIcon className={styles.nav_icon} />}
                                    <div className={styles.nav_label}> <span>{ navOption.label }</span> </div>
                            </Link>
                        )
                    }
                </div> 
            </div>
        </div>
    );
}