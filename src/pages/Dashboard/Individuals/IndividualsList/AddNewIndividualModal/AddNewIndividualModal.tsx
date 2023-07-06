import ModalContainer from "src/components/Modal/ModalContainer"
import styles from "./addnewindividualmodal.module.css"
import { ReactComponent as IconCancel } from "src/assets/icons/icon-cancel-circle.svg"
import FadedBackgroundButton from "src/components/Buttons/FadedBackgroundButton"
import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton"
import FormStateModal from "src/components/FormComponents/FormStateModal/FormStateModal"
import { useState, useEffect } from "react"
import JSONToFormData from "src/utils/JSONToFormData"
import IndividualPersonalInformationForm from "./IndividualPersonalInformationForm"
import IndividualHealthInformationForm from "./IndividualHealthInformationForm"
import { individualInitState, useIndividualState } from "src/features/Individual/state"
import { IndividualListResponseType, registerIndividualAction } from "src/features/Individual/action"
import SizedBox from "src/components/SizedBox"

export default function AddNewIndividualModal({
    closeModal
    
}:{closeModal: ()=> void}) {
    const [individualState, setIndividualState] = useIndividualState();

    const [isFormValid, setIsFormValid] = useState(false)

    useEffect(()=> {
        validateForm()
    }, [individualState.newIndividual, validateForm])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    function validateForm() {
        if  (   !individualState.newIndividual.firstname ||
                !individualState.newIndividual.lastname ||
                !individualState.newIndividual.dob ||
                !individualState.newIndividual.gender ||
                !individualState.newIndividual.ssn ||
                !individualState.newIndividual.contact.name ||
                !individualState.newIndividual.contact.email ||
                !individualState.newIndividual.contact.phoneNumber ||
                !individualState.newIndividual.weight ||
                !individualState.newIndividual.compartment ||
                !individualState.newIndividual.medicaidNumber ||
                !individualState.newIndividual.maritalStatus ||
                !individualState.newIndividual.codeAlert.length ||
                !individualState.newIndividual.requestedServices.length ||
                !individualState.newIndividual.diet.length ||
                !individualState.newIndividual.allergies.food.length||
                !individualState.newIndividual.allergies.med.length ||
                !individualState.newIndividual.allergies.other.length
            ) {
                setIsFormValid(false)
                return false
            } else {
                setIsFormValid(true)
                return true
            }
    }

    function resetFormStateModel() {
        setIndividualState(state => ({
            ...state,
            status:'IDLE'
        }))
    }

    function registerIndividual() {
        if(validateForm()) {

            setIndividualState(state => ({
                ...state,
                status:'LOADING',
                error:false,
                message:''
            }))
            
            JSONToFormData(individualState.newIndividual)
            .then((formDataResult:FormData)=> {
              
                registerIndividualAction(formDataResult)
                .then((response:IndividualListResponseType)=> {
                    setIndividualState(state => {
                        return {
                            ...state,
                            status: 'SUCCESS',
                            message: 'New individual added successfully',
                            individuals: response.data,
                            newIndividual: individualInitState.newIndividual,
                            error: false
                        }
                    })
                })
                .catch((error)=> {
                    setIndividualState(state => {
                        return {
                            ...state,
                            status: 'FAILED',
                            message: error.message ?? 'There was an error creating new user',
                            error: true,
                            individuals: individualInitState.individuals
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
        <ModalContainer close={individualState.status !== 'LOADING' 
            ? ()=> {
                resetFormStateModel();
                closeModal();
            }
            :()=> ({})
        }>
            <div className={styles.add_new_staff}>
                <FormStateModal
                    status={individualState.status}
                    error={individualState.error}
                    message={individualState.message}
                    reset={()=> resetFormStateModel()}
                />

                <div className={styles.top_section}>
                    <div className={styles.heading}>Add new individual</div>
                    <IconCancel 
                        className={styles.icon_cancel} 
                        onClick={individualState.status !== 'LOADING'
                            ? ()=> {
                                resetFormStateModel();
                                closeModal();
                            }
                            :()=> ({})
                        }
                    />
                </div>

                <div className={styles.registration_form_section}>
                    <IndividualPersonalInformationForm />
                    <SizedBox height="20px" />
                    <IndividualHealthInformationForm  />
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
                        isLoading={individualState.status === 'LOADING'}
                        width={"20%"}
                        label={"Save"}
                        clickAction={()=> registerIndividual()}
                    />
                </div>
            </div>
        </ModalContainer>
    )
}