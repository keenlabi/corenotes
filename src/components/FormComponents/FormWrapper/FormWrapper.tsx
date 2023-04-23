import styles from "./formwrapper.module.css"

export default function FormWrapper({
    children,
    extraStyles
}:{children:JSX.Element | JSX.Element[], extraStyles?:string}) {
    return (
        <form className={`${styles.form_container} ${extraStyles}`}>
            {children}
        </form>
    )
}