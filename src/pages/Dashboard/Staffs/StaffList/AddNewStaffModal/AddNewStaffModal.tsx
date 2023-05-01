import ModalContainer from "src/components/Modal/ModalContainer"
import styles from "./addnewstaffmodal.module.css"
import { ReactComponent as IconCancel } from "src/assets/icons/icon-cancel.svg"
import StaffPersonalInformationForm from "./StaffPersonalInformationForm"
import StaffWorkInformationForm from "./StaffWorkInformationForm"
import FadedBackgroundButton from "src/components/Buttons/FadedBackgroundButton"
import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton"

export default function AddNewStaffModal({
    closeModal
}:{closeModal: ()=> void}) {

    function registerStaff() {
        console.log('STAFF REGISTERED')
    }

    return (
        <ModalContainer close={()=> closeModal()}>
            <div className={styles.add_new_staff}>
                <div className={styles.top_section}>
                    <div className={styles.heading}>Add new staff</div>
                    <IconCancel className={styles.icon_cancel} />
                </div>

                <div className={styles.registration_form_section}>
                    <StaffPersonalInformationForm />
                    <StaffWorkInformationForm />
                </div>

                <div className={styles.action_buttons}>
                    <FadedBackgroundButton 
                        label={"Cancel"}
                        backgroundColor={"var(--blue-accent-faded-100)"}
                        labelColor={"var(--blue-accent-100)"}
                        width="20%" 
                        action={()=> closeModal()}
                    />
                    <PrimaryTextButton
                        width={"20%"}
                        label={"Save"}
                        clickAction={()=> {registerStaff()}}
                    />
                </div>
            </div>
        </ModalContainer>
    )
}