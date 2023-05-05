import styles from "./formlabel.module.css"

export default function FormLabel({text}:{text:string}) {
    return (
        <div 
            children={text}
            className={styles.form_label}
        />
    )
}