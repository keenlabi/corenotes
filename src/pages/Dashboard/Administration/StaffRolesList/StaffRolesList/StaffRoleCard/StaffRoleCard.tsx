import { Link } from "react-router-dom";
import styles from "./staffrolecard.module.css";

interface IStaffRoleCard {
    id:string;
    title:string;
    staffCount:number;
}

export default function StaffRoleCard({
    id,
    title, 
    staffCount

}:IStaffRoleCard) {
    return (
        <Link to={`${id}`} className={styles.requested_service_card}>
            <div className={styles.title}>{title}</div>
            <div className={styles.count}>{ staffCount } Staff { staffCount > 1 ?'s' :'' } </div>
        </Link>
    )
}