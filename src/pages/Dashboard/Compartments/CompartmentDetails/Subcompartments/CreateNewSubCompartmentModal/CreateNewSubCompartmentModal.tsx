import { useState } from "react";
import styles from "./createnewsubcompartmentmodal.module.css";
import { ReactComponent as IconCancelCircle } from "src/assets/icons/icon-cancel-circle.svg";
import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton";
import ModalContainer from "src/components/Modal/ModalContainer";
import { useCompartmentState } from "src/features/compartment/state";
import { formFieldType, setFormFieldType } from "src/components/FormComponents/FormWrapper/types";
import InputField from "src/components/FormComponents/InputField";
import { useParams } from "react-router-dom";
import { postNewSubcompartment } from "src/features/compartment/action";
import { addEventFeedbackItem, useGlobalEventFeedbackState } from "src/features/globalEventFeedback/state";

export default function CreateNewSubCompartmentModal({ closeModal }:{ closeModal:()=> void }) {

    const params = useParams();

    const [globalEventFeedback, setGLobalEventFeedback] = useGlobalEventFeedbackState();

    const [compartmentState, setCompartmentState] = useCompartmentState();

    const [titleModel, setTitleModel] = useState<formFieldType>({
        type: "text",
        label: "Title",
        value: "",
        error: "",
        validated: false,
    })

    function setInput(value:string, inputModel:formFieldType, setInputModel:setFormFieldType) {
        inputModel.value = value
        validateModel(inputModel)
        setInputModel({...inputModel});
    }

    function validateModel(updatedInputModel:formFieldType) {
        if(!updatedInputModel.value) {
            updatedInputModel.validated = false;
            updatedInputModel.error = "Title field cannot be empty";
            return
        }

        updatedInputModel.validated = true;
        updatedInputModel.error = ""
        return
    }

    function createSubcompartment() {
        const payload = {
            title: titleModel.value
        }

        setCompartmentState((state)=> ({
            ...state,
            status: "LOADING"
        }))

        let newEventFeedback = {
            status: "",
            message: ""
        }
        
        postNewSubcompartment(parseInt(params.compartmentId!) , payload)
        .then((response)=> {
            setCompartmentState((state)=> ({
                ...state,
                status: "IDLE",
                compartment: response.data.compartment
            }))

            newEventFeedback = {
                status: "SUCCESS",
                message: "New subcompartment created successfully"
            }
        })
        .catch((error)=> {
            setCompartmentState((state)=> ({
                ...state,
                status: "IDLE"
            }))

            newEventFeedback = {
                status: "ERROR",
                message: error?.message ?? "There was an error creating new subcompartment"
            }
        })
        .finally(()=> {
            addEventFeedbackItem(newEventFeedback, [ ...globalEventFeedback ], setGLobalEventFeedback);
            closeModal();
        })
    }
    
    return (
        <ModalContainer close={()=> closeModal()}>
            <div className={styles.create_new_subcompartment_modal}>
                <div className={styles.header}>
                    <div className={styles.title}>Create new subcompartment</div>
                    <IconCancelCircle className={styles.icon_cancel} onClick={()=> compartmentState.status === 'LOADING' ?()=>({}) :closeModal() }/>
                </div>

                <div className={styles.body}>
                    <InputField 
                        type={titleModel.type}
                        label={titleModel.label}
                        error={titleModel.error}
                        onInput={(inputValue:string)=> setInput(inputValue, titleModel, setTitleModel)}
                    />
                </div>

                <div className={styles.buttons}>
                    <PrimaryTextButton
                        isLoading={compartmentState.status === 'LOADING'}
                        disabled={!titleModel.validated}
                        width={"20%"}
                        label="Submit"
                        clickAction={()=> createSubcompartment()}
                    />
                </div>
            </div>
        </ModalContainer>
    )
}