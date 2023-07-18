import ModalContainer from "src/components/Modal/ModalContainer";
import styles from "./individualmedicationreviewmodal.module.css";
import { ReactComponent as IconCancelCircle } from "src/assets/icons/icon-cancel-circle.svg";
import FadedBackgroundButton from "src/components/Buttons/FadedBackgroundButton";
import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton";
import { useState } from "react";
import RowContainer from "src/components/Layout/RowContainer";
import InputField from "src/components/FormComponents/InputField";
import { formFieldType, setFormFieldType } from "src/components/FormComponents/FormWrapper/types";
import SizedBox from "src/components/SizedBox";
import { addNewAllocationAction } from "src/features/Individual/action";
import { useParams } from "react-router-dom";
import { useIndividualState } from "src/features/Individual/state";
import FormStateModal from "src/components/FormComponents/FormStateModal/FormStateModal";

interface IIndividualMedicationReviewModal {
    medId:string;
    name:string;
    frequency:string;
    time:string;
    strength:string;
    amount:{
        allocated:number;
        current:number;
        administered:number;
    };
    closeModal:()=> void
}

export default function IndividualMedicationReviewModal({
    medId,
    name, 
    strength,
    frequency,
    time,
    amount,
    closeModal
}:IIndividualMedicationReviewModal) {

    const params = useParams();

    const [individualState, setIndividualState] = useIndividualState();

    const [currentPillAmountModel, setCurrentPillAmountModel] = useState(amount.current);

    const [newPillsAmountModel, setNewPillsAmountModel] = useState<formFieldType>({
        type: "number",
        name:'new-pills',
        placeholder: "Enter the new amount",
        value: "",
        error: "",
        validated: false
    })

    const [newPharmacyModel, setNewPharmacyModel] = useState<formFieldType>({
        type: "text",
        placeholder: "Pharmacy",
        value: "",
        readonly: true,
        error: "",
        validated: false
    })

    const [newPrescriberModel, setNewPrescriberModel] = useState<formFieldType>({
        type: "text",
        placeholder: "Prescriber",
        value: "",
        readonly: true,
        error: "",
        validated: false
    })
    
    function setInput(value:string, model:formFieldType, setModel:setFormFieldType) {
        model.value = value;

        validateModel(model);

        if(model.name === 'new-pills') {
            const totalCurrentPills = amount.current + parseInt(model.value || "0")
            setCurrentPillAmountModel(totalCurrentPills)
        }

        setModel({...model})

        validateForm();
    }

    function validateModel(model:formFieldType) {
        if(!model.value) {
            model.error = `${model.placeholder} field cannot be empty`;
            model.validated = false;
            return;
        }
        
        model.error = "";
        model.validated = true;
        return;
    }

    function validateForm() {
        if(!newPillsAmountModel.validated) {
            setIsFormValid(false)
            return;
        }

        setIsFormValid(true)
        return;
    }

    const [isFormValid, setIsFormValid] = useState(false);

    function performReview() {
        if(isFormValid) {
            const payload = {
                medicationId: medId,
                newAmountAllocated: parseInt(newPillsAmountModel.value)
            }

            setIndividualState(state => ({
                ...state,
                status: "LOADING",
                message: "",
                error: false
            }))

            addNewAllocationAction(parseInt(params.individualId!), payload)
            .then((response)=> {
                setIndividualState(state => ({
                    ...state,
                    status: "SUCCESS",
                    error: false,
                    message: response.message,
                    medications: response.data
                }))
            })
            .catch((error)=> {
                setIndividualState(state => ({
                    ...state,
                    status: "FAILED",
                    error: true,
                    message: error.message
                }))
            })
        }
    }

    function resetIndividualState() {
        setIndividualState(state => ({
            ...state,
            error: false,
            message: ""
        }))
    }
    
    return (
        <ModalContainer close={closeModal}>
            <div className={styles.individual_medication_review}>

                <FormStateModal 
                    status={individualState.status} 
                    error={individualState.error} 
                    message={individualState.message}
                    reset={resetIndividualState}
                />

                <div className={styles.header}>
                    <div className={styles.heading}>Supervisory Medication Review</div>
                    <IconCancelCircle className={styles.icon_cancel} onClick={closeModal}/>
                </div>

                <div className={styles.body}>
                    <div className={styles.title}>{ name + ' (' + strength +')' }</div>
                    
                    <SizedBox height="20px" />

                    <RowContainer alignment="top">
                        <div className={styles.schedule}>
                            <div className={styles.time}>{ time }</div>
                            <div className={styles.frequency}>{ frequency }</div>
                        </div>
                        
                        <div className={styles.pills_count}>
                            <div className={styles.administered}>
                                <div className={styles.digit}>{amount.administered}</div>
                                <div className={styles.label}>Taken</div>
                            </div>

                            <div className={styles.current}>
                                <div className={styles.digit}>{currentPillAmountModel}</div>
                                <div className={styles.label}>Left</div>
                            </div>
                        </div>
                    </RowContainer>

                    <SizedBox height="20px" />

                    <InputField
                        type={newPillsAmountModel.type}
                        placeholder={newPillsAmountModel.placeholder}
                        value={newPillsAmountModel.value}
                        error={newPillsAmountModel.error}
                        onInput={(value:string)=> setInput(value, newPillsAmountModel, setNewPillsAmountModel)}
                    />

                    <SizedBox height="20px" />

                    <RowContainer alignment="top">
                        <InputField 
                            type={newPharmacyModel.type}
                            placeholder={newPharmacyModel.placeholder}
                            value={newPharmacyModel.value}
                            error={newPharmacyModel.error}
                            readonly={newPharmacyModel.readonly}
                            onInput={(value:string)=> setInput(value, newPharmacyModel, setNewPharmacyModel)}
                        />

                        <InputField 
                            type={newPrescriberModel.type}
                            placeholder={newPrescriberModel.placeholder}
                            value={newPrescriberModel.value}
                            error={newPrescriberModel.error}
                            readonly={newPrescriberModel.readonly}
                            onInput={(value:string)=> setInput(value, newPrescriberModel, setNewPrescriberModel)}
                        />
                    </RowContainer>
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
                        clickAction={()=> performReview()}
                    />
                </div>
            </div>
        </ModalContainer>
    )
}