import SizedBox from "src/components/SizedBox";
import styles from "./goalservicecard.module.css";

export default function GoalServiceCard({
    objective, method, frequency, time
}:{ objective:string, method:string, frequency:string, time:string }) {
    return  (
        <div className={styles.card}>
            <div className={styles.objective}>{ objective }</div>
            <div className={styles.method}>{ method }</div>
            <SizedBox height="20px" />
            <div className={styles.schedule}>
                <div className={styles.frequency}>{ frequency }</div>
                <div className={styles.time}>{ time }</div>
            </div>
        </div>
    )
}