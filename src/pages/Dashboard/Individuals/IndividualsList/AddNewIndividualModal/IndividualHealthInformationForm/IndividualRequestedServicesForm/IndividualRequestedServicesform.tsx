import FormWrapper from "src/components/FormComponents/FormWrapper";
import styles from "./individualrequestedservicesform.module.css";
import { useState } from "react";
import { DropDownFormData } from "src/components/FormComponents/DropDownField/types";
import DropDownField from "src/components/FormComponents/DropDownField/dropdownfield";
import InputField from "src/components/FormComponents/InputField";
import { formFieldType } from "src/components/FormComponents/FormWrapper/types";
import { ReactComponent as IconAdd } from "src/assets/icons/icon-plus-circle.svg"
import { ReactComponent as IconCancel } from "src/assets/icons/icon-cancel-circle.svg"
import { useSetIndividualState } from "src/features/Individual/state";

export default function IndividualRequestedServicesForm() {

    const setIndividualState = useSetIndividualState();

    const serviceTemplate:{id:number, service:DropDownFormData, startDate:formFieldType} = {
        id: 1,
        service: {
            name:'all-services',
            label: '',
            placeholder: 'Select a service',
            error:'',
            selected: false,
            selectedOptionIndex: 0,
            options: [
                {
                    id:'1',
                    label:'Service #1',
                    value:'service-1'
                },
                {
                    id:'2',
                    label:'Service #2',
                    value:'service-2'
                },
                {
                    id:'3',
                    label:'Service #3',
                    value:'service-3'
                },
                {
                    id:'4',
                    label:'Service #4',
                    value:'service-4'
                },
                {
                    id:'5',
                    label:'Service #5',
                    value:'service-5'
                },
                {
                    id:'6',
                    label:'Service #6',
                    value:'service-6'
                }
                ,{
                    id:'7',
                    label:'Service #7',
                    value:'service-7'
                }
            ]
        },
        startDate: {
            type: 'date',
            placeholder:'Start date',
            value: '',
            error: '',
            validated: false
        }
    }

    const [requestedServices, setRequestedServices] = useState<Array<{id:number, service:DropDownFormData, startDate:formFieldType}>>([
        {
            id: 1,
            service: {
                name:'all-services',
                label: '',
                placeholder: 'Select a service',
                error:'',
                selected: false,
                selectedOptionIndex: 0,
                options: [
                    {
                        id:'1',
                        label:'Service #1',
                        value:'service-1'
                    },
                    {
                        id:'2',
                        label:'Service #2',
                        value:'service-2'
                    },
                    {
                        id:'3',
                        label:'Service #3',
                        value:'service-3'
                    },
                    {
                        id:'4',
                        label:'Service #4',
                        value:'service-4'
                    },
                    {
                        id:'5',
                        label:'Service #5',
                        value:'service-5'
                    },
                    {
                        id:'6',
                        label:'Service #6',
                        value:'service-6'
                    }
                    ,{
                        id:'7',
                        label:'Service #7',
                        value:'service-7'
                    }
                ]
            },
            startDate: {
                type: 'date',
                placeholder:'Start date',
                value: '',
                error: '',
                validated: false
            }
        }
    ])

    function selectOption(optionIndex:number, requestedServiceId:number) {
        const currentRequestedService = requestedServices.filter(requestedService => requestedService.id === requestedServiceId)[0];
        currentRequestedService.service.selectedOptionIndex = optionIndex;
        currentRequestedService.service.selected = true;
        currentRequestedService.service.value = currentRequestedService.service.options[optionIndex];

        const currentRequestedServiceIndex = requestedServices.findIndex(requestedService => requestedService.id === requestedServiceId )
        requestedServices[currentRequestedServiceIndex] = currentRequestedService;
        setRequestedServices([...requestedServices])

        submitRequestedService()
    }

    function setDate(selectedDate:string, requestedServiceId:number) {
        const currentRequestedService = requestedServices.filter(requestedService => requestedService.id === requestedServiceId)[0];
        currentRequestedService.startDate.value = selectedDate;

        if(!currentRequestedService.startDate.value) {
            currentRequestedService.startDate.error = 'Field cannot be empty';
        } else {
            currentRequestedService.startDate.validated = true;
        }

        const currentRequestedServiceIndex = requestedServices.findIndex(requestedService => requestedService.id === requestedServiceId )
        requestedServices[currentRequestedServiceIndex] = currentRequestedService;
        setRequestedServices([...requestedServices])

        submitRequestedService()
    }

    function addNewRequestedService() {
        if(requestedServices.length < 5) {
            serviceTemplate.id = requestedServices.length + 1;
            setRequestedServices([...requestedServices, serviceTemplate])
        }
    }

    function removeRequestedService(id:number) {
        const currentRequestedServiceIndex:number = requestedServices.findIndex(requestedService => requestedService.id === id)
        requestedServices.splice(currentRequestedServiceIndex, 1);
        setRequestedServices([...requestedServices])
    }

    function submitRequestedService() {
        const selectedServices:{
            service:string,
            startDate:string
        }[] = requestedServices
        .filter(service => service.service.selected && service.startDate.validated)
        .map((requestedService)=> {
            return {
                service: requestedService.service.value?.label ?? "",
                startDate: requestedService.startDate.value
            }
        })

        setIndividualState(state => {
            return {
                ...state,
                newIndividual: {
                    ...state.newIndividual,
                    requestedServices: selectedServices
                }
            }
        })
        
        console.log(selectedServices)
    }



    return (
        <FormWrapper extraStyles={styles.individual_requested_services_form}>
            <div className={styles.heading}>
                <div className={styles.number_circle}>2</div>
                <div className={styles.text}>Requested Services</div>

                {
                    requestedServices.length < 5
                    ?   <div 
                            className={styles.add_new_service} 
                            onClick={()=> addNewRequestedService()}
                        >
                            <IconAdd className={styles.icon_add} />
                            <div className={styles.text}>Add a service</div>
                        </div>
                    :   null
                }
            </div>

            <div className={styles.form_content}>
                {
                    requestedServices.map(({ id, service, startDate }, index)=> {
                        return (
                            <div 
                                key={id}
                                className={styles.requested_service}
                            >
                                <DropDownField
                                    width={"60%"}
                                    height={"60px"}
                                    label={service.label}
                                    placeholder={service.placeholder}
                                    options={service.options}
                                    error={service.error}
                                    selected={service.selected}
                                    selectedOptionIndex={service.selectedOptionIndex}
                                    onSelect={(optionIndex: number) => selectOption(optionIndex, id)} 
                                />

                                <InputField
                                    inputContainer={"30%"}
                                    type={startDate.type}
                                    placeholder={startDate.value}
                                    value={startDate.value}
                                    error={startDate.error}
                                    onInput={(value:string)=> setDate(value, id)}
                                />
                                
                                {
                                    index === 0 
                                    ?   <div className={styles.cancel_icon} />
                                    :   <IconCancel 
                                            className={styles.cancel_icon} 
                                            onClick={()=> removeRequestedService(id)}
                                        />
                                }
                            </div>
                        )
                    })
                }
            </div>
        </FormWrapper>
    )
}