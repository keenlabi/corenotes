import FormWrapper from "src/components/FormComponents/FormWrapper";
import styles from "./staffworkinformationform.module.css"
import InputField from "src/components/FormComponents/InputField";
import { useState } from "react";
import { formFieldType, setFormFieldType } from "src/components/FormComponents/FormWrapper/types";
import { useStaffState } from "src/features/staff/state";
import PasswordInputField from "src/components/FormComponents/InputField/PasswordInputField";

export default function StaffWorkInformationForm() {

    const [staffStateModel, setStaffModel] = useStaffState()

    const [compartmentModel, setCompartmentModel] = useState<formFieldType>({
        type:'text',
        label: 'Compartment',
        placeholder:'Compartment',
        value:staffStateModel.newStaff.compartment,
        error:'',
        validated:false
    })

    const [staffTitleModel, setStaffTitleModel] = useState<formFieldType>({
        type:'text',
        label: 'Staff title',
        placeholder:'Staff title',
        value:staffStateModel.newStaff.title,
        error:'',
        validated:false
    })

    const [providerRoleModel, setProviderRoleModel] = useState<formFieldType>({
        type:'text',
        label: 'Provider role',
        placeholder:'Provider role',
        value:staffStateModel.newStaff.providerRole,
        error:'',
        validated:false
    })

    const [usernameModel, setUsernameModel] = useState<formFieldType>({
        type:'text',
        label: 'Username',
        placeholder:'Username',
        value:staffStateModel.newStaff.username,
        error:'',
        validated:false
    })

    const [employeeIdModel, setEmployeeIdModel] = useState<formFieldType>({
        type:'date',
        label: 'Employee ID',
        placeholder:'Employee ID',
        value:staffStateModel.newStaff.employeeId,
        error:'',
        validated:false
    })

    const [scheduleTypeModel, setScheduleTypeModel] = useState<formFieldType>({
        type:'text',
        label: 'Schedule Type',
        placeholder:'Schedule Type',
        value:staffStateModel.newStaff.jobSchedule,
        error:'',
        validated:false
    })

    const [hireDateModel, setHireDateModel] = useState<formFieldType>({
        type:'date',
        label: 'Hire date',
        placeholder:'Hire date',
        value:staffStateModel.newStaff.hiredAt,
        error:'',
        validated:false
    })

    const [passwordModel, setPasswordModel] = useState<formFieldType>({
        type:'password',
        label: 'Password',
        placeholder:'Password',
        value:staffStateModel.newStaff.password,
        error:'',
        validated:false
    })

    function setInput(value:string, inputModel:formFieldType, setInputModel:setFormFieldType) {
        inputModel.value = value
        validateModel(inputModel)
        setInputModel({...inputModel});

        submit()
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

    function submit() {
        setStaffModel((state)=> {
            return {
                ...state,
                newStaff: {
                    ...state.newStaff,
                    compartment: compartmentModel.value,
                    title: staffTitleModel.value,
                    providerRole: providerRoleModel.value,
                    hiredAt: hireDateModel.value,
                    username: usernameModel.value,
                    employeeId: employeeIdModel.value,
                    jobSchedule: scheduleTypeModel.value,
                    password: passwordModel.value
                }
            }
        })
    }

    return (
        <FormWrapper extraStyles={styles.staff_personal_information_form}>
            <div className={styles.heading}>
                <div className={styles.number_circle}>2</div>
                <div className={styles.text}>Work information</div>
            </div>

            <div className={styles.form_content}>
                <div className={styles.row}>
                    <InputField 
                        type={compartmentModel.type}
                        placeholder={compartmentModel.placeholder}
                        value={compartmentModel.value}
                        error={compartmentModel.error}  
                        onInput={(inputValue:string) => setInput(inputValue, compartmentModel, setCompartmentModel)}
                    />

                    <InputField 
                        type={staffTitleModel.type}
                        placeholder={staffTitleModel.placeholder}
                        value={staffTitleModel.value}
                        error={staffTitleModel.error}  
                        onInput={(inputValue:string) => setInput(inputValue, staffTitleModel, setStaffTitleModel)}
                    />

                    <InputField 
                        type={providerRoleModel.type}
                        placeholder={providerRoleModel.placeholder}
                        value={providerRoleModel.value}
                        error={providerRoleModel.error}  
                        onInput={(inputValue:string) => setInput(inputValue, providerRoleModel, setProviderRoleModel)}
                    />
                </div>

                <div className={styles.row}>
                    <InputField 
                        type={usernameModel.type}
                        placeholder={usernameModel.placeholder}
                        value={usernameModel.value}
                        error={usernameModel.error}  
                        onInput={(inputValue:string) => setInput(inputValue, usernameModel, setUsernameModel)}
                    />

                    <InputField 
                        type={employeeIdModel.type}
                        placeholder={employeeIdModel.placeholder}
                        value={employeeIdModel.value}
                        error={employeeIdModel.error}  
                        onInput={(inputValue:string) => setInput(inputValue, employeeIdModel, setEmployeeIdModel)}
                    />

                    <InputField 
                        type={scheduleTypeModel.type}
                        placeholder={scheduleTypeModel.placeholder}
                        value={scheduleTypeModel.value}
                        error={scheduleTypeModel.error}  
                        onInput={(inputValue:string) => setInput(inputValue, scheduleTypeModel, setScheduleTypeModel)}
                    />
                </div>

                <div className={styles.row}>
                    <InputField
                        type={hireDateModel.type}
                        placeholder={hireDateModel.placeholder}
                        value={hireDateModel.value}
                        error={hireDateModel.error}  
                        onInput={(inputValue:string) => setInput(inputValue, hireDateModel, setHireDateModel)}
                    />

                    <PasswordInputField
                        placeholder={passwordModel.placeholder}
                        value={passwordModel.value}
                        error={passwordModel.error}
                        showPrefixIcon={false}
                        onInput={(inputValue:string) => setInput(inputValue, passwordModel, setPasswordModel)}
                    />

                    <div></div>
                </div>
            </div>
        </FormWrapper>
    )
}