import styles from "./formstatemodal.module.css";
import { FaTimes } from "react-icons/fa";
import { ReactComponent as IconAlertCirle } from "src/assets/icons/icon-alert-circle.svg";
 
export interface formStateModalType {
    status:"SUCCESS"|"FAILED"|"IDLE"|"LOADING",
    error: boolean
    message: string,
    reset?: ()=> void,
    dontShowSuccess?: boolean
}

export default function FormStateModal({ status, error, message, reset, dontShowSuccess }:formStateModalType) {
    if(["IDLE", "LOADING"].includes(status)) return null
    if(dontShowSuccess && status === 'SUCCESS') return null
    
    return (
        <div 
            className={`
                ${styles.form_state_modal} 
                ${error ?styles.error_state :styles.success_state}
            `}
        >
            { error ? <IconAlertCirle /> : null }
            <div className={styles.text}> { message } </div>
            <FaTimes onClick={()=> reset?.()} className={styles.close_icon} />
        </div>
    )
}