import SizedBox from "src/components/SizedBox";
import styles from "./behaviormanagementservicecard.module.css";

export default function BehaviorManagementServiceCard({
    description, frequency, time
}:{ description:string, frequency:string, time:string }) {
    return  (
        <div className={styles.card}>
            <div className={styles.objective}>{ description }</div>
            <SizedBox height="20px" />
            <div className={styles.schedule}>
                <div className={styles.frequency}>{ frequency }</div>
                <div className={styles.time}>{ time }</div>
            </div>
        </div>
    )
}