import styles from "./heading1.module.css";

export default function Heading1({text, align}:{text:string, align?:'center'|'left'|'right'}) {
    return (
        <div    
            children={text}
            className={styles.heading1} 
            style={{textAlign: !align ?"right" : align}}
        />
    )
}