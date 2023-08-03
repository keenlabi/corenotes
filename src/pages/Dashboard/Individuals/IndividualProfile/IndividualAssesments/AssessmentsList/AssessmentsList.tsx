import styles from "./assessmentslist.module.css";
import { useFetchAssessmentsListSelector } from "src/features/assessment/selector";
import { useEffect, useState } from "react";
import { useIndividualState } from "src/features/Individual/state";
import AssessmentCard from "../../../../Assessments/AssessmentCard";
import GridList from "src/components/GridList/GridList";
import AssessmentSession from "../AssessmentSession/AssessmentSession";

export default function AssessmentsList() {

    const [individualState, setIndividualState] = useIndividualState();

    const assessmentsResponse = useFetchAssessmentsListSelector(individualState.assessments.currentPage)

    useEffect(()=> {
        if(!assessmentsResponse.error) {
            setIndividualState(state => ({
                ...state,
                assessments: {
                    ...state.assessments,
                    list: assessmentsResponse.assessments.list,
                    currentPage: 1,
                    totalPages: 1
                }
            }))
        }

        return ()=> {
            setIndividualState((state)=> {
                return {
                    ...state,
                    status: 'IDLE',
                    error: false
                }
            })
        }
    }, [assessmentsResponse, setIndividualState])

    const [isAssessmentModalVisible, setIsAssessmentModalVisible] = useState(false)

    function toggleTakeAssessmentModal(assessmentId:string) {
        if(individualState.assessments.session.id !== assessmentId) {
            // setIndividualState(state => ({
            //     ...state,
            //     assessments:{
            //         ...state.assessments,
            //         session: {
            //             id: assessmentId,
            //             status: "IN-PROGRESS",
            //             questions:,
            //             category:'',
            //             title:''
            //         }
            //     }
            // }))
        }
        setIsAssessmentModalVisible(!isAssessmentModalVisible)
    }
  

    return (
        <div className={styles.assessment_list}>
            <GridList columnCount={3}>
                {
                    individualState.assessments.list.map(assessment => {
                        return  <AssessmentCard
                                    key={assessment.id}
                                    category={assessment.category}
                                    title={assessment.title}
                                    questionsCount={assessment.questionsCount}
                                    openAction={() => toggleTakeAssessmentModal(assessment.id)} 
                                    assignedTo={""}
                                />
                    })
                }
            </GridList>

            {
                isAssessmentModalVisible
                ?   <AssessmentSession 
                        assessmentId={individualState.assessments.session!.id}
                        closeAssessment={() => toggleTakeAssessmentModal('')} 
                    />
                :   null
            }
        </div>
    )
}