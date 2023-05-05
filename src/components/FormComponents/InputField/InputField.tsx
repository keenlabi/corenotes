import styles from "./inputfield.module.css";
import FormInputError from "../FormInputError";
import FormLabel from "../FormLabel";

interface inputFieldType {
    type?:"text" | "number" | "password" | "date",
    label?:string,
    placeholder?:string,
    value:string,
    error:string,
    prefixIcon?:JSX.Element,
    suffixIcon?:JSX.Element,
    suffixAction?: ()=> void,
    readonly?: boolean,
    onInput?:(value:string)=> void
}

export default function InputField({
    type,
    label,
    placeholder,
    value,
    error,
    prefixIcon,
    suffixIcon,
    suffixAction,
    readonly,
    onInput
}:inputFieldType) {
    return (
        <div className={styles.input_field_container}>
            <FormLabel text={label ?? ""} />

            <div 
                className={`${styles.input_component} ${readonly ?styles.disabled :null}`}
            >
                
                <div 
                    children={prefixIcon}
                    className={styles.input_icon}
                />

                <input 
                    type={type ?? "text"}
                    className={`${styles.input}`}
                    placeholder={placeholder}
                    value={value}
                    readOnly={readonly}
                    onChange={(e)=> onInput?.(e.target.value)}
                />

                <div 
                    children={suffixIcon}
                    className={styles.input_icon}
                    onClick={suffixAction}
                />
            </div>

            <FormInputError message={error} />
        </div>
    )
}