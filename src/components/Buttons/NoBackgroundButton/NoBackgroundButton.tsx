import styles from "./nobackgroundbutton.module.css"
import TextButton from "../TextButton";

interface PrimaryTextButtonType {
    width?:string,
    height?:string,
    fontSize?: string,
    extraStyle?:string,
    type?:"button"|"submit"|"reset",
    label:string, 
    isLoading?:boolean, 
    loaderColor?:string, 
    disabled?:boolean,
    clickAction: ()=> void
}

export default function NoBackgroundButton({
    width,
    height,
    fontSize,
    type,
    label,
    isLoading,
    disabled,
    clickAction
}:PrimaryTextButtonType) {
    return  <TextButton
                extraStyles={styles.no_background_button}
                type={type}
                width={width}
                height={height}
                fontSize={fontSize}
                label={label}
                isLoading={isLoading}
                disabled={disabled} 
                onClick={clickAction}        
            />
}