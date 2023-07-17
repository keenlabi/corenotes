import DataLoadingError from "src/components/DataLoadingError";
import IndividualMedicationCard from "./IndividualMedicationCard";
import styles from "./individualmedicationslist.module.css";
import { useIndividualState } from "src/features/Individual/state";
import { useFetchIndividualMedicationsList } from "src/features/Individual/selector";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import GridList from "src/components/GridList/GridList";

export default function IndividualMedicationsList() {

    const param = useParams();

    const [individualState, setIndividualState] = useIndividualState();

    const fetchMedicationsListResponse = useFetchIndividualMedicationsList(parseInt(param.individualId!), individualState.medications.currentPage)

    useEffect(()=> {
        setIndividualState(state => ({
            ...state,
            medications: fetchMedicationsListResponse.medications
        }))
    }, [fetchMedicationsListResponse, setIndividualState])

    return (
        <div className={styles.individual_medications_list}>
            <GridList columnCount={2}>
                {
                    individualState.medications.list.length
                    ?   individualState.medications.list.map( medication => {
                            return  <IndividualMedicationCard
                                        key={medication.id}
                                        name={medication.name}
                                        strength={medication.strength}
                                        amount={medication.amount}
                                        frequency={medication.frequency}
                                        time={medication.time}
                                        action={()=> ({})}
                                    />
                        })
                    :   <DataLoadingError message="Individual has no medications" />
                }
            </GridList>
        </div>
    )
}