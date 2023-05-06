import FormStateModal, { formStateModalType } from "../FormStateModal/FormStateModal"
import styles from "./formwrapper.module.css"

export default function FormWrapper({
    children,
    state,
    resetState,
    extraStyles
}:{children:JSX.Element | JSX.Element[], state?:formStateModalType, resetState?:()=> void, extraStyles?:string}) {

    return (
        <form className={`${styles.form_container} ${extraStyles}`}>
            {
                state?.message
                ?   <FormStateModal 
                        error={state?.error}
                        message={state?.message}
                        reset={resetState} 
                        status={"SUCCESS"}       
                    />
                :   null
            }

            {children}
        </form>
    )
}