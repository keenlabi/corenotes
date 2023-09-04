import styles from "./info.module.css";
import { ReactComponent as IconInfo } from "src/assets/icons/icon-alert-circle.svg";

export default function Info({message}:{message:string}) {
    return (
        <div className={styles.info}>
            <IconInfo className={styles.info_icon} />
            <div className={styles.message}> { message } </div>
        </div>
    )
}