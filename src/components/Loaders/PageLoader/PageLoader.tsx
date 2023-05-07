import styles from "./pageloader.module.css";

export default function PageLoader() {
    return (
        <div className={styles.container}>
            <span className={styles.loader}></span>
        </div>
    );
}