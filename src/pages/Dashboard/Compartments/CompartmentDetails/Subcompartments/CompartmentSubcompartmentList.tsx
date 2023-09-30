import styles from "./compartmentsubcompartmentlist.module.css";
import GridList from "src/components/GridList/GridList";
import { useCompartmentStateValue } from "src/features/compartment/state";
import AddNewNoBackgroundIconButton from "src/components/Buttons/AddNewNoBackgroundIconButton";
import { useState } from "react";
import SubcompartmentCard from "./SubcompartmentCard";
import CreateNewSubCompartmentModal from "../Subcompartments/CreateNewSubCompartmentModal/CreateNewSubCompartmentModal";

export default function CompartmentSubcompartmentList() {

    const compartmentState = useCompartmentStateValue()

    const [showNewSubCompartmentModal, setShowNewSubCompartmentModal] = useState(false);

    return (
        <div className={styles.compartment_services_list}>

            <div className={styles.section_header}>
                <div className={styles.title}>{compartmentState.compartment.subCompartments.length} subcompartments</div>
                <AddNewNoBackgroundIconButton 
                    label={"New Subcompartment"}
                    action={()=> setShowNewSubCompartmentModal(true) }
                />
            </div> 

            <GridList columnCount={3}>
                {
                    compartmentState.compartment.subCompartments?.map((subCompartment, index)=> {
                        return  <SubcompartmentCard
                                    key={`service.serviceId_${index}`}
                                    subCompartmentId={subCompartment.id} 
                                    title={subCompartment.title}
                                    description={subCompartment.description}
                                    individualsCount={subCompartment.individualsCount}
                                />
                    })
                }
            </GridList>

            {
                showNewSubCompartmentModal
                ?   <CreateNewSubCompartmentModal closeModal={()=> setShowNewSubCompartmentModal(false)} />
                :   null
            }
        </div>
    )
}