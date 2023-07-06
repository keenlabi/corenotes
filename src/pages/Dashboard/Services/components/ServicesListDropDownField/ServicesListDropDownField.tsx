import { useEffect, useState } from "react";
import styles from "./serviceslistdropdownfield.module.css";
import DropDownField from "src/components/FormComponents/DropDownField/dropdownfield";
import { DropDownFormData, setDropDownFormData } from "src/components/FormComponents/DropDownField/types";
import CircularRingLoader from "src/components/Loaders/CircularRingLoader";
import { useFetchServicesByCategorySelector } from "src/features/service/selector";
import { ServicesListItemType } from "src/features/service/types";

export default function ServicesListDropDownField({ serviceSelected, category}:{serviceSelected:(id:string)=> void, category:string}) {

    const [services, setServices] = useState<{
        status:'IDLE'|'LOADING';
        services:{
            list:ServicesListItemType[];
            currentPage:number;
            totalPages:number;
        }

    }>({
        status: 'IDLE',
        services: {
            list:[],
            currentPage:1,
            totalPages:0
        }
    })

    const servicesListResponse = useFetchServicesByCategorySelector(category, services.services.currentPage)

    useEffect(()=> {
        setServices(state => ({
            ...state,
            status: 'LOADING'
        }))
    }, [category])

    useEffect(()=> {
        setServices(state => ({
            status: 'IDLE',
            services: {
                ...state.services,
                list: servicesListResponse.services.list,
                totalPages: servicesListResponse.services.totalPages
            }
        }))

        setServicesList(state => ({
            ...state,
            options: services.services.list.map(service => ({
                id: service.id,
                label: service.title,
                value: service.id
            }))
        }))

    }, [services.services.list, servicesListResponse])

    const [servicesList, setServicesList] = useState<DropDownFormData>({
        name:'services-list',
        placeholder:'Services',
        options: [],
        selected:false,
        selectedOptionIndex:0,
        error:''
    })

    function selectOption(optionIndex:number, model:DropDownFormData, setModel:setDropDownFormData) {
        model.value = model.options[optionIndex];
        model.selected = true;
        model.selectedOptionIndex = optionIndex;

        setModel({ ...model })
        selectService();
    }

    function selectService() {
        serviceSelected(servicesList.value!.value!);
    }   

    return  <div className={styles.service_list}>
                <DropDownField 
                    placeholder={servicesList.placeholder}
                    options={servicesList.options} 
                    error={servicesList.error} 
                    selected={servicesList.selected} 
                    selectedOptionIndex={servicesList.selectedOptionIndex}
                    onSelect={(optionIndex:number)=> selectOption(optionIndex, servicesList, setServicesList)} 
                />

                
                    {
                        services.status === 'LOADING'
                        ?   <div className={styles.loading}>
                                <CircularRingLoader color={"var(--blue-accent-100)"} />
                            </div>
                        :   null
                    }
            </div>
}
