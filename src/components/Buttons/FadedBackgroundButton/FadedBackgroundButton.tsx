import TextButton from "../TextButton";
import styles from "./fadedbackgroundbutton.module.css"

export default function FadedBackgroundButton ({
    label, 
    disabled,
    labelColor,
    backgroundColor,
    width,
    action
}:{label:string, disabled?:boolean, labelColor:string, backgroundColor:string, width?:string, action: ()=> void}) {
    return (
        <TextButton
            extraStyles={styles.fadedbackgroundbutton}
            disabled={disabled}
            label={label}
            backgroundColor={backgroundColor}
            labelColor={labelColor} 
            width={width}
            onClick={()=> action()}
        />
    )
}