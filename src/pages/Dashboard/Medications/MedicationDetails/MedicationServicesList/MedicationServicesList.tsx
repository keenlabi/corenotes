import styles from "./medicationserviceslist.module.css";
import GridList from "src/components/GridList/GridList";
import { useMedicationStateValue } from "src/features/medication/state";
import MedicationServiceCard from "../MedicationServiceCard";
import SizedBox from "src/components/SizedBox";
import { useState } from "react";
import MedicationServiceIndividualsModal from "../MedicationServiceIndividualsModal";
import { useParams } from "react-router-dom";
import { fetchMedicationServicesIndividualsAction } from "src/features/medication/action";
import { IndividualListItemType } from "src/features/Individual/types";

export default function MedicationServicesList() {

    const params = useParams();

    const medicationState = useMedicationStateValue()

    const [showServiceIndividualsModal, setShowServiceIndividualsModal] = useState(false);

    function fetchIndividuals(serviceId:number) {
        setShowServiceIndividualsModal(true);

        fetchMedicationServicesIndividualsAction(parseInt(params.medicationId!), serviceId)
        .then((response)=> {
            setIndividualsList(state => ({
                ...state,
                list: response.data.individuals
            }))
        })
        .catch((error)=> {
            setIndividualsList(state => ({
                ...state,
                message: error.message
            }))
        })
    }

    const [individualsList, setIndividualsList] = useState<{
        list:Array<IndividualListItemType>;
        currentPage:number;
        totalPages:number;
        message:string;

    }>({
        list: [],
        currentPage: 1,
        totalPages: 1,
        message:''
    })

    return (
        <div className={styles.compartment_services_list}>

            <div className={styles.section_header}>
                <div className={styles.title}>{medicationState.medicationDetails.services?.length} Services</div>
            </div> 
            
            <SizedBox height={"30px"} />

            <GridList columnCount={3}>
                {
                    medicationState.medicationDetails.services?.map((service, index)=> {
                        return  <MedicationServiceCard
                                    key={`service.serviceId_${index}`}
                                    title={service.title}
                                    description={service.description}
                                    individualsCount={service.individualsCount}
                                    action={()=> fetchIndividuals(service.serviceId)}
                                />
                    })
                }
            </GridList>

            {
                showServiceIndividualsModal
                ?   <MedicationServiceIndividualsModal
                        individuals={individualsList.list}
                        currentPage={individualsList.currentPage}
                        totalPages={individualsList.totalPages}
                        message={individualsList.message}
                        closeModal={()=> setShowServiceIndividualsModal(false)}
                    />
                :   null
            }
        </div>
    )
}