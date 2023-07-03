import { Link } from "react-router-dom";
import styles from "./staffrolecard.module.css";

interface IStaffRoleCard {
    id:string;
    title:string;
}

export default function StaffRoleCard({
    title, 

}:IStaffRoleCard) {
    return (
        <Link to={`${title}`} className={styles.requested_service_card}>
            <div className={styles.title}>{title}</div>
        </Link>
    )
}