import { Link } from "react-router-dom";
import styles from "./compartmentservicecard.module.css";

interface ICompartmentServiceCardProps {
    serviceId:number;
    title:string;
    description:string;
    individualsCount:number;
}

export default function CompartmentServiceCard({
    serviceId, 
    title, 
    description,
    individualsCount
}:ICompartmentServiceCardProps) {
    return (
        <Link to={`/dashboard/services/${serviceId}`} className={styles.requested_service_card}>
            <div className={styles.title}>{title}</div>
            <div className={styles.individual_count}> {individualsCount} individuals </div>
        </Link>
    )
}