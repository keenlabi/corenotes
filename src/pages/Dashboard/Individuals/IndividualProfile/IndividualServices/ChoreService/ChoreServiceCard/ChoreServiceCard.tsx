import styles from "./choreservicecard.module.css";

export default function BehaviorManagementServiceCard({
    description, frequency, time
}:{ description:string, frequency:string, time:Array<string> }) {
    return  (
        <div className={styles.card}>
            <div className={styles.objective}>{ description }</div>

            <div className={styles.schedule}>
                <div className={styles.frequency}>{ frequency }</div>
                {
                    time.map((timeItem)=> (
                        <div key={timeItem} className={styles.time}>{ timeItem }</div>
                    )) 
                }
            </div>
        </div>
    )
}