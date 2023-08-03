import { useFetchIndividualServicesList } from "src/features/Individual/selector"
import IndividualServicesListTable from "./IndividualServicesListTable"
import styles from "./individualserviceslist.module.css"
import { useParams } from "react-router-dom"
import { useIndividualState } from "src/features/Individual/state";
import { useEffect, useState } from "react";
import AddNewNoBackgroundIconButton from "src/components/Buttons/AddNewNoBackgroundIconButton";
import AddIndividualServiceModal from "./AddIndividualServiceModal/AddIndividualServiceModel";

export default function IndividualServicesList() {

    const { individualId } = useParams();

    const [individualState, setIndividualState] = useIndividualState();

    const individualServicesResponse = useFetchIndividualServicesList(individualId!)

    useEffect(()=> {
        console.log(individualServicesResponse.individualServices)
        setIndividualState(state => ({
            ...state,
            message: individualServicesResponse.message,
            error: individualServicesResponse.error,
            services: individualServicesResponse.individualServices
        }))

        return ()=> {
            setIndividualState(state => ({
                ...state,
                services: []
            }))
        }

    }, [individualServicesResponse, setIndividualState])

    const [showAddServiceModal, setShowAddServiceModal] = useState(false);

    return (
        <div className={styles.individual_services_list}>
            <div className={styles.options}>
                <AddNewNoBackgroundIconButton 
                    label={"Add Service"}
                    action={()=> setShowAddServiceModal(true)}
                />
            </div>

            <IndividualServicesListTable 
                services={individualState.services}
                currentPage={0}
                totalPages={0} 
                errorMessage={"There are no services to show"} 
                goToPage={()=> null} 
            />

            {
                showAddServiceModal
                ?   <AddIndividualServiceModal closeModal={()=> setShowAddServiceModal(false)} />
                :   null
            }
        </div>
    )
}