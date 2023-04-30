import CircularRingLoader from "src/components/Loaders/CircularRingLoader";
import styles from "./textbutton.module.css"

interface textButtonType {
    type?:"button"|"submit"|"reset",
    width?:string,
    height?:string,
    fontSize?:string,
    label:string,
    isLoading?:boolean,
    loaderColor?:string,
    disabled?:boolean,
    extraStyles?:string,
    onClick:()=> void
}

export default function TextButton({
    type,
    width,
    height,
    fontSize,
    label, 
    isLoading,
    loaderColor, 
    disabled,
    extraStyles,
    onClick
}:textButtonType) {

    return(
        <button
            type={type ?? "button"}
            className={`${styles.button} ${extraStyles}`}
            style={{ width: width ?? "100%", fontSize: fontSize, height:height }}
            onClick={()=> (isLoading) ?null :onClick?.() }
            disabled={disabled}
        >
            {
                (isLoading)
                ?   <div className={styles.loader_wrapper}> 
                        <CircularRingLoader color={loaderColor || "white"} />
                    </div>
                :   label
            }
        </button>
    );
}