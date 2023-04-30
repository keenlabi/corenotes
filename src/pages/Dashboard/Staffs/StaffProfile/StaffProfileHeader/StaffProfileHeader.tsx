import styles from "./staffprofileheader.module.css";

interface navItemsType {
    label:string, 
    path:string, 
    active:boolean
}

export default function StaffProfileHeader ({ 
    navItems, 
    changeNav 
}:{navItems:navItemsType[], changeNav:(index:number)=> void}) {

    return (
        <div className={styles.staff_profile_header}>
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
    );
}