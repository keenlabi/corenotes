import { Link } from "react-router-dom";
import styles from "./requestedservicecard.module.css";

interface IRequestedServiceCardProps {
    serviceId:number;
    title:string;
    description:string;
    individualsCount:number;
}

export default function RequestedServiceCard({
    serviceId, 
    title, 
    description,
    individualsCount
}:IRequestedServiceCardProps) {
    return (
        <Link to={`${serviceId}`} className={styles.requested_service_card}>
            <div className={styles.title}>{title}</div>
            <div className={styles.desc}>
                { description }
                {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. */}
            </div>

            <div className={styles.individual_count}> {individualsCount} individuals </div>
        </Link>
    )
}