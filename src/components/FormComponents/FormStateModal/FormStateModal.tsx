import styles from "./formstatemodal.module.css";
import { FaTimes } from "react-icons/fa";
import { ReactComponent as IconAlertCirle } from "src/assets/icons/icon-alert-circle.svg";
 
export interface formStateModalType {
    state:"SUCCESS"|"FAILED"|"IDLE"|"LOADING",
    isError: boolean
    message: string,
    reset?: ()=> void,
    showSuccess?: boolean
}

export default function FormStateModal({ state, isError, message, reset, showSuccess }:formStateModalType) {
    if(["IDLE", "LOADING"].includes(state)) return null
    if(!showSuccess) if(["SUCCESS"].includes(state)) return null
    return (
        <div 
            className={`
                ${styles.form_state_modal} 
                ${isError ?styles.error_state :styles.success_state}
            `}
        >
            { isError ? <IconAlertCirle /> : null }
            <div className={styles.text}> { message } </div>
            <FaTimes onClick={()=> reset?.()} className={styles.close_icon} />
        </div>
    )
}