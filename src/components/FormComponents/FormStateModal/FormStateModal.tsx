import styles from "./formstatemodal.module.css";
import { FaTimes } from "react-icons/fa";
import { ReactComponent as IconAlertCirle } from "src/assets/icons/icon-alert-circle.svg";
 
export interface formStateModalType {
    isError: boolean
    message: string
}

export default function FormStateModal({ isError, message }:formStateModalType) {
    return (
        <div 
            className={`
                ${styles.form_state_modal} 
                ${isError ?styles.error_state :styles.success_state}
            `}
        >
            { isError ? <IconAlertCirle /> : null }
            <div className={styles.text}> { message } </div>
            <FaTimes onClick={()=> close()} className={styles.close_icon} />
        </div>
    )
}