import ModalContainer from "src/components/Modal/ModalContainer"
import styles from "./addservicemodal.module.css"
import { ReactComponent as IconCancelCircle } from "src/assets/icons/icon-cancel-circle.svg"
import InputField from "src/components/FormComponents/InputField"
import { useState } from "react"
import { formFieldType, setFormFieldType } from "src/components/FormComponents/FormWrapper/types"
import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton"
import FadedBackgroundButton from "src/components/Buttons/FadedBackgroundButton"
import { useServicesState } from "src/features/service/state"
import { newServiceData, postService } from "src/features/service/action"
import FormStateModal from "src/components/FormComponents/FormStateModal/FormStateModal"

export default function AddCompartmentModal({ close }:{close:()=> void}) {

    const [servicesState, setServicesState] = useServicesState();

    const [serviceTitle, setserviceTitle] = useState<formFieldType>({
        type:'text',
        placeholder:'Enter name of service',
        value:'',
        error:'',
        validated:false
    })

    function setInput(value:string, model:formFieldType, setModel:setFormFieldType) {
        model.value = value;
        validateModel(model)
        setModel({...model});

        validateForm();
    }

    function validateModel(updatedModel:formFieldType) {
        if(!updatedModel.value) {
            updatedModel.error = "Field cannot be empty";
            updatedModel.validated = false;
            return;
        }

        const isMatch = servicesState.servicesList.filter((service) => service.title === updatedModel.value.toLowerCase())[0]?.title;

        if(isMatch) {
            updatedModel.error = "Compartment already exist";
            updatedModel.validated = false;
            return;
        }

        updatedModel.error = "";
        updatedModel.validated = true;
        return;
    }

    const [isFormValidated, setIsFormValidated] = useState(false)

    function validateForm() {
        if(!serviceTitle.validated) {
            setIsFormValidated(false);
            return;
        }

        setIsFormValidated(true);
        return;
    }

    function submitService() {
        if(isFormValidated) {

            const payload:newServiceData = {
                title: serviceTitle.value
            }
            
            setServicesState(state => ({
                ...state,
                status: 'LOADING', 
                error: false,
                message: ""
            }))

            postService(payload)
            .then((response)=> {
                console.log(response)
                setServicesState(state => ({
                    ...state,
                    status: 'SUCCESS', 
                    error: false,
                    message: "New Service successfully created",
                    servicesList: response.data.services,
                    currentListPage: response.data.currentPage,
                    totalListPages: response.data.totalPages,
                }))
            })
            .catch((error)=> {
                console.log(error)
                setServicesState(state => ({
                    ...state,
                    status: 'SUCCESS',
                    error: true,
                    message: error.message || "There was an error creating compartment"
                }))
            })
        }
    }

    return (
        <ModalContainer close={()=> close()}>
            <div className={styles.container}>
                
                <FormStateModal 
                    status={servicesState.status} 
                    error={servicesState.error}
                    message={servicesState.message}
                    reset={()=> setServicesState((state)=> ({ ...state, status: 'IDLE' }))}
                />

                <div className={styles.heading}>
                    <div className={styles.title}>Services</div>
                    <IconCancelCircle onClick={()=> close()} style={{cursor:"pointer"}} />
                </div>

                <div className={styles.body}>
                    <InputField
                        placeholder={serviceTitle.placeholder}
                        value={serviceTitle.value}
                        error={serviceTitle.error}
                        onInput={(value)=> setInput(value, serviceTitle, setserviceTitle)}
                    />
                </div>

                <div className={styles.buttons}>
                    <FadedBackgroundButton 
                        width="200px"
                        label="Cancel"
                        labelColor={"var(--blue-accent-200)"}
                        backgroundColor={"var(--blue-accent-faded-100)"}
                        action={() => close()}
                    />
                    
                    <PrimaryTextButton
                        width="200px"
                        label="Create service"
                        clickAction={()=> submitService()}
                        disabled={!isFormValidated}
                        isLoading={servicesState.status === 'LOADING'}
                    />
                </div>
            </div>
        </ModalContainer>
    )
}