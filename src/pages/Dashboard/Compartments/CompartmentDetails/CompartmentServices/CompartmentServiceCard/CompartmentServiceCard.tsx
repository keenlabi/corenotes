import { Link } from "react-router-dom";
import styles from "./compartmentservicecard.module.css";

interface IServiceCardProps {
    serviceId:string;
    title:string;
}

export default function SubcompartmentCard({
    serviceId, 
    title

}:IServiceCardProps) {
    return (
        <Link to={`/dashboard/services/${serviceId}`} className={styles.requested_service_card}>
            <div className={styles.title}>{title}</div>
        </Link>
    )
}