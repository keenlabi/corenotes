import styles from "./compartmentserviceslist.module.css";
import GridList from "src/components/GridList/GridList";
import { useCompartmentStateValue } from "src/features/compartment/state";
import CompartmentServiceCard from "./CompartmentServiceCard";
import AddNewNoBackgroundIconButton from "src/components/Buttons/AddNewNoBackgroundIconButton";
import { useState } from "react";
import AddServiveToCompartmentModal from "./AddServiveToCompartmentModel";

export default function CompartmentServiceList() {

    const compartmentState = useCompartmentStateValue()

    const [showAttachServiceToCompartment, setShowAttachServiceToCompartment] = useState(false);

    return (
        <div className={styles.compartment_services_list}>

            <div className={styles.section_header}>
                <div className={styles.title}>{compartmentState.compartment.services.length} Services</div>
                <AddNewNoBackgroundIconButton 
                    label={"Add service"}
                    action={()=> setShowAttachServiceToCompartment(true) }
                />
            </div> 

            <GridList columnCount={3}>
                {
                    compartmentState.compartment.services?.map((service, index)=> {
                        return  <CompartmentServiceCard
                                    key={`service.serviceId_${index}`}
                                    serviceId={service.serviceId} 
                                    title={service.title}
                                    description={service.description}
                                    individualsCount={service.individuals.length}
                                />
                    })
                }
            </GridList>
                
            {
                showAttachServiceToCompartment
                ?   <AddServiveToCompartmentModal closeModal={()=> setShowAttachServiceToCompartment(false)} />
                :   null
            }
        </div>
    )
}