import AddNewNoBackgroundIconButton from "src/components/Buttons/AddNewNoBackgroundIconButton";
import styles from "./staffroles.module.css";
import { useState } from "react";
import AddStaffRoleModal from "./AddStaffRoleModal";
import StaffRolesList from "./StaffRolesList";

export default function StaffRoles() {

    const [showCreateStaffRolesModal, setShowCreateStaffRolesModal] = useState(false)

    return (
        <div className={styles.staff_offices_list}>
            <div className={styles.heading}>
                <div className={styles.title}>Staff roles</div>

                <AddNewNoBackgroundIconButton 
                    label="Add role"
                    action={()=> setShowCreateStaffRolesModal(true)}
                />
            </div>

            <StaffRolesList />

            {
                showCreateStaffRolesModal
                ?   <AddStaffRoleModal closeModal={()=> setShowCreateStaffRolesModal(false) } />
                :   null
            }
        </div>
    )
}