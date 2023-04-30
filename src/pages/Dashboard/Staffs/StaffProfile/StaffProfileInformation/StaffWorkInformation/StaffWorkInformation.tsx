import { useState } from "react";
import styles from "./staffworkinformation.module.css";
import { InfoField } from "../StaffPersonalInformation/StaffPersonalInformation";

export default function StaffWorkInformation() {

    const [workInfo, setWorkInfo] = useState([
        {
            label:'Department',
            value:'Marietta'
        },
        {
            label:'Staff title',
            value:'Administrator'
        },
        {
            label:'Provider role',
            value:'Willy'
        },
        {
            label:'Username',
            value:'Willy'
        },
        {
            label:'Employee ID',
            value:'234325435'
        },
        {
            label:'Schedule type',
            value:'Willy'
        },
        {
            label:'Hire date',
            value:'19/03/2023'
        }
    ])

    return (
        <div className={styles.staff_work_information}>
            <div className={styles.heading}>Work Information</div>

            <div className={styles.info_section}>
                {
                    workInfo.map(info => {
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