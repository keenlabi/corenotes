import styles from "./medicationservicecard.module.css"

interface IMedicationServiceCardProps {
    title:string;
    description:string;
    individualsCount:number;
    action:()=> void
}

export default function MedicationServiceCard({
    title, 
    individualsCount,
    action
}:IMedicationServiceCardProps) {

    return (
        <div className={styles.medication_service_card} onClick={action}>
            <div className={styles.title}>{title}</div>
            <div className={styles.individual_count}> {individualsCount} individuals </div>
        </div>
    )
}