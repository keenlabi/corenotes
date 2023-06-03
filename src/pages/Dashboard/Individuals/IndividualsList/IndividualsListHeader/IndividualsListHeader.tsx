import { useNavigate } from "react-router-dom";
import styles from "./individualslistheader.module.css"
import AddNewNoBackgroundIconButton from "src/components/Buttons/AddNewNoBackgroundIconButton";
import { useIndividualStateValue } from "src/features/Individual/state";

export default function IndividualsListHeader({
    showNewStaffModal
}:{ showNewStaffModal: ()=> void}){

    const navigate = useNavigate()

    const individualState = useIndividualStateValue();

    return (
        <div className={styles.staff_list_header}>
            <div className={styles.heading}>
                { individualState.list.length } Staff{individualState.list.length > 1 ?"s" :""} total
            </div>

            <AddNewNoBackgroundIconButton 
                label="Create assessment"
                action={()=> navigate({pathname: '/dashboard/individuals/assessments/create'})} 
            />

            <AddNewNoBackgroundIconButton 
                label="Add new staff"
                action={()=> showNewStaffModal()} 
            />  
        </div>
    )
}