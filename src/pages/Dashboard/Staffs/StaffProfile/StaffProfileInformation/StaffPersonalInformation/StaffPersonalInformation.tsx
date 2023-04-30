import { useState } from "react";
import styles from "./staffpersonalinformation.module.css";

export default function StaffPersonalInformation() {

    const [personalInfo, setPersonalInfo] = useState([
        {
            label:'First name',
            value:'Williams'
        },
        {
            label:'Last name',
            value:'Augusta'
        },
        {
            label:'Username',
            value:'Willy'
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
            value:'(678)123-1234'
        },
        {
            label:'Cell phone',
            value:'(678)123-1234'
        },
        {
            label:'Other phone',
            value:'(678)123-1234'
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
            value:'(678)123-1234'
        },
        {
            label:'Email address',
            value:'williams.xyz@corenote.com'
        }
    ])

    return (
        <div className={styles.staff_personal_information}>
            <div className={styles.heading}>Personal Information</div>

            <div className={styles.info_section}>
                {
                    personalInfo.map(info => {
                        return  <InfoField
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