import styles from "./assessmentslist.module.css";
import { useFetchAssessmentsListSelector } from "src/features/assessment/selector";
import { useEffect, useState } from "react";
import { useIndividualState } from "src/features/Individual/state";
import AssessmentCard from "../../../../Assessments/AssessmentCard";
import GridList from "src/components/GridList/GridList";
import AssessmentSession from "../AssessmentSession/AssessmentSession";

export default function AssessmentsList() {

    const [individualState, setIndividualState] = useIndividualState();

    const assessmentsResponse = useFetchAssessmentsListSelector(individualState.assessments.currentPage, individualState.profile.id || '')

    useEffect(()=> {
        if(!assessmentsResponse.error) {
            setIndividualState(state => ({
                ...state,
                assessments: {
                    ...state.assessments,
                    list: assessmentsResponse.assessments,
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
            setIndividualState(state => ({
                ...state,
                assessments:{
                    ...state.assessments,
                    session: {
                        id: assessmentId,
                        status:'',
                        questions:[],
                        category:'',
                        title:''
                    }
                }
            }))
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
                                    questionsCount={assessment.questions.length}
                                    status={assessment.status}
                                    openAction={()=> toggleTakeAssessmentModal(assessment.id)}
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