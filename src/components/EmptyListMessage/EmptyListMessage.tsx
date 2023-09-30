import styles from "./emptylistmessage.module.css";

export default function EmptyListMessage({ message }:{ message:string }) {
    return (
        <div className={styles.empty_message_list}>
            { message }
        </div>
    )
}