import FormStateModal, { formStateModalType } from "../FormStateModal/FormStateModal"
import styles from "./formwrapper.module.css"

export default function FormWrapper({
    children,
    state,
    extraStyles
}:{children:JSX.Element | JSX.Element[], state:formStateModalType, extraStyles?:string}) {
    return (
        <form className={`${styles.form_container} ${extraStyles}`}>
            {   
                state.message
                ?   <FormStateModal 
                        isError={state.isError} 
                        message={state.message} 
                    />
                :   null
            }

            {children}
        </form>
    )
}