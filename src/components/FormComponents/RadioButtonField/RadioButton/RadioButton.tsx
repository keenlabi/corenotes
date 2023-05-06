import Capitalize from "src/utils/capitalize";
import styles from "./radiobutton.module.css";

export default function RadioButton({selected, label, onSelect}:{selected:boolean, label:string, onSelect:()=> void}) {
    return  (
        <div className={styles.radio_button} onClick={()=> onSelect()}>
            <div className={`${styles.radio} ${selected ?styles.selected :null}`}></div>
            <div className={styles.label}>{ Capitalize(label) }</div>
        </div>
    )
}