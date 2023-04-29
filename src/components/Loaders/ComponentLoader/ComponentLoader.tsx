import styles from "./componentloader.module.css";

export default function ComponentLoader() {
    return(
        <div className={styles.container}>
            <span className={styles.loader}></span>
        </div>
    )
}