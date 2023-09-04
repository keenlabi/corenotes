import styles from "./printtextbutton.module.css";

export default function PrintTextButton({ action }:{ action:()=> void }) {
    return (
        <div className={styles.print_text_button} onClick={()=> action()}>
            Print
        </div>
    )
}
