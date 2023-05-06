import { useState } from "react";
import styles from "./deactivatestaff.module.css";
import { formFieldType, setFormFieldType } from "src/components/FormComponents/FormWrapper/types";
import PasswordInputField from "src/components/FormComponents/InputField/PasswordInputField";
import FadedBackgroundButton from "src/components/Buttons/FadedBackgroundButton";

export default function DeactivateStaff() {
    
    const [userPassword, setUserPassword] = useState<formFieldType>({
        type:'password',
        label:'Enter password',
        placeholder: 'Enter Password',
        value: '',
        error: '',
        validated: false
    })
    
    function setInput(value:string, inputModel:formFieldType, setInputModel:setFormFieldType) {
        inputModel.value = value
        validateModel(inputModel)
        setInputModel({...inputModel});

        validateForm()
    }
        
    function validateModel(updatedInputModel:formFieldType) {
        if(!updatedInputModel.value) {
            updatedInputModel.validated = false;
            updatedInputModel.error = `${updatedInputModel.label} field cannot be empty`;
            return
        }

        updatedInputModel.validated = true;
        updatedInputModel.error = "";
        return
    }   
    
    const [isFormValid, setIsFormValid] = useState(false);
    
    function validateForm() {
        if(!userPassword.validated) {
            setIsFormValid(false)
            return false
        }

        setIsFormValid(true)
        return true
    }
    
    function deactivateStaff() {
        const payload = {
            password: userPassword.value
        }

        console.log(payload)
    }
    
    return (
        <div className={styles.account_reset}>
            <div className={styles.left}>
                <div className={styles.heading}>Account reset</div>
                <div className={styles.sub_heading}>Manage staff accounts</div>
            </div>

            <div className={styles.right}>
                <PasswordInputField 
                    placeholder={userPassword.placeholder}
                    value={userPassword.value}
                    error={userPassword.error}
                    onInput={(value: string) => setInput(value, userPassword, setUserPassword)} 
                />

                <FadedBackgroundButton
                    label="Deactivate staff"
                    disabled={!isFormValid}
                    backgroundColor={"var(--red-accent-faded-100)"}
                    labelColor={"var(--red-accent-100)"}
                    action={()=> deactivateStaff()}
                />
            </div>
        </div>
    )
}