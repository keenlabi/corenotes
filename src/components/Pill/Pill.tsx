import styles from "./pill.module.css";

export default function Pill({label}:{label:string}) {
    return <div className={styles.pill_container}>{label}</div>
}