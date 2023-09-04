import styles from "./forminfo.module.css";
import { ReactComponent as IconInfo } from "src/assets/icons/icon-alert-circle.svg";

export default function FormInfo ({message}:{message:string}) {
    if(!message) return null;
    return (
        <div className={styles.info}>
            <IconInfo className={styles.info_icon} />
            <div className={styles.message}> { message } </div>
        </div>
    );
    
    
}