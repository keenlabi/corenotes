import styles from "./medicationdetails.module.css"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMedicationState } from "src/features/medication/state";
import { useFetchMedicationDetailsSelector } from "src/features/medication/selector";
import GoBackButton from "src/components/Buttons/GoBackButton";
import SizedBox from "src/components/SizedBox";
import AddMedicationToServiceModal from "./AddMedicationToServiceModal/AddMedicationToServiceModal";

export default function MedicationDetails() {
    
    const params = useParams();

    const [medicationState, setMedicationState] = useMedicationState();

    const medicationDetailsResponse = useFetchMedicationDetailsSelector(parseInt(params.medicationId!))
    
    useEffect(()=> {
        setMedicationState(state => ({
            ...state,
            error: medicationDetailsResponse.error,
            message: medicationDetailsResponse.error ?medicationDetailsResponse.message :"",
            medicationDetails: medicationDetailsResponse.medication
        }))

    }, [medicationDetailsResponse, setMedicationState])

    const [showAddToServiceModal, setShowAddToServiceModal] = useState(false);
    
    return (
        <div className={styles.medication_details}>
            
            <SizedBox height="30px" />

            <GoBackButton path={"/dashboard/medications"} />

            <SizedBox height="30px" />

            <div className={styles.header}>
                <div className={styles.title}>{ medicationState.medicationDetails.name }</div>
            </div>

            {
                showAddToServiceModal
                ?   <AddMedicationToServiceModal 
                        closeModal={()=> setShowAddToServiceModal(false)} 
                    />
                :   null
            }
        </div>
    )
}

