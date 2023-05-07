import styles from "./inputfield.module.css";
import FormInputError from "../FormInputError";
import FormLabel from "../FormLabel";
import { useEffect, useState } from "react";

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
    onInput?:(value:string)=> void,
    extraStyles?: string,
    inputWidth?:string,
    inputContainer?:string
}

export default function InputField({
    inputWidth,
    inputContainer,
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

    const [internalType, setInternalType] = useState<string>(type === "date" ?'text' :type!);

    useEffect(()=> setInternalType(type!), [type])
    
    return (
        <div className={`${styles.input_field_container}`} style={{width:inputContainer}}>
            <FormLabel text={label ?? ""} />

            <div 
                className={`${styles.input_component} ${readonly ?styles.disabled :null}`}
            >
                
                {   
                    prefixIcon
                    ?   <div 
                            children={prefixIcon}
                            className={` ${styles.prefix_icon} ${styles.input_icon}`}
                        />
                    :   null
                }

                <input  
                    width={inputWidth}
                    type={internalType}
                    className={`${styles.input}`}
                    placeholder={placeholder}
                    value={value}
                    readOnly={readonly}
                    onFocus={()=> { type === 'date' ?setInternalType('date') :null}}
                    onBlur={()=> { (type === 'date' && !value) ?setInternalType('text') :null}}
                    onChange={(e)=> onInput?.(e.target.value)}
                />

                {   
                    suffixIcon
                    ?   <div 
                            children={suffixIcon}
                            className={` ${styles.suffix_icon} ${styles.input_icon}`}
                            onClick={suffixAction}
                        />
                    :   null
                }
            </div>

            <FormInputError message={error} />
        </div>
    )
}