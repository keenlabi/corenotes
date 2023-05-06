import ModalContainer from "src/components/Modal/ModalContainer"
import styles from "./addnewstaffmodal.module.css"
import { ReactComponent as IconCancel } from "src/assets/icons/icon-cancel.svg"
import StaffPersonalInformationForm from "./StaffPersonalInformationForm/StaffPersonalInformationForm"
import StaffWorkInformationForm from "./StaffWorkInformationForm"
import FadedBackgroundButton from "src/components/Buttons/FadedBackgroundButton"
import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton"
import { useStaffState } from "src/features/staff/state"
import FormStateModal from "src/components/FormComponents/FormStateModal/FormStateModal"
import { useState, useEffect } from "react"
import { fetchStaffListSuccessResponseType, registerStaffAction } from "src/features/staff/actions"
import formatStaffList from "src/features/staff/utils/formatStaffsList"
import JSONToFormData from "src/utils/JSONToFormData"

export default function AddNewStaffModal({
    closeModal
}:{closeModal: ()=> void}) {

    const [staffState, setStaffState] = useStaffState();

    const [isFormValid, setIsFormValid] = useState(false)

    useEffect(()=> {
        validateForm()
    }, [staffState.newStaff, validateForm])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    function validateForm() {
        if  (   !staffState.newStaff.firstname ||
                !staffState.newStaff.lastname ||
                !staffState.newStaff.nickname ||
                !staffState.newStaff.initials ||
                !staffState.newStaff.dob ||
                !staffState.newStaff.gender ||
                !staffState.newStaff.address ||
                !staffState.newStaff.city ||
                !staffState.newStaff.state ||
                !staffState.newStaff.zipCode ||
                !staffState.newStaff.phoneNumber.work ||
                !staffState.newStaff.phoneNumber.cell ||
                !staffState.newStaff.emergencyContact.name ||
                !staffState.newStaff.emergencyContact.relationship ||
                !staffState.newStaff.emergencyContact.phoneNumber ||
                !staffState.newStaff.email ||
                !staffState.newStaff.compartment ||
                !staffState.newStaff.title ||
                !staffState.newStaff.providerRole ||
                !staffState.newStaff.hiredAt ||
                !staffState.newStaff.username ||
                !staffState.newStaff.employeeId ||
                !staffState.newStaff.jobSchedule
            ) {
                setIsFormValid(false)
                return false
            } else {
                console.log('ERRO')
                setIsFormValid(true)
                return true
            }
    }

    function resetFormStateModel() {
        return null
    }

    function registerStaff() {
        if(validateForm()) {
            JSONToFormData(staffState.newStaff)
            .then((formDataResult:FormData)=> {
                for (const val of formDataResult.entries()) {
                    console.log(val[0]+ ', ' + val[1]); 
                }
                registerStaffAction(formDataResult)
                .then(({ data }:fetchStaffListSuccessResponseType)=> {
                    setStaffState((state)=> {
                        return {
                            ...state,
                            status: 'SUCCESS',
                            error: false,
                            message: 'Staff registered successfully',
                            list: formatStaffList(data.staffs)
                        }
                    })
                })
                .catch((error)=> {
                    setStaffState((state)=> {
                        return {
                            ...state,
                            status: 'FAILED',
                            error: true,
                            message: error.message
                        }
                    })
                })
            })
            .catch((error)=> {
                console.log(error)
            })
        }
    }

    return (
        <ModalContainer close={()=> staffState.status !== 'LOADING' ? closeModal() :null}>
            <div className={styles.add_new_staff}>
                <FormStateModal
                    status={staffState.status}
                    error={staffState.error}
                    message={staffState.message}
                    dontShowSuccess={true}
                    reset={()=> resetFormStateModel()}
                />

                <div className={styles.top_section}>
                    <div className={styles.heading}>Add new staff</div>
                    <IconCancel className={styles.icon_cancel} />
                </div>

                <div className={styles.registration_form_section}>
                    <StaffPersonalInformationForm />
                    <StaffWorkInformationForm  />
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
                        disabled={!isFormValid}
                        width={"20%"}
                        label={"Save"}
                        clickAction={()=> {registerStaff()}}
                    />
                </div>
            </div>
        </ModalContainer>
    )
}