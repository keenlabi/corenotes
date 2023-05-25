import { useIndividualValue } from "src/features/Individual/state";
import styles from "./individualpersonalinformation.module.css";

export default function IndividualPersonalInformation() {

    const IndividualState = useIndividualValue();

    const personalInfo = [
        {
            label:'First name',
            value: IndividualState.profile.personalInformation.firstName
        },
        {
            label:'Middle name',
            value: IndividualState.profile.personalInformation.middleName || "_"
        },
        {
            label:'Last name',
            value: IndividualState.profile.personalInformation.lastName
        },
        {
            label:'Nick name',
            value: IndividualState.profile.personalInformation.nickName || "_"
        },
        {
            label:'Date of Birth',
            value: IndividualState.profile.personalInformation.dob
        },
        {
            label:'Gender',
            value: IndividualState.profile.personalInformation.gender
        },
        {
            label:'Marital status',
            value: IndividualState.profile.personalInformation.maritalStatus
        },
        {
            label:'Religion',
            value: IndividualState.profile.personalInformation.religion || "_"
        },
        {
            label:'SSN',
            value: IndividualState.profile.personalInformation.ssn
        },
        {
            label:'Weight',
            value: IndividualState.profile.personalInformation.weight
        },
        {
            label:'Mediciad number',
            value: IndividualState.profile.personalInformation.medicaidNumber
        },
        {
            label:'',
            value: ''
        },
        {
            label:'Contact name',
            value: IndividualState.profile.personalInformation.contact.name
        },
        {
            label:'Contact email',
            value: IndividualState.profile.personalInformation.contact.email
        },
        {
            label:'Contact phone number',
            value: IndividualState.profile.personalInformation.contact.phoneNumber
        }
    ]

    return (
        <div className={styles.individual_personal_information}>
            <div className={styles.heading}>Personal Information</div>

            <div className={styles.info_section}>
                {
                    personalInfo.map((info, index) => {
                        return  <InfoField
                                    key={info.label + index}
                                    label={info.label} 
                                    value={info.value}
                                />
                    })
                }
            </div>
        </div>
    )
}

export function InfoField({
    label, 
    value
}:{label:string, value:string|number}) {
    return (
        <div className={styles.info_field}>
            <div className={styles.label}>{ label }</div>
            <div className={styles.value}>{ value }</div>
        </div>
    )
}