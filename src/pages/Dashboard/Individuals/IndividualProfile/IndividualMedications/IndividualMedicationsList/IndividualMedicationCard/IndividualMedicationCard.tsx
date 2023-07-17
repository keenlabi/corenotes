import styles from "./individualmedicationcard.module.css"

interface IIndividualMedicationCardProps {
    name:string;
    frequency:string;
    time:string;
    strength:string;
    amount:{
        allocated:number;
        current:number;
        administered:number;
    };
    action:()=> void
}

export default function IndividualMedicationCard({
    name, 
    strength,
    frequency,
    time,
    amount,
    action
}:IIndividualMedicationCardProps) {

    return (
        <div className={styles.medication_service_card} onClick={action}>
            <div className={styles.title}>{ name + ' (' + strength +')' }</div>

            <div className={styles.dets}>
                <div className={styles.schedule}>
                    <div className={styles.time}>{ time }</div>
                    <div className={styles.frequency}>{ frequency }</div>
                </div>

                <div className={styles.pills_count}>
                    <div className={styles.administered}>
                        <div className={styles.digit}>{amount.administered}</div>
                        <div className={styles.label}>Taken</div>
                    </div>

                    <div className={styles.current}>
                        <div className={styles.digit}>{amount.current}</div>
                        <div className={styles.label}>Left</div>
                    </div>
                </div>
            </div>
        </div>
    )
}