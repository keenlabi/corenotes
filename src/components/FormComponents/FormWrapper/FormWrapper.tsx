import FormStateModal, { formStateModalType } from "../FormStateModal/FormStateModal"
import styles from "./formwrapper.module.css"

export default function FormWrapper({
    children,
    state,
    resetState,
    extraStyles,
    dontShowSuccess
}:{children:JSX.Element | JSX.Element[], state?:formStateModalType, resetState?:()=> void, dontShowSuccess?:boolean, extraStyles?:string}) {

    return (
        <form className={`${styles.form_container} ${extraStyles}`}>
            {
                state?.message
                ?   <FormStateModal 
                        error={state?.error}
                        message={state?.message}
                        reset={resetState} 
                        status={state.status}
                        dontShowSuccess={dontShowSuccess}
                    />
                :   null
            }

            {children}
        </form>
    )
}