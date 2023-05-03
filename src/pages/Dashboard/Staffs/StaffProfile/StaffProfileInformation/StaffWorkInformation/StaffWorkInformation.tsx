import styles from "./staffworkinformation.module.css";
import { InfoField } from "../StaffPersonalInformation/StaffPersonalInformation";
import { useStaffValue } from "src/features/staff/state";

export default function StaffWorkInformation() {

    const staffState = useStaffValue();

    const workInfo = [
        {
            label:'Compartment',
            value: staffState.details.compartment
        },
        {
            label:'Staff title',
            value: staffState.details.title
        },
        {
            label:'Provider role',
            value: staffState.details.providerRole
        },
        {
            label:'Username',
            value:staffState.details.username
        },
        {
            label:'Employee ID',
            value:staffState.details.employeeId
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