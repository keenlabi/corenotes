import { useEffect, useState } from "react";
import styles from "./staffworkinformation.module.css";
import { InfoField } from "../StaffPersonalInformation/StaffPersonalInformation";
import { useStaffValue } from "src/features/staff/state";

export default function StaffWorkInformation() {

    const staffState = useStaffValue();

    const [workObj, setWorkObj] = useState({
        compartment: '',
        title: '',
        providerRole: '',
        username: '',
        employeeId: '234325435'
    })

    const workInfo = [
        {
            label:'Compartment',
            value: workObj.compartment
        },
        {
            label:'Staff title',
            value: workObj.title
        },
        {
            label:'Provider role',
            value: workObj.providerRole
        },
        {
            label:'Username',
            value:workObj.username
        },
        {
            label:'Employee ID',
            value:workObj.employeeId
        },
        {
            label:'Schedule type',
            value:'Willy'
        },
        {
            label:'Hire date',
            value:'19/03/2023'
        }
    ]
    
    useEffect(()=> {
        setWorkObj(state => {
            return {
                ...state,
                compartment: staffState.details.username,
                title: staffState.details.username,
                providerRole: staffState.details.username,
                username: staffState.details.username,
            }
        })
    }, [staffState.details])

    return (
        <div className={styles.staff_work_information}>
            <div className={styles.heading}>Work Information</div>

            <div className={styles.info_section}>
                {
                    workInfo.map((info, index) => {
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