import FormInputError from "../FormInputError";
import FormLabel from "../FormLabel";
import styles from "./textfield.module.css";

export default function TextField({
    label, width, height, placeholder, value, error, onInput
}:{ 
    label?:string;
    width?:string; 
    height?:string;
    error?:string;
    placeholder?:string; 
    value?:string; 
    onInput: (textValue:string)=> void;
}) {
    return(
        <div>
            <FormLabel text={label!} />
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