import ModalContainer from "src/components/Modal/ModalContainer";
import styles from "./addnewstaffmodal.module.css";
import { ReactComponent as IconCancelCircle } from "src/assets/icons/icon-cancel-circle.svg";
import StaffPersonalInformationForm from "./StaffPersonalInformationForm/StaffPersonalInformationForm";
import StaffWorkInformationForm from "./StaffWorkInformationForm";
import FadedBackgroundButton from "src/components/Buttons/FadedBackgroundButton";
import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton";
import { useStaffState } from "src/features/staff/state";
import FormStateModal from "src/components/FormComponents/FormStateModal/FormStateModal";
import { useState, useEffect } from "react";
import {
  fetchStaffListSuccessResponseType,
  registerStaffAction,
} from "src/features/staff/actions";
import JSONToFormData from "src/utils/JSONToFormData";
import SizedBox from "src/components/SizedBox";

export default function AddNewStaffModal({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const [staffState, setStaffState] = useStaffState();

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [staffState.newStaff, validateForm]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function validateForm() {
    if (
      !staffState.newStaff.firstname ||
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
      // !staffState.newStaff.compartment ||
      !staffState.newStaff.title ||
      !staffState.newStaff.providerRole ||
      !staffState.newStaff.hiredAt ||
      !staffState.newStaff.username ||
      !staffState.newStaff.employeeId ||
      !staffState.newStaff.jobSchedule
    ) {
      setIsFormValid(false);
      return false;
    } else {
      setIsFormValid(true);
      return true;
    }
  }

  function resetFormStateModel() {
    setStaffState((state) => {
      return {
        ...state,
        status: "IDLE",
        error: false,
        message: "",
      };
    });

    closeModal();
  }

  function registerStaff() {
    if (validateForm()) {
      setStaffState((state) => {
        return {
          ...state,
          status: "LOADING",
          error: false,
          message: "",
        };
      });

      JSONToFormData(staffState.newStaff)
        .then((formDataResult: FormData) => {
          for (const val of formDataResult.entries()) {
            console.log(val[0] + ", " + val[1]);
          }
          registerStaffAction(formDataResult)
            .then(({ data }: fetchStaffListSuccessResponseType) => {
              setStaffState((state) => {
                return {
                  ...state,
                  status: "SUCCESS",
                  error: false,
                  message: "Staff registered successfully",
                  list: data.staffs,
                };
              });
            })
            .catch((error) => {
              setStaffState((state) => {
                return {
                  ...state,
                  status: "FAILED",
                  error: true,
                  message: error.message,
                };
              });
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <ModalContainer
      close={() => (staffState.status !== "LOADING" ? closeModal() : null)}
    >
      <div className={styles.add_new_staff}>
        <FormStateModal
          status={staffState.status}
          error={staffState.error}
          message={staffState.message}
          reset={() => resetFormStateModel()}
        />
        <SizedBox height="60px" />

        <div className={styles.top_section}>
          <div className={styles.heading}>Add new staff</div>
          <IconCancelCircle
            className={styles.icon_cancel}
            onClick={() =>
              staffState.status === "LOADING" ? () => ({}) : closeModal()
            }
          />
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
            action={() => closeModal()}
          />

          <PrimaryTextButton
            isLoading={staffState.status === "LOADING"}
            disabled={!isFormValid}
            width={"20%"}
            label={"Save"}
            clickAction={() => {
              registerStaff();
            }}
          />
        </div>
      </div>
    </ModalContainer>
  );
}
