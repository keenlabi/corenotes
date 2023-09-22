import styles from "./globaleventfeedback.module.css";
import { ReactComponent as IconCancelCircle } from "src/assets/icons/icon-cancel-circle.svg";

export default function GlobalEventFeedback({ status, message, close }:{status:string; message:string, close:()=> void}) {
    return (
        <div className={`
            ${styles.global_event_feedback} 
            ${status === "SUCCESS" ?styles.success_state :styles.error_state}`
        }>
            <div className={styles.message}>{ message }</div>
            <IconCancelCircle
                className={styles.close_icon}
                onClick={()=> close()}
            />
        </div>
    )
}