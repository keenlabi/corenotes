import styles from "./passwordinputfield.module.css";
import { FaEye } from "react-icons/fa";
import { useState } from "react";
import InputField from "../InputField";
import {ReactComponent as IconLock} from "src/assets/icons/icon-lock.svg"
import {ReactComponent as IconEyeSlash} from "src/assets/icons/icon-eye-slash.svg"
import { formFieldType } from "../../FormWrapper/types";

interface passwordInputFieldType {
    label?:string,
    error:string,
    placeholder?:string,
    onInput: (value:string)=> void
}

export default function PasswordInputField({
    label, 
    error, 
    placeholder,
    onInput
}:passwordInputFieldType) {

    const [passwordModel, setPasswordModel] = useState<formFieldType>({
        type: "password",
        label: label,
        placeholder: placeholder ?? "Password",
        error: error,
        prefixIcon: <IconLock />,
        suffixIcon: <IconEyeSlash />,
        suffixIconAlt: <FaEye className="font-icon" />,
        validated: false
    });

    const togglePasswordVisibility = ()=> {
        passwordModel.type = (passwordModel.type === 'password') ?'text' :'password';
        [passwordModel.suffixIcon, passwordModel.suffixIconAlt] = [passwordModel.suffixIconAlt, passwordModel.suffixIcon]
        setPasswordModel({...passwordModel});
    }

    return (
        <div className={styles.container}>
            <InputField 
                type={passwordModel.type}
                label={passwordModel.label}
                placeholder={passwordModel.placeholder}
                error={error}
                prefixIcon={passwordModel.prefixIcon}
                suffixIcon={passwordModel.suffixIcon}
                suffixAction={ ()=> togglePasswordVisibility() }
                onInput={onInput} 
            />
        </div>
    );
}