import FormInputError from "../FormInputError";
import styles from "./textfield.module.css";

export default function TextField({
    width, height, placeholder, value, error, onInput
}:{ 
    width?:string, 
    height?:string,
    error?:string,
    placeholder?:string, 
    value?:string, 
    onInput: (textValue:string)=> void 
}) {
    return(
        <div>
            <textarea 
                className={styles.text_field}
                style={{width, height, resize:'none'}}
                placeholder={placeholder}
                value={value}
                onChange={(e)=> onInput?.(e.target.value)}
            />
            <FormInputError message={error!} />
        </div>
    )
}