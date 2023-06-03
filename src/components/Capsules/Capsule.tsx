import styles from "./capsule.module.css"

export default function Capsule({
    label, color, backgroundColor, height
}:{label:string, color:string, backgroundColor:string, height:string}) {
    return (
        <div
            className={styles.capsule}
            style={{color, backgroundColor, height}}
            children={label}
        />
    )
}