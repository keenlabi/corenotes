import styles from "./inputfield.module.css";
import FormInputError from "../FormInputError";
import FormLabel from "../FormLabel";

interface inputFieldType {
    type?:"text" | "number" | "password",
    label?:string,
    placeholder?:string,
    error:string,
    prefixIcon?:JSX.Element,
    suffixIcon?:JSX.Element,
    suffixAction?: ()=> void,
    onInput:(value:string)=> void
}

export default function InputField({
    type,
    label,
    placeholder,
    error,
    prefixIcon,
    suffixIcon,
    suffixAction,
    onInput
}:inputFieldType) {
    return (
        <div className={styles.input_field_container}>
            <FormLabel text={label ?? ""} />

            <div className={styles.input_component}>
                
                <div 
                    children={prefixIcon}
                    className={styles.input_icon}
                />

                <input 
                    type={type ?? "text"}
                    className={styles.input}
                    placeholder={placeholder}
                    onChange={(e)=> onInput(e.target.value)}
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