import FormWrapper from "src/components/FormComponents/FormWrapper";
import styles from "./staffpersonalinformationform.module.css"
import InputField from "src/components/FormComponents/InputField";
import { useState } from "react";
import { formFieldType, setFormFieldType } from "src/components/FormComponents/FormWrapper/types";

export default function StaffPersonalInformationForm() {

    const [firstnameModel, setFirstnameModel] = useState<formFieldType>({
        type:'text',
        label: 'First name',
        placeholder:'First name',
        error:'',
        validated:false
    })

    const [lastnameModel, setLastnameModel] = useState<formFieldType>({
        type:'text',
        label: 'Last name',
        placeholder:'Last name',
        error:'',
        validated:false
    })

    const [nicknameModel, setNicknameModel] = useState<formFieldType>({
        type:'text',
        label: 'Nick name',
        placeholder:'Nick name',
        error:'',
        validated:false
    })

    const [initialsModel, setInitialsModel] = useState<formFieldType>({
        type:'text',
        label: 'Initials',
        placeholder:'Initials',
        error:'',
        validated:false
    })

    const [dobModel, setdobModel] = useState<formFieldType>({
        type:'date',
        label: 'Date of birth',
        placeholder:'Date of birth',
        error:'',
        validated:false
    })

    const [genderModel, setGenderModel] = useState<formFieldType>({
        type:'text',
        label: 'Gender',
        placeholder:'Gender',
        error:'',
        validated:false
    })

    const [homeAddressModel, setHomeAddressModel] = useState<formFieldType>({
        type:'text',
        label: 'Home address',
        placeholder:'Home address',
        error:'',
        validated:false
    })

    const [cityModel, setCityModel] = useState<formFieldType>({
        type:'text',
        label: 'City',
        placeholder:'In which city',
        error:'',
        validated:false
    })

    const [stateModel, setStateModel] = useState<formFieldType>({
        type:'text',
        label: 'State',
        placeholder:'State',
        error:'',
        validated:false
    })

    const [zipCodeModel, setZipCodeModel] = useState<formFieldType>({
        type:'text',
        label: 'Zip code',
        placeholder:'Zip code',
        error:'',
        validated:false
    })

    const [workPhoneModel, setWorkPhoneModel] = useState<formFieldType>({
        type:'text',
        label: 'Work phone',
        placeholder:'Work phone',
        error:'',
        validated:false
    })

    const [cellPhoneModel, setCellPhoneModel] = useState<formFieldType>({
        type:'text',
        label: 'Cell phone',
        placeholder:'Cell phone',
        error:'',
        validated:false
    })

    const [otherPhoneModel, setOtherPhoneModel] = useState<formFieldType>({
        type:'text',
        label: 'Other phone',
        placeholder:'Other phone',
        error:'',
        validated:false
    })

    const [emergencyContactModel, setEmergencyContactModel] = useState<formFieldType>({
        type:'text',
        label: 'Emergency contact',
        placeholder:'Emergency contact',
        error:'',
        validated:false
    })

    const [relWithContactModel, setRelWithContactModel] = useState<formFieldType>({
        type:'text',
        label: 'Relationship with contact',
        placeholder:'Relationship with contact',
        error:'',
        validated:false
    })

    const [contactCellPhoneModel, setContactCellPhoneModel] = useState<formFieldType>({
        type:'text',
        label: 'Contact cell phone',
        placeholder:'Contact cell phone',
        error:'',
        validated:false
    })

    const [emailAddressModel, setEmailAddressModel] = useState<formFieldType>({
        type:'text',
        label: 'Email Address',
        placeholder:'Email Address',
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
                <div className={styles.number_circle}>1</div>
                <div className={styles.text}>Personal information</div>
            </div>

            <div className={styles.form_content}>
                <div className={styles.row}>
                    <InputField 
                        type={firstnameModel.type}
                        placeholder={firstnameModel.placeholder}
                        error={firstnameModel.error}  
                        onInput={(inputValue:string) => setInput(inputValue, firstnameModel, setFirstnameModel)}
                    />

                    <InputField 
                        type={lastnameModel.type}
                        placeholder={lastnameModel.placeholder}
                        error={lastnameModel.error}  
                        onInput={(inputValue:string) => setInput(inputValue, lastnameModel, setLastnameModel)}
                    />

                    <InputField 
                        type={nicknameModel.type}
                        placeholder={nicknameModel.placeholder}
                        error={nicknameModel.error}  
                        onInput={(inputValue:string) => setInput(inputValue, nicknameModel, setNicknameModel)}
                    />
                </div>

                <div className={styles.row}>
                    <InputField 
                        type={initialsModel.type}
                        placeholder={initialsModel.placeholder}
                        error={initialsModel.error}  
                        onInput={(inputValue:string) => setInput(inputValue, initialsModel, setInitialsModel)}
                    />

                    <InputField 
                        type={dobModel.type}
                        placeholder={dobModel.placeholder}
                        error={dobModel.error}  
                        onInput={(inputValue:string) => setInput(inputValue, dobModel, setdobModel)}
                    />

                    <InputField 
                        type={genderModel.type}
                        placeholder={genderModel.placeholder}
                        error={genderModel.error}  
                        onInput={(inputValue:string) => setInput(inputValue, genderModel, setGenderModel)}
                    />
                </div>

                <InputField 
                    type={homeAddressModel.type}
                    placeholder={homeAddressModel.placeholder}
                    error={homeAddressModel.error}  
                    onInput={(inputValue:string) => setInput(inputValue, homeAddressModel, setHomeAddressModel)}
                />

                <div className={styles.row}>
                    <InputField 
                        type={cityModel.type}
                        placeholder={cityModel.placeholder}
                        error={cityModel.error}  
                        onInput={(inputValue:string) => setInput(inputValue, cityModel, setCityModel)}
                    />

                    <InputField 
                        type={stateModel.type}
                        placeholder={stateModel.placeholder}
                        error={stateModel.error}  
                        onInput={(inputValue:string) => setInput(inputValue, stateModel, setStateModel)}
                    />

                    <InputField 
                        type={zipCodeModel.type}
                        placeholder={zipCodeModel.placeholder}
                        error={zipCodeModel.error}  
                        onInput={(inputValue:string) => setInput(inputValue, zipCodeModel, setZipCodeModel)}
                    />
                </div>

                <div className={styles.row}>
                    <InputField 
                        type={workPhoneModel.type}
                        placeholder={workPhoneModel.placeholder}
                        error={workPhoneModel.error}  
                        onInput={(inputValue:string) => setInput(inputValue, workPhoneModel, setWorkPhoneModel)}
                    />

                    <InputField 
                        type={cellPhoneModel.type}
                        placeholder={cellPhoneModel.placeholder}
                        error={cellPhoneModel.error}  
                        onInput={(inputValue:string) => setInput(inputValue, cellPhoneModel, setCellPhoneModel)}
                    />

                    <InputField 
                        type={otherPhoneModel.type}
                        placeholder={otherPhoneModel.placeholder}
                        error={otherPhoneModel.error}  
                        onInput={(inputValue:string) => setInput(inputValue, otherPhoneModel, setOtherPhoneModel)}
                    />
                </div>

                <div className={styles.row}>
                    <InputField 
                        type={emergencyContactModel.type}
                        placeholder={emergencyContactModel.placeholder}
                        error={emergencyContactModel.error}  
                        onInput={(inputValue:string) => setInput(inputValue, emergencyContactModel, setEmergencyContactModel)}
                    />

                    <InputField 
                        type={relWithContactModel.type}
                        placeholder={relWithContactModel.placeholder}
                        error={relWithContactModel.error}  
                        onInput={(inputValue:string) => setInput(inputValue, relWithContactModel, setRelWithContactModel)}
                    />

                    <InputField 
                        type={contactCellPhoneModel.type}
                        placeholder={contactCellPhoneModel.placeholder}
                        error={contactCellPhoneModel.error}  
                        onInput={(inputValue:string) => setInput(inputValue, contactCellPhoneModel, setContactCellPhoneModel)}
                    />
                </div>

                <div className={styles.row}>
                    <InputField 
                        type={emailAddressModel.type}
                        placeholder={emailAddressModel.placeholder}
                        error={emailAddressModel.error}  
                        onInput={(inputValue:string) => setInput(inputValue, emailAddressModel, setEmailAddressModel)}
                    />
                </div>
            </div>
        </FormWrapper>
    )
}