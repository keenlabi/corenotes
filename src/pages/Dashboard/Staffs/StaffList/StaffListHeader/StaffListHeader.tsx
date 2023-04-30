import { useStaffValue } from "src/features/staff/state"
import styles from "./stafflistheader.module.css"
import IconButton from "src/components/Buttons/IconButton";
import { ReactComponent as IconPlusCircle } from "src/assets/icons/icon-plus-circle.svg";

export default function StaffListHeader(){

    const staffState = useStaffValue();

    function addNewStaff () {
        console.log('')
    }

    return (
        <div className={styles.staff_list_header}>
            <div className={styles.heading}>
                { staffState.list.length } Staff{staffState.list.length > 1 ?"s" :""} total
            </div>

            <IconButton
                extraStyle={styles.add_new_staff_button}
                prefixIcon={<IconPlusCircle />}
                label={"Add new Staff"}
                onClick={()=> addNewStaff()}
            />
        </div>
    )
}