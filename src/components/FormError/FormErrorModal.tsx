import { FaTimes } from "react-icons/fa";
import styles from "./formerror.module.css";
import { formErrorType } from "./types";

export default function FormErrorModal({errorState, setErrorState}:formErrorType) {

    const close = ()=> {
        setErrorState((defaultState:any) => {
            return {
                ...defaultState,
                error: false,
                message: ''
            }
        })
    }

    return(
        <div className={styles.container}>
            {
                (errorState.error)
                ?   <div className={styles.error_modal}>
                        <div className={styles.text}> { errorState.message } </div>
                        <FaTimes onClick={()=> close()} className={styles.close_icon} />
                    </div>
                : null
            }
        </div>
    );
}