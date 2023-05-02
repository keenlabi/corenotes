import TextButton from "../TextButton";
import styles from "./fadedbackgroundbutton.module.css"

export default function FadedBackgroundButton ({
    label, 
    labelColor,
    backgroundColor,
    width,
    action
}:{label:string, labelColor:string, backgroundColor:string, width?:string, action: ()=> void}) {
    return (
        <TextButton
            extraStyles={styles.fadedbackgroundbutton}
            label={label}
            backgroundColor={backgroundColor}
            labelColor={labelColor} 
            width={width}
            onClick={()=> action()}
        />
    )
}