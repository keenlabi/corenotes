import styles from "./modalcontainer.module.css";

export default function ModalContainer({children, close}:{children:JSX.Element, close:()=> void}) {
    return (
        <div className={styles.modal_container}>
            <div className={styles.modal_bg} onClick={()=> close()}></div>
            
            <div className={styles.content_container}>
                { children }
            </div>
        </div>
    );
}