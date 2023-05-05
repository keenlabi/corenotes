import FormWrapper from "src/components/FormComponents/FormWrapper";
import styles from "./staffpersonalinformationform.module.css"
import InputField from "src/components/FormComponents/InputField";
import { useState } from "react";
import { formFieldType, setFormFieldType } from "src/components/FormComponents/FormWrapper/types";
import { useStaffState } from "src/features/staff/state";

export default function StaffPersonalInformationForm() {

    const [staffState, setStaffState] = useStaffState()

    const [firstnameModel, setFirstnameModel] = useState<formFieldType>({
        type:'text',
        label: 'First name',
        placeholder:'First name',
        value: staffState.newStaff.firstname,
        error:'',
        validated:false
    })

    const [lastnameModel, setLastnameModel] = useState<formFieldType>({
        type:'text',
        label: 'Last name',
        placeholder:'Last name',
        value: staffState.newStaff.lastname,
        error:'',
        validated:false
    })

    const [nicknameModel, setNicknameModel] = useState<formFieldType>({
        type:'text',
        label: 'Nick name',
        placeholder:'Nick name',
        value: staffState.newStaff.nickname,
        error:'',
        validated:false
    })

    const [initialsModel, setInitialsModel] = useState<formFieldType>({
        type:'text',
        label: 'Initials',
        placeholder:'Initials',
        value: staffState.newStaff.initials,
        error:'',
        validated:false
    })

    const [dobModel, setdobModel] = useState<formFieldType>({
        type:'date',
        label: 'Date of birth',
        placeholder:'Date of birth',
        value: staffState.newStaff.dob,
        error:'',
        validated:false
    })

    const [genderModel, setGenderModel] = useState<formFieldType>({
        type:'text',
        label: 'Gender',
        placeholder:'Gender',
        value: staffState.newStaff.gender,
        error:'',
        validated:false
    })

    const [homeAddressModel, setHomeAddressModel] = useState<formFieldType>({
        type:'text',
        label: 'Home address',
        placeholder:'Home address',
        value: staffState.newStaff.address,
        error:'',
        validated:false
    })

    const [cityModel, setCityModel] = useState<formFieldType>({
        type:'text',
        label: 'City',
        placeholder:'In which city',
        value: staffState.newStaff.city,
        error:'',
        validated:false
    })

    const [stateModel, setStateModel] = useState<formFieldType>({
        type:'text',
        label: 'State',
        placeholder:'State',
        value: staffState.newStaff.state,
        error:'',
        validated:false
    })

    const [zipCodeModel, setZipCodeModel] = useState<formFieldType>({
        type:'text',
        label: 'Zip code',
        placeholder:'Zip code',
        value: staffState.newStaff.zipCode,
        error:'',
        validated:false
    })

    const [workPhoneModel, setWorkPhoneModel] = useState<formFieldType>({
        type:'text',
        label: 'Work phone',
        placeholder:'Work phone',
        value: staffState.newStaff.phoneNumber.work,
        error:'',
        validated:false
    })

    const [cellPhoneModel, setCellPhoneModel] = useState<formFieldType>({
        type:'text',
        name: 'cell-phone',
        label: 'Cell phone',
        placeholder:'Cell phone',
        value: staffState.newStaff.phoneNumber.cell,
        error:'',
        validated:false
    })

    const [otherPhoneModel, setOtherPhoneModel] = useState<formFieldType>({
        type:'text',
        name: 'other-phone',
        label: 'Other phone',
        placeholder:'Other phone',
        value: staffState.newStaff.phoneNumber.other,
        error:'',
        validated:false
    })

    const [emergencyContactModel, setEmergencyContactModel] = useState<formFieldType>({
        type:'text',
        label: 'Emergency contact',
        placeholder:'Emergency contact',
        value: staffState.newStaff.emergencyContact.name,
        error:'',
        validated:false
    })

    const [relWithContactModel, setRelWithContactModel] = useState<formFieldType>({
        type:'text',
        label: 'Relationship with contact',
        placeholder:'Relationship with contact',
        value: staffState.newStaff.emergencyContact.relationship,
        error:'',
        validated:false
    })

    const [contactCellPhoneModel, setContactCellPhoneModel] = useState<formFieldType>({
        type:'text',
        label: 'Contact cell phone',
        placeholder:'Contact cell phone',
        value: staffState.newStaff.emergencyContact.phoneNumber,
        error:'',
        validated:false
    })

    const [emailAddressModel, setEmailAddressModel] = useState<formFieldType>({
        type:'text',
        label: 'Email Address',
        placeholder:'Email Address',
        value: staffState.newStaff.email,
        error:'',
        validated:false
    })

    function setInput(value:string, inputModel:formFieldType, setInputModel:setFormFieldType) {
        inputModel.value = value
        validateModel(inputModel)
        setInputModel({...inputModel});

        submit();
    }

    function validateModel(updatedInputModel:formFieldType) {
        if(!['cell-phone', 'other-phone'].includes(updatedInputModel.name!)) {
            if(!updatedInputModel.value) {
                updatedInputModel.validated = false;
                updatedInputModel.error = `${updatedInputModel.label} field cannot be empty`;
                return
            }
        }

        updatedInputModel.validated = true;
        updatedInputModel.error = "";
        return
    }

    function submit() {
        setStaffState((state)=> {
            return {
                ...state,
                newStaff: {
                    ...state.newStaff,
                    firstname: firstnameModel.value,
                    lastname: lastnameModel.value,
                    nickname: nicknameModel.value,
                    initials: initialsModel.value,
                    dob: dobModel.value,
                    gender: genderModel.value,
                    address: homeAddressModel.value,
                    city: cityModel.value,
                    state: stateModel.value,
                    zipCode: stateModel.value,
                    phoneNumber: {
                        work: workPhoneModel.value,
                        cell: cellPhoneModel.value,
                        other: otherPhoneModel.value
                    },
                    emergencyContact: {
                        name: emergencyContactModel.value,
                        relationship: emergencyContactModel.value,
                        phoneNumber: emergencyContactModel.value
                    },
                    email: emailAddressModel.value
                }
            }
        })
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
                        value={firstnameModel.value}
                        error={firstnameModel.error}  
                        onInput={(inputValue:string) => setInput(inputValue, firstnameModel, setFirstnameModel)}
                    />

                    <InputField 
                        type={lastnameModel.type}
                        placeholder={lastnameModel.placeholder}
                        value={lastnameModel.value}
                        error={lastnameModel.error}  
                        onInput={(inputValue:string) => setInput(inputValue, lastnameModel, setLastnameModel)}
                    />

                    <InputField 
                        type={nicknameModel.type}
                        placeholder={nicknameModel.placeholder}
                        value={nicknameModel.value}
                        error={nicknameModel.error}  
                        onInput={(inputValue:string) => setInput(inputValue, nicknameModel, setNicknameModel)}
                    />
                </div>

                <div className={styles.row}>
                    <InputField 
                        type={initialsModel.type}
                        placeholder={initialsModel.placeholder}
                        value={initialsModel.value}
                        error={initialsModel.error}  
                        onInput={(inputValue:string) => setInput(inputValue, initialsModel, setInitialsModel)}
                    />

                    <InputField 
                        type={dobModel.type}
                        placeholder={dobModel.placeholder}
                        value={dobModel.value}
                        error={dobModel.error}  
                        onInput={(inputValue:string) => setInput(inputValue, dobModel, setdobModel)}
                    />

                    <InputField 
                        type={genderModel.type}
                        placeholder={genderModel.placeholder}
                        value={genderModel.value}
                        error={genderModel.error}  
                        onInput={(inputValue:string) => setInput(inputValue, genderModel, setGenderModel)}
                    />
                </div>

                <InputField 
                    type={homeAddressModel.type}
                    placeholder={homeAddressModel.placeholder}
                    value={homeAddressModel.value}
                    error={homeAddressModel.error}  
                    onInput={(inputValue:string) => setInput(inputValue, homeAddressModel, setHomeAddressModel)}
                />

                <div className={styles.row}>
                    <InputField 
                        type={cityModel.type}
                        placeholder={cityModel.placeholder}
                        value={cityModel.value}
                        error={cityModel.error}  
                        onInput={(inputValue:string) => setInput(inputValue, cityModel, setCityModel)}
                    />

                    <InputField 
                        type={stateModel.type}
                        placeholder={stateModel.placeholder}
                        value={stateModel.value}
                        error={stateModel.error}  
                        onInput={(inputValue:string) => setInput(inputValue, stateModel, setStateModel)}
                    />

                    <InputField 
                        type={zipCodeModel.type}
                        placeholder={zipCodeModel.placeholder}
                        value={zipCodeModel.value}
                        error={zipCodeModel.error}  
                        onInput={(inputValue:string) => setInput(inputValue, zipCodeModel, setZipCodeModel)}
                    />
                </div>

                <div className={styles.row}>
                    <InputField 
                        type={workPhoneModel.type}
                        placeholder={workPhoneModel.placeholder}
                        value={workPhoneModel.value}
                        error={workPhoneModel.error}  
                        onInput={(inputValue:string) => setInput(inputValue, workPhoneModel, setWorkPhoneModel)}
                    />

                    <InputField 
                        type={cellPhoneModel.type}
                        placeholder={cellPhoneModel.placeholder}
                        value={cellPhoneModel.value}
                        error={cellPhoneModel.error}  
                        onInput={(inputValue:string) => setInput(inputValue, cellPhoneModel, setCellPhoneModel)}
                    />

                    <InputField 
                        type={otherPhoneModel.type}
                        placeholder={otherPhoneModel.placeholder}
                        value={otherPhoneModel.value}
                        error={otherPhoneModel.error}  
                        onInput={(inputValue:string) => setInput(inputValue, otherPhoneModel, setOtherPhoneModel)}
                    />
                </div>

                <div className={styles.row}>
                    <InputField 
                        type={emergencyContactModel.type}
                        placeholder={emergencyContactModel.placeholder}
                        value={emergencyContactModel.value}
                        error={emergencyContactModel.error}  
                        onInput={(inputValue:string) => setInput(inputValue, emergencyContactModel, setEmergencyContactModel)}
                    />

                    <InputField 
                        type={relWithContactModel.type}
                        placeholder={relWithContactModel.placeholder}
                        value={relWithContactModel.value}
                        error={relWithContactModel.error}  
                        onInput={(inputValue:string) => setInput(inputValue, relWithContactModel, setRelWithContactModel)}
                    />

                    <InputField 
                        type={contactCellPhoneModel.type}
                        placeholder={contactCellPhoneModel.placeholder}
                        value={contactCellPhoneModel.value}
                        error={contactCellPhoneModel.error}  
                        onInput={(inputValue:string) => setInput(inputValue, contactCellPhoneModel, setContactCellPhoneModel)}
                    />
                </div>

                <div className={styles.row}>
                    <InputField 
                        type={emailAddressModel.type}
                        placeholder={emailAddressModel.placeholder}
                        value={emailAddressModel.value}
                        error={emailAddressModel.error}  
                        onInput={(inputValue:string) => setInput(inputValue, emailAddressModel, setEmailAddressModel)}
                    />
                </div>
            </div>
        </FormWrapper>
    )
}