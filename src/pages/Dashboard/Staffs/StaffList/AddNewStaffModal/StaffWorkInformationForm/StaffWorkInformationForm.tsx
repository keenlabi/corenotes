import FormWrapper from "src/components/FormComponents/FormWrapper";
import styles from "./staffworkinformationform.module.css"
import InputField from "src/components/FormComponents/InputField";
import { useState } from "react";
import { formFieldType, setFormFieldType } from "src/components/FormComponents/FormWrapper/types";

export default function StaffWorkInformationForm() {

    const [compartmentModel, setCompartmentModel] = useState<formFieldType>({
        type:'text',
        label: 'Compartment',
        placeholder:'Compartment',
        error:'',
        validated:false
    })

    const [staffTitleModel, setStaffTitleModel] = useState<formFieldType>({
        type:'text',
        label: 'Staff title',
        placeholder:'Staff title',
        error:'',
        validated:false
    })

    const [providerRoleModel, setProviderRoleModel] = useState<formFieldType>({
        type:'text',
        label: 'Provider role',
        placeholder:'Provider role',
        error:'',
        validated:false
    })

    const [usernameModel, setUsernameModel] = useState<formFieldType>({
        type:'text',
        label: 'Username',
        placeholder:'Username',
        error:'',
        validated:false
    })

    const [employeeIdModel, setEmployeeIdModel] = useState<formFieldType>({
        type:'date',
        label: 'Employee ID',
        placeholder:'Employee ID',
        error:'',
        validated:false
    })

    const [scheduleTypeModel, setScheduleTypeModel] = useState<formFieldType>({
        type:'text',
        label: 'Schedule Type',
        placeholder:'Schedule Type',
        error:'',
        validated:false
    })

    const [hireDateModel, setHireDateModel] = useState<formFieldType>({
        type:'date',
        label: 'Hire date',
        placeholder:'Hire date',
        error:'',
        validated:false
    })

    function setInput(value:string, inputModel:formFieldType, setInputModel:setFormFieldType) {
        inputModel.value = value
        validateModel(inputModel)
        setInputModel({...inputModel});
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
                        error={compartmentModel.error}  
                        onInput={(inputValue:string) => setInput(inputValue, compartmentModel, setCompartmentModel)}
                    />

                    <InputField 
                        type={staffTitleModel.type}
                        placeholder={staffTitleModel.placeholder}
                        error={staffTitleModel.error}  
                        onInput={(inputValue:string) => setInput(inputValue, staffTitleModel, setStaffTitleModel)}
                    />

                    <InputField 
                        type={providerRoleModel.type}
                        placeholder={providerRoleModel.placeholder}
                        error={providerRoleModel.error}  
                        onInput={(inputValue:string) => setInput(inputValue, providerRoleModel, setProviderRoleModel)}
                    />
                </div>

                <div className={styles.row}>
                    <InputField 
                        type={usernameModel.type}
                        placeholder={usernameModel.placeholder}
                        error={usernameModel.error}  
                        onInput={(inputValue:string) => setInput(inputValue, usernameModel, setUsernameModel)}
                    />

                    <InputField 
                        type={employeeIdModel.type}
                        placeholder={employeeIdModel.placeholder}
                        error={employeeIdModel.error}  
                        onInput={(inputValue:string) => setInput(inputValue, employeeIdModel, setEmployeeIdModel)}
                    />

                    <InputField 
                        type={scheduleTypeModel.type}
                        placeholder={scheduleTypeModel.placeholder}
                        error={scheduleTypeModel.error}  
                        onInput={(inputValue:string) => setInput(inputValue, scheduleTypeModel, setScheduleTypeModel)}
                    />
                </div>

                <div className={styles.row}>
                    <InputField
                        type={hireDateModel.type}
                        placeholder={hireDateModel.placeholder}
                        error={hireDateModel.error}  
                        onInput={(inputValue:string) => setInput(inputValue, hireDateModel, setHireDateModel)}
                    />
                </div>
            </div>
        </FormWrapper>
    )
}