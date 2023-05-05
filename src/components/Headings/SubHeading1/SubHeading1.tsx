import styles from "./subheading1.module.css";

export default function SubHeading1({text, align}:{text:string, align?:'center'|'left'|'right'}) {
    return (
        <div    
            children={text}
            className={styles.subheading1} 
            style={{textAlign: !align ?"right" : align}}
        />
    )
}