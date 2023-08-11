import SizedBox from "src/components/SizedBox";
import styles from "./dailylivingactivityservicecard.module.css";

export default function GoalServiceCard({
    title, frequency, time
}:{ title:string, frequency:string, time:string }) {
    return  (
        <div className={styles.card}>
            <div className={styles.objective}>{ title }</div>
            <SizedBox height="20px" />
            <div className={styles.schedule}>
                <div className={styles.frequency}>{ frequency }</div>
                <div className={styles.time}>{ time }</div>
            </div>
        </div>
    )
}