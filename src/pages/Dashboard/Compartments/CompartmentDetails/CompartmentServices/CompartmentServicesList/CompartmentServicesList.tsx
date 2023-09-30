import { useCompartmentState } from "src/features/compartment/state";
import styles from "./compartmentserviceslist.module.css";
import { useFetchCompartmentServices } from "src/features/compartment/selector";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CompartmentServiceCard from "../CompartmentServiceCard";
import GridList from "src/components/GridList/GridList";
import EmptyListMessage from "src/components/EmptyListMessage";
import AddNewNoBackgroundIconButton from "src/components/Buttons/AddNewNoBackgroundIconButton";
import AddServiceToCompartmentModal from "../AddServiveToCompartmentModel/AddServiveToCompartmentModal";

export default function CompartmentServicesList() {

    const params = useParams();

    const [compartmentState, setCompartmentState] = useCompartmentState();

    const compartmentServicesResponse = useFetchCompartmentServices(parseInt(params.compartmentId!));

    useEffect(()=> {
        setCompartmentState(state => ({
            ...state,
            error: compartmentServicesResponse.error,
            message: compartmentServicesResponse.message,
            compartment: {
                ...state.compartment,
                services: compartmentServicesResponse.compartmentServices
            }
        }))

    }, [compartmentServicesResponse, setCompartmentState, compartmentState.compartment.services])

    const [showAddServiceModal, setShowAddServiceModal] = useState(false);

    return (
        <div className={styles.compartment_services_list}>
            <div className={styles.section_header}>
                <div className={styles.title}>{compartmentState.compartment.services?.length} services </div>
                <AddNewNoBackgroundIconButton 
                    label={"Add service"}
                    action={()=> setShowAddServiceModal(true) }
                />
            </div> 
            
            {   
                compartmentState.compartment.services?.length
                ?   <GridList columnCount={3}>
                        {
                            compartmentState.compartment.services?.map(service => {
                                return  <CompartmentServiceCard
                                            key={service.id}
                                            serviceId={service.id}
                                            title={service.title}
                                        />
                            })
                        }
                    </GridList>
                :   <EmptyListMessage message="No service has been added to compartment" />
            }

            {
                showAddServiceModal
                ?   <AddServiceToCompartmentModal 
                        closeModal={()=> setShowAddServiceModal(false)}
                    />
                :   null
            }
        </div>
    )
}