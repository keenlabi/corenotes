import { useStaffValue } from "src/features/staff/state"
import styles from "./stafflistheader.module.css"
import IconButton from "src/components/Buttons/IconButton";
import { ReactComponent as IconPlusCircle } from "src/assets/icons/icon-plus-circle.svg";

export default function StaffListHeader({
    showNewStaffModal
}:{ showNewStaffModal: ()=> void }){

    const staffState = useStaffValue();

    return (
        <div className={styles.staff_list_header}>
            <div className={styles.heading}>
                { staffState.list.length } Staff{staffState.list.length > 1 ?"s" :""} total
            </div>

            <IconButton
                extraStyle={styles.add_new_staff_button}
                prefixIcon={<IconPlusCircle />}
                label={"Add new Staff"}
                onClick={()=> showNewStaffModal()}
            />
        </div>
    )
}