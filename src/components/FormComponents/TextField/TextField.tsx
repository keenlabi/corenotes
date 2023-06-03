import styles from "./textfield.module.css";

export default function TextField({
    width, height, placeholder, value, onInput
}:{width?:string, height?:string, placeholder?:string, value?:string, onInput: (textValue:string)=> void}) {
    return(
        <textarea 
            className={styles.text_field}
            style={{width, height}}
            placeholder={placeholder}
            value={value}
            onChange={(e)=> onInput?.(e.target.value)}
        />
    )
}