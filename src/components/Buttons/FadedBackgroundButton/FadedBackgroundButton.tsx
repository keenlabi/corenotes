import TextButton from "../TextButton";
import styles from "./fadedbackgroundbutton.module.css"

export default function FadedBackgroundButton ({
    label, 
    disabled,
    labelColor,
    backgroundColor,
    width,
    isLoading,
    action
}:{label:string, disabled?:boolean, labelColor:string, backgroundColor:string, width?:string, isLoading?:boolean, action: ()=> void}) {
    return (
        <TextButton
            extraStyles={styles.fadedbackgroundbutton}
            disabled={disabled}
            isLoading={isLoading}
            label={label}
            backgroundColor={backgroundColor}
            labelColor={labelColor} 
            width={width}
            onClick={()=> action()}
        />
    )
}