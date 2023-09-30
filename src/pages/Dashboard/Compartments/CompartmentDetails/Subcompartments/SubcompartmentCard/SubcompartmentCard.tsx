import { Link } from "react-router-dom";
import styles from "./subcompartmentcard.module.css";

interface ISubcompartmentCardProps {
    subCompartmentId:string;
    title:string;
    description:string;
    individualsCount:number;
}

export default function SubcompartmentCard({
    subCompartmentId, 
    title,
    description,
    individualsCount
}:ISubcompartmentCardProps) {
    return (
        <Link to={`/dashboard/services/${subCompartmentId}`} className={styles.requested_service_card}>
            <div className={styles.title}>{title}</div>
            <div className={styles.description}>{description}</div>
            <div className={styles.individual_count}> {individualsCount} individuals </div>
        </Link>
    )
}