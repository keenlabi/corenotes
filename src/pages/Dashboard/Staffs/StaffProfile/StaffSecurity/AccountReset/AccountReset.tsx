import styles from "./accountreset.module.css";
import { formFieldType, setFormFieldType } from "src/components/FormComponents/FormWrapper/types";
import { useState } from "react";
import PasswordInputField from "src/components/FormComponents/InputField/PasswordInputField";
import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton";

export default function AccountReset() {

    const [newStaffPassword, setNewStaffPassword] = useState<formFieldType>({
        type:'password',
        label:'Enter new password',
        placeholder: 'Enter new Password',
        value: '',
        error: '',
        validated: false
    })

    const [confirmNewStaffPassword, setConfirmNewStaffPassword] = useState<formFieldType>({
        type:'password',
        label:'Confirm new password',
        placeholder: 'Confirm new Password',
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
        if(!newStaffPassword.validated) {
            setIsFormValid(false)
            return false
        }
        if(!confirmNewStaffPassword.validated) {
            setIsFormValid(false)
            return false
        }

        setIsFormValid(true)
        return true
    }

    function saveNewPassword() {
        const payload = {
            password: newStaffPassword.value
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
                    placeholder={newStaffPassword.placeholder}
                    value={newStaffPassword.value}
                    error={newStaffPassword.error}
                    onInput={(value: string) => setInput(value, newStaffPassword, setNewStaffPassword)} 
                />

                <PasswordInputField 
                    placeholder={confirmNewStaffPassword.placeholder}
                    value={confirmNewStaffPassword.value} 
                    error={confirmNewStaffPassword.error}
                    onInput={(value:string)=> setInput(value, confirmNewStaffPassword, setConfirmNewStaffPassword)}
                />

                <PrimaryTextButton 
                    label="Save"
                    disabled={!isFormValid}
                    clickAction={()=> saveNewPassword()}
                />
            </div>
        </div>
    )
}