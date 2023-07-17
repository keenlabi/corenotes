import styles from "./selectmedicationmodal.module.css";
import ModalContainer from "src/components/Modal/ModalContainer";
import { ReactComponent as IconCancelCircle } from "src/assets/icons/icon-cancel-circle.svg";
import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton";
import { useIndividualState } from "src/features/Individual/state";
import { useEffect, useState } from "react";
import DropDownField from "src/components/FormComponents/DropDownField/dropdownfield";
import { DropDownFormData, setDropDownFormData } from "src/components/FormComponents/DropDownField/types";
import capitalize from "src/utils/capitalize";
import { formFieldType, setFormFieldType } from "src/components/FormComponents/FormWrapper/types";
import InputField from "src/components/FormComponents/InputField";
import { useFetchMedicationsListSelector } from "src/features/medication/selector";
import { useMedicationState } from "src/features/medication/state";
import RowContainer from "src/components/Layout/RowContainer";
import { addMedicationToIndividualAction } from "src/features/Individual/action";
import { useParams } from "react-router-dom";
import FormStateModal from "src/components/FormComponents/FormStateModal/FormStateModal";

export default function SelectMedicationModal({closeModal}:{closeModal:()=> void}) {

    const params = useParams();

    const [individualState, setIndividualState] = useIndividualState();

    const [medicationState, setMedicationState] = useMedicationState();

    const [isFormValidated, setIsFormValidated] = useState(false);
    
    const serviceMedicationsListResponse = useFetchMedicationsListSelector(medicationState.medications.currentPage);   

    useEffect(()=> {
        console.log(serviceMedicationsListResponse)

        setMedicationState(state => ({
            ...state,
            medications: serviceMedicationsListResponse.medications
        }))

        setMedicationModel(state => ({
            ...state,
            options: [...serviceMedicationsListResponse.medications.list.map((medication)=> ({
                id: medication.id,
                label: `${capitalize(medication.name)} (${medication.strength})`,
                value: medication.id
            }))]
        }))

    }, [serviceMedicationsListResponse, setMedicationState])

    const [medicationModel, setMedicationModel] = useState<DropDownFormData>({
        name: "selected-medication",
        placeholder: "Select medication",
        options: [],
        selected: false,
        selectedOptionIndex: 0,
        error: ""
    });

    const [medAllocatedModel, setMedAllocatedModel] = useState<formFieldType>({
        type: "number",
        label: "",
        placeholder: "Amount allocated",
        value:'',
        error: "",
        validated: false
    })

    const [medStartDateModel, setMedStartDateModel] = useState<formFieldType>({
        type: "date",
        label: "",
        placeholder: "Start date",
        value:'',
        error: "",
        validated: false
    })

    const [medFrequencyModel, setMedFrequencyModel] = useState<DropDownFormData>({
        name: "med-freq",
        placeholder: "How often?",
        options: [
            {
                id:'1',
                label:'Daily',
                value:'daily'
            },
            {
                id:'2',
                label:'Every X Days',
                value:'every-x-days'
            },
            {
                id:'3',
                label:'Weekly',
                value:'weekly'
            },
            {
                id:'4',
                label:'Every X Weeks',
                value:'every-x-weeks'
            },
            {
                id:'5',
                label:'Monthly',
                value:'monthly'
            },
        ],
        selected: false,
        selectedOptionIndex: 0,
        error: ""
    })

    const [medFrequencyAttrModel, setMedFrequencyAttrModel] = useState<formFieldType>({
        readonly: true,
        type: "number",
        label: "",
        placeholder: "",
        prefixIcon: <div children={"Every"} />,
        value:'',
        error: "",
        validated: false
    })

    const [medTimeModel, setMedTimeModel] = useState<formFieldType>({
        type: "time",
        label: "Time",
        placeholder: "Time",
        value:'',
        error: "",
        validated: false
    })

    function setInput(value:string, model:formFieldType, setModel:setFormFieldType) {
        model.value = value;

        validateModel(model);
        setModel({...model})

        enableButton()
    }

    function validateModel(model:formFieldType) {
        if(!model.value) {
            model.error = `${model.label} field cannot be empty`
            model.validated = false;
            return;
        }

        model.error = ''
        model.validated = true;
        return;
    }

    function selectOption(optionIndex:number, model:DropDownFormData, setModel:setDropDownFormData) {
        model.value = model.options[optionIndex];
        model.selected = true;
        model.selectedOptionIndex = optionIndex;
        model.validated = true;

        if(model.name === 'selected-medication') {
            const match = individualState.medications.list.filter(medication => medication.id === model.value?.value)
            const medicationMatch = medicationState.medications.list.filter(medication => medication.id === model.value?.value)

            if(match.length) {
                model.error = `${capitalize(match[0].name)} (${medicationMatch[0].strength}) medication has already been assigned to user`
                model.validated = false;
            }
        }

        if(model.name === 'med-freq') {
            if(model.value.value === 'every-x-days') {
                medFrequencyAttrModel.readonly = false;
                medFrequencyAttrModel.suffixIcon = <div className={styles.prefix_label} children={"days"} />
            }
            if(model.value.value === 'every-x-weeks') {
                medFrequencyAttrModel.readonly = false;
                medFrequencyAttrModel.suffixIcon = <div className={styles.prefix_label} children={"weeks"} />
            }
            if(!['every-x-weeks', 'every-x-days'].includes(model.value.value!)) {
                medFrequencyAttrModel.readonly = true;
                medFrequencyAttrModel.suffixIcon = undefined
                medFrequencyAttrModel.error = "";
            }

            setMedFrequencyAttrModel(medFrequencyAttrModel);
        }
        

        setModel({ ...model });

        enableButton();
    }

    function enableButton() {
        if(!medicationModel.validated) {
            setIsFormValidated(false)
            return;
        }
        if(!medAllocatedModel.validated) {
            setIsFormValidated(false)
            return;
        }
        if(!medFrequencyModel.validated) {
            setIsFormValidated(false)
            return;
        }
        if(['every-x-weeks', 'every-x-days'].includes(medFrequencyModel.value!.value!)) {
            if(!medFrequencyAttrModel.validated) {
                setIsFormValidated(false)
                return;
            }
        }
        if(!medTimeModel.validated) {
            setIsFormValidated(false)
            return;
        }

        setIsFormValidated(true)
        return;
    }

    function submitAddMedicationToIndividual() {
        const payload = {
            medicationId: medicationModel.value!.value!,
            schedule:{
                startDate: medStartDateModel.value,
                frequency: medFrequencyModel.value!.value!,
                frequencyAttr: parseInt(medFrequencyAttrModel.value),
                time: medTimeModel.value,
            },
            amountAllocated: parseInt(medAllocatedModel.value),
        }

        addMedicationToIndividualAction(parseInt(params.individualId!), payload)
        .then((response)=> {
            setIndividualState(state => ({
                ...state,
                status: "SUCCESS",
                error: false,
                message: response.message,
                medications: {
                    ...response.data,
                    list: response.data.list
                }
            }))
        })
        .catch((error)=> {
            console.log(error)
            setIndividualState(state => ({
                ...state,
                status: "FAILED",
                error: true,
                message: error.message
            }))
        })
    }

    function resetInidividualState() {
        setIndividualState(state => ({
            ...state,
            status: 'IDLE',
            message: "",
            error: false
        }))
    }

    return (
        <ModalContainer close={closeModal} >
            <div className={styles.select_medication_modal}>

                <FormStateModal 
                    status={individualState.status} 
                    error={individualState.error} 
                    message={individualState.message}
                    reset={()=> resetInidividualState()}                    
                />

                <div className={styles.header}>
                    <div className={styles.titiel}> Add medicatoin to individual </div>
                    <IconCancelCircle onClick={()=> closeModal()}/>
                </div>

                <div className={styles.body}>
                    <div className={styles.section}>
                        <div className={styles.section_header}>
                            <div className={styles.digit}>1</div>
                            <div className={styles.text}>Medication type</div>
                        </div>

                        <RowContainer alignment={"top"}>
                            <DropDownField
                                relative={true}
                                bottomOffset={"50px"}
                                placeholder={medicationModel.placeholder}
                                options={medicationModel.options}
                                selected={medicationModel.selected} 
                                selectedOptionIndex={medicationModel.selectedOptionIndex}
                                error={medicationModel.error} 
                                onSelect={(optionIndex: number) => selectOption(optionIndex, medicationModel, setMedicationModel)} 
                            />

                            <InputField 
                                type={medAllocatedModel.type}
                                placeholder={medAllocatedModel.placeholder}
                                error={medAllocatedModel.error}
                                onInput={(value:string)=> setInput(value, medAllocatedModel, setMedAllocatedModel)}
                            />
                        </RowContainer>
                    </div>

                    <div className={styles.section}>
                        <div className={styles.section_header}>
                            <div className={styles.digit}>2</div>
                            <div className={styles.text}>Schedule</div>
                        </div>
                        
                        <RowContainer alignment={"top"}>
                            <DropDownField
                                placeholder={medFrequencyModel.placeholder}
                                options={medFrequencyModel.options}
                                selected={medFrequencyModel.selected} 
                                selectedOptionIndex={medFrequencyModel.selectedOptionIndex}
                                error={medFrequencyModel.error} 
                                onSelect={(optionIndex: number) => selectOption(optionIndex, medFrequencyModel, setMedFrequencyModel)} 
                            />

                            <InputField
                                readonly={medFrequencyAttrModel.readonly}
                                extraInputContainerStyle={styles.side_padding}
                                type={medFrequencyAttrModel.type}
                                placeholder={medFrequencyAttrModel.placeholder}
                                prefixIcon={medFrequencyAttrModel.prefixIcon}
                                suffixIcon={medFrequencyAttrModel.suffixIcon}
                                error={medFrequencyAttrModel.error}
                                onInput={(value:string)=> setInput(value, medFrequencyAttrModel, setMedFrequencyAttrModel)}
                            />
                        </RowContainer>
                        
                        <RowContainer>
                            <InputField
                                type={medStartDateModel.type}
                                placeholder={medStartDateModel.placeholder}
                                error={medStartDateModel.error}
                                onInput={(value:string)=> setInput(value, medStartDateModel, setMedStartDateModel)}
                            />

                            <InputField
                                type={medTimeModel.type}
                                placeholder={medTimeModel.placeholder}
                                error={medTimeModel.error}
                                onInput={(value:string)=> setInput(value, medTimeModel, setMedTimeModel)}
                            />
                        </RowContainer>
                    </div>
                </div>

                <div className={styles.buttons}>
                    <PrimaryTextButton
                        isLoading={ individualState.status === 'LOADING' }
                        disabled={!isFormValidated}
                        width={"20%"}
                        label="Submit"
                        clickAction={()=> submitAddMedicationToIndividual()}
                    />
                </div>
            </div>
        </ModalContainer>
    )
}   