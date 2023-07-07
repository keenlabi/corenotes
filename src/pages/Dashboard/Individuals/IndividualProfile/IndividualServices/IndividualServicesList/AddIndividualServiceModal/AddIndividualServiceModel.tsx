import ModalContainer from "src/components/Modal/ModalContainer";
import { ReactComponent as IconCancelCircle } from "src/assets/icons/icon-cancel-circle.svg";
import styles from "./addindividualservicemodel.module.css";
import IndividualCompartmentForm from "src/pages/Dashboard/Individuals/IndividualsList/AddNewIndividualModal/IndividualHealthInformationForm/IndividualCompartmentForm";
import FadedBackgroundButton from "src/components/Buttons/FadedBackgroundButton";
import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton";
import { useIndividualState } from "src/features/Individual/state";
import { useEffect, useState } from "react";
import { DropDownFormData, setDropDownFormData } from "src/components/FormComponents/DropDownField/types";
import DropDownField from "src/components/FormComponents/DropDownField/dropdownfield";
import { compartmentInitState, useCompartmentState } from "src/features/compartment/state";
import { getCompartmentDetails } from "src/features/compartment/action";
import { addServiceToIndividualAction } from "src/features/Individual/action";
import { useParams } from "react-router-dom";
import FormStateModal from "src/components/FormComponents/FormStateModal/FormStateModal";
import InputField from "src/components/FormComponents/InputField";
import { formFieldType, setFormFieldType } from "src/components/FormComponents/FormWrapper/types";
import { getAllProvidedServiceAction } from "src/features/service/action";

export default function AddIndividualServiceModal({ closeModal }:{ closeModal:()=> void }) {

    const { individualId } = useParams();

    const [individualState, setIndividualState] = useIndividualState();

    const [compartmentState, setCompartmentState] = useCompartmentState();

    const [serviceTypeModel, setServiceTypeModel] = useState<DropDownFormData>({
        name:"service-type",
        placeholder: "Service category",
        options: [
            {
                id:'1',
                label: 'Requested service',
                value: 'requested-service'
            },
            {
                id:'2',
                label: 'Provided service',
                value: 'provided-service'
            }
        ],
        error: '',
        selected: false,
        selectedOptionIndex: 0
    })

    const [requestedServiceModel, setRequestedServiceModel] = useState<DropDownFormData>({
        name:"requested-service",
        placeholder: "Service",
        options: [],
        error: '',
        selected: false,
        selectedOptionIndex: 0
    })

    const [serviceStartDateModel, setServiceStartDateModel] = useState<formFieldType>({
        type: 'date',
        placeholder:'Start date',
        value: '',
        error: '',
        validated: false
    })

    function setInput(value:string, model:formFieldType, setModel:setFormFieldType) {
        model.value = value;
        model.validated = true;
        setModel({...model})
        validateForm();
    }

    function selectOption (optionIndex:number, model:DropDownFormData, setModel:setDropDownFormData) {
        model.value = model.options[optionIndex];
        model.selected = true;
        model.selectedOptionIndex = optionIndex;

        setModel({...model});
        validateForm();
    }

    const [servicesPages, setServicesPages] = useState({
        currentPage: 1,
        totalPages: 1,
    })

    useEffect(()=> {
        if(serviceTypeModel.value?.value?.toLowerCase() === 'provided-service') {
            getAllProvidedServiceAction(servicesPages.currentPage)
            .then(({data})=> {
                console.log(data)
                setServicesPages({
                    currentPage: data.currentPage,
                    totalPages: data.totalPages
                })

                setIndividualState(state => ({
                    ...state,
                    status:'IDLE',
                    error: false,
                    message: ""
                }))

                setRequestedServiceModel(state => ({
                    ...state,
                    options: data.services?.map(service => ({
                        id: service.id,
                        label: service.title,
                        value: service.id
                    }))
                }))
            })
            .catch(()=> {
                setIndividualState(state => ({
                    ...state,
                    status:'FAILED',
                    error: true,
                    message: "There was an error fetching provided services list"
                }))
            })
        }

        if(serviceTypeModel.value?.value?.toLowerCase() === 'requested-service') {
            if(individualState.newIndividual.compartmentId) {
                getCompartmentDetails(individualState.newIndividual.compartmentId)
                .then((response)=> {
                    setCompartmentState(state => ({
                        ...state,
                        error: false,
                        message: '',
                        compartment: response.data.compartment
                    }))
                })
                .catch(()=> {
                    setCompartmentState(state => ({
                        ...state,
                        error: true,
                        compartment: compartmentInitState.compartment
                    }))
                })
                .finally(()=> {
                    setRequestedServiceModel(state => ({
                        ...state,
                        options: compartmentState.compartment.services.map(service => ({
                            id: service.id,
                            label: service.title,
                            value: service.id
                        }))
                    }))
                })
            }
        }
        
    }, [compartmentState.compartment.services, individualId, individualState.newIndividual.compartmentId, serviceTypeModel.value?.value, servicesPages.currentPage, setCompartmentState, setIndividualState])

    const [isFormValidated, setIsFormValidated] = useState(false);

    function validateForm() {
        if(!serviceTypeModel.selected) {
            setIsFormValidated(false)
            return false;
        }
        if(!requestedServiceModel.selected) {
            setIsFormValidated(false)
            return false;
        }
        if(!serviceStartDateModel.validated) {
            setIsFormValidated(false)
            return false;
        }

        setIsFormValidated(true);
        return true
    }

    function submitForm() {
        if(validateForm()) {
            const payload = {
                serviceId: requestedServiceModel.value!.value!,
                startDate: serviceStartDateModel.value
            }

            setIndividualState(state => ({
                ...state,
                status: "LOADING",
                message: "",
                error: false,
            }))

            addServiceToIndividualAction(individualId!, payload)
            .then((response)=> {
                setIndividualState(state => ({
                    ...state,
                    status: "SUCCESS",
                    message: "Service assigned to individual successfully",
                    error: false,
                    requestedServices: response.data.individualServices
                }))
            })
            .catch((error)=> {
                console.log(error)
                setIndividualState(state => ({
                    ...state,
                    status: "FAILED",
                    message: error.message ?? "There was an error assigning service to individual",
                    error: true,
                }))
            })
        }
    }

    function resetFormStateModal() {
        setIndividualState(state => ({
            ...state,
            status: "IDLE",
            message: "",
            error: false,
        }))
    }

    return (
        <ModalContainer close={()=> closeModal()}>
            <div className={styles.add_individual_service_modal}>
                <FormStateModal 
                    status={individualState.status} 
                    error={individualState.error} 
                    message={individualState.message}
                    reset={()=> resetFormStateModal()} 
                />

                <div className={styles.header}>
                    <div className={styles.heading}>Add service to individual</div>
                    <IconCancelCircle onClick={()=> closeModal()} />
                </div>

                <div className={styles.body}>
                    <DropDownField 
                        label={serviceTypeModel.label}
                        placeholder={serviceTypeModel.placeholder}
                        options={serviceTypeModel.options}
                        selected={serviceTypeModel.selected}
                        selectedOptionIndex={serviceTypeModel.selectedOptionIndex}
                        error={serviceTypeModel.error}
                        onSelect={(optionIndex:number)=> selectOption(optionIndex, serviceTypeModel, setServiceTypeModel)}
                    />

                    {
                        serviceTypeModel.value?.value?.toLowerCase() === 'requested-service'
                        ?   <IndividualCompartmentForm removeLabel={true} />
                        :   null
                    }

                    <DropDownField 
                        label={requestedServiceModel.label}
                        placeholder={requestedServiceModel.placeholder}
                        options={requestedServiceModel.options}
                        selected={requestedServiceModel.selected}
                        selectedOptionIndex={requestedServiceModel.selectedOptionIndex}
                        error={requestedServiceModel.error}
                        onSelect={(optionIndex:number)=> selectOption(optionIndex, requestedServiceModel, setRequestedServiceModel)}
                    />

                    <InputField
                        type={serviceStartDateModel.type}
                        placeholder={serviceStartDateModel.placeholder}
                        value={serviceStartDateModel.value}
                        error={serviceStartDateModel.error}
                        onInput={(value:string)=> setInput(value, serviceStartDateModel, setServiceStartDateModel)}
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
                        label="Assign Service"
                        clickAction={()=> submitForm()}
                        disabled={!isFormValidated}
                        isLoading={individualState.status === 'LOADING'}
                    />
                </div>
            </div>
        </ModalContainer>
    )
}