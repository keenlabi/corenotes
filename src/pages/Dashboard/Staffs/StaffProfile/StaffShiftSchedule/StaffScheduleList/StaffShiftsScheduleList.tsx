import styles from "./staffshiftsschedulelist.module.css";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { addEventFeedbackItem, useGlobalEventFeedbackState } from "src/features/globalEventFeedback/state";
import { useFetchStaffShiftsSelector } from "src/features/staff/selector";
import { useStaffState } from "src/features/staff/state";
import StaffShiftsScheduleTable from "./StaffScheduleTable";

export default function StaffShiftScheduleList () {

    const [globalEventFeedback, setGlobalEventFeedbackState] = useGlobalEventFeedbackState();

    const params = useParams();

    const [staffState, setStaffState] = useStaffState();
    
    const staffShiftsResponse = useFetchStaffShiftsSelector(parseInt(params.staffId!), staffState.shifts.currentPage);

    useEffect(()=> {
        setStaffState((state)=> ({
            ...state,
            shifts: staffShiftsResponse.data
        }))

        if(staffShiftsResponse.error) {
            const newEventFeedback = {
                status: "ERROR",
                message: staffShiftsResponse.message
            }

            addEventFeedbackItem(newEventFeedback, [...globalEventFeedback], setGlobalEventFeedbackState)
        }

    }, [globalEventFeedback, setGlobalEventFeedbackState, setStaffState, staffShiftsResponse])
    
    return (
        <div className={styles.list}>
            <StaffShiftsScheduleTable 
                shifts={staffState.shifts.list}
                currentPage={staffState.documents.currentPage}
                totalPages={staffState.documents.totalPages}
                errorMessage={staffState.error ?staffState.message :"No shifts schedule found for staff"} 
                goToPage={(pageNumber:number)=> console.log(pageNumber)}

            />
        </div>
    );
}