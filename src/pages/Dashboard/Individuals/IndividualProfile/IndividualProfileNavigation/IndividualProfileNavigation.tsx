import styles from "./individualprofilenavigation.module.css";

interface navItemsType {
    label:string, 
    path:string, 
    active:boolean
}

export default function IndividualProfileNavigation({
    navItems, changeNav 
}:{navItems:navItemsType[], changeNav:(index:number)=> void}) {

    return (
        <div className={styles.individual_profile_header}>
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