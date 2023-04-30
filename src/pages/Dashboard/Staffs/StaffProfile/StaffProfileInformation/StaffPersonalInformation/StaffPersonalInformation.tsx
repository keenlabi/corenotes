import { useEffect, useState } from "react";
import styles from "./staffpersonalinformation.module.css";
import { useStaffValue } from "src/features/staff/state";

export default function StaffPersonalInformation() {

    const staffState = useStaffValue();

    const [personalInfoObj, setPersonalInfoObj] = useState({
        firstname: '',
        lastname: '',
        phoneNumber: '',
        username: '',
        email: '',
    })

    const personalInfo = [
        {
            label:'First name',
            value: personalInfoObj.firstname
        },
        {
            label:'Last name',
            value: personalInfoObj.lastname
        },
        {
            label:'Username',
            value: personalInfoObj.username
        },
        {
            label:'Initials',
            value:'WA'
        },
        {
            label:'Date of Birth',
            value:'02/10/2023'
        },
        {
            label:'Gender',
            value:'Female'
        },
        {
            label:'Home address',
            value:'146 Roberts St.Maplewood, NJ 07040'
        },
        {
            label:'Work phone',
            value: personalInfoObj.phoneNumber
        },
        {
            label:'Cell phone',
            value: personalInfoObj.phoneNumber
        },
        {
            label:'Other phone',
            value: personalInfoObj.phoneNumber
        },
        {
            label:'Emergency contact',
            value:'Augusta'
        },
        {
            label:'Relationship with contact',
            value:'Sibling (Sister)'
        },
        {
            label:'Cell phone',
            value: personalInfoObj.phoneNumber
        },
        {
            label:'Email address',
            value: personalInfoObj.email
        }
    ]
    
    useEffect(()=> {
        setPersonalInfoObj(state => {
            return {
                ...state,
                firstname: staffState.details.firstname,
                lastname: staffState.details.lastname,
                phoneNumber: staffState.details.phoneNumber,
                username: staffState.details.username,
                email: staffState.details.email
            }
        })
    }, [staffState.details])

    return (
        <div className={styles.staff_personal_information}>
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
}:{label:string, value:string}) {
    return (
        <div className={styles.info_field}>
            <div className={styles.label}>{ label }</div>
            <div className={styles.value}>{ value }</div>
        </div>
    )
}