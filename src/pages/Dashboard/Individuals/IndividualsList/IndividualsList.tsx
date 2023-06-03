import styles from "./individualslist.module.css";
import { useEffect, useState } from "react";
import AddNewStaffModal from "./AddNewIndividualModal";
import { useIndividualState } from "src/features/Individual/state";
import IndividualsListHeader from "./IndividualsListHeader";
import IndividualsListTable from "./IndividualsListTable";
import { useFetchIndividualListSelector } from "src/features/Individual/selector";

export default function IndividualsList() {

    const [individualState, setIndividualState] = useIndividualState();
    const individualListResponse = useFetchIndividualListSelector(individualState.currentListPage);

    const [isNewIndividualModalVisible, setIsNewIndividualModalVisible] = useState(false)

    useEffect(()=> {
        if(!individualListResponse.error) {
            setIndividualState((state)=> {
                return {
                    ...state,
                    status: 'SUCCESS',
                    error: false,
                    message: individualListResponse.message,
                    list: individualListResponse.individuals
                }
            })
        } else {
            setIndividualState((state)=> {
                return {
                    ...state,
                    status: 'FAILED',
                    error: true,
                    message: individualListResponse.message
                }
            })
        }
    }, [individualListResponse, setIndividualState])

    return (
        <div className={styles.staff_list}>
            
            <IndividualsListHeader 
                showNewStaffModal={()=> setIsNewIndividualModalVisible(true)}
                // showNewAssessmentModal={()=> navigate({pathname: 'assessments/new'})}
            />

            <IndividualsListTable
                individuals={individualState.list}
                currentPage={0} 
                totalPages={0} 
                goToPage={(pageNumber:number)=> console.log(pageNumber)} 
                errorMessage={individualState.message}
            />

            {
                isNewIndividualModalVisible
                ?   <AddNewStaffModal 
                        closeModal={()=> setIsNewIndividualModalVisible(false)}
                    />
                :   null
            }          
        </div>
    )
}