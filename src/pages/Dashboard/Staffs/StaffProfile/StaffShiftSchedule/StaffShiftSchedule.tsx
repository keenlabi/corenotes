import StaffProfileHeader from "../StaffProfileHeader";
import styles from "./staffshiftschedule.module.css";
import { useState } from "react";
import NewScheduleModal from "./NewScheduleModal/NewScheduleModal";
import StaffShiftScheduleList from "./StaffScheduleList";

export default function StaffShiftSchedule() {

    const [isNewScheduleModalVisible, setIsNewScheduleModalVisible] = useState(false);

    function triggerAction(clickedActionType:string) {
        if(clickedActionType === 'set-new-shift') setIsNewScheduleModalVisible(true);
    }

    return (
        <div className={styles.staff_shift_schedule}>
            <StaffProfileHeader multipleActions={['set-new-shift']} clickAction={(clickedActionType?:string)=> triggerAction(clickedActionType!)} />
            
            <StaffShiftScheduleList />

            {
                isNewScheduleModalVisible
                ?   <NewScheduleModal close={()=> setIsNewScheduleModalVisible(false)} />
                :   null
            }
        </div>
    )
}