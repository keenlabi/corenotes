import ModalContainer from "src/components/Modal/ModalContainer";
import { ReactComponent as IconCancelCircle } from "src/assets/icons/icon-cancel-circle.svg";
import styles from "./addindividualassessmentmodel.module.css";
import FadedBackgroundButton from "src/components/Buttons/FadedBackgroundButton";
import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton";
import { useSetIndividualState } from "src/features/Individual/state";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAssessmentState } from "src/features/assessment/state";
import GridList from "src/components/GridList/GridList";
import DataLoadingError from "src/components/DataLoadingError";
import SelectAssessmentCard from "./SelectAssessmentCard";
import { addAssessmentToIndividualAction } from "src/features/Individual/action";
import { useFetchAssessmentsToAssignListSelector } from "src/features/Individual/selector";
import { addEventFeedbackItem, useGlobalEventFeedbackState } from "src/features/globalEventFeedback/state";

export interface IAssessmentToSelect {
    id:string;
    assessmentId:string;
    title:string;
    category:string;
    questionsCount:number;
    status:string;
    assessmentType:string;
    isSelected:boolean
}

export default function AddIndividualAssessmentModal({ closeModal }:{ closeModal:()=> void }) {

    const { individualId } = useParams();

    const newEventFeedBack = {
        status: "",
        message: ""
    }

    const setIndividualState = useSetIndividualState();

    const [globalEventFeedback, setGlobalEventFeedback] = useGlobalEventFeedbackState();

	const [assessmentState, setAssessmentState] = useAssessmentState();

    const [assessmentsToSelectFrom, setAssessmentsToSelectFrom] = useState<IAssessmentToSelect[]>([]);

	const fetchAssessmentsListResponse = useFetchAssessmentsToAssignListSelector(parseInt(individualId!), assessmentState.assessments.currentPage);
    
    useEffect(()=> {
        // console.log(fetchAssessmentsListResponse)
        setAssessmentState(state => ({
            ...state,
            error: fetchAssessmentsListResponse.error,
            message: fetchAssessmentsListResponse.message,
            assessments: {
                ...state.assessments,
                ...fetchAssessmentsListResponse.assessments
            }
        })) 

        fetchAssessmentsListResponse.assessments.list.forEach(assessment => {
            if(!assessmentsToSelectFrom.filter(state => state.id === assessment.id).length){
                assessmentsToSelectFrom.push({
                    ...assessment,
                    isSelected: false
                })
            }
        })

        setAssessmentsToSelectFrom([...assessmentsToSelectFrom]);

    }, [assessmentsToSelectFrom, fetchAssessmentsListResponse, setAssessmentState])

    const [selectedAssessmentIds, setSelectedAssessmemtIds] = useState<string[]>([]);

    const [isButtonEnabled, setIsButtonEnabled] = useState(false);

    function selectAssessmentToAdd(assessmentId:string) {

        const selectedAssessmentIndex = assessmentsToSelectFrom.findIndex((assessment)=> assessment.id === assessmentId);
        const currentSelectedState = assessmentsToSelectFrom[selectedAssessmentIndex].isSelected;

        let newSelectedAssessmentIds:string[] = []

        if(currentSelectedState) { 
            assessmentsToSelectFrom[selectedAssessmentIndex].isSelected = false;
            newSelectedAssessmentIds = selectedAssessmentIds.filter(selectedAssessmentId => selectedAssessmentId !== assessmentId)

        } else {
            assessmentsToSelectFrom[selectedAssessmentIndex].isSelected = true;
            newSelectedAssessmentIds = [...selectedAssessmentIds, assessmentId]
        }

        setSelectedAssessmemtIds([...newSelectedAssessmentIds])
        setAssessmentsToSelectFrom([...assessmentsToSelectFrom])

        if(newSelectedAssessmentIds.length) setIsButtonEnabled(true)
        else setIsButtonEnabled(false)
    }

    function submitForm() {
        const payload = { assessments: selectedAssessmentIds }

        setAssessmentState(state => ({
            ...state,
            status: "LOADING",
            error: false,
            message: ""
        }))

        addAssessmentToIndividualAction(individualId!, payload)
        .then((response)=> {
            setAssessmentState(state => ({
                ...state,
                status: "IDLE",
            }))

            setIndividualState(state => ({
                ...state,
                status: "SUCCESS",
                error: false,
                message: "Assessment added successfully",
                assessments: {
                    ...state.assessments,
                    ...response.data.individualAssessments
                }
            }))

            newEventFeedBack.status = "SUCCESS";
            newEventFeedBack.message = "Assessment assigned to individual successfully";

            closeModal()
        })
        .catch((error)=> {
            setIndividualState(state => ({
                ...state,
                status: "FAILED",
                error: false,
                message: "There was an error adding assessment to user"
            }))

            newEventFeedBack.status = "ERROR";
            newEventFeedBack.message = error.message ?? "There was an error assigning to individual successfully";
        })
        .finally(()=> addEventFeedbackItem(newEventFeedBack, [...globalEventFeedback], setGlobalEventFeedback))
    }

    return (
        <ModalContainer close={()=> closeModal()}>
            <div className={styles.add_individual_service_modal}>

                <div className={styles.header}>
                    <div className={styles.heading}>Add assessment to individual</div>
                    <IconCancelCircle onClick={()=> closeModal()} />
                </div>

                <div className={styles.body}>
                    <div className={styles.assessments_list}>
                        <GridList columnCount={2}>
                            {
                                assessmentsToSelectFrom.length
                                ?   assessmentsToSelectFrom.map( (assessment) => {
                                        return  <SelectAssessmentCard
                                                    key={assessment.id}
                                                    title={assessment.title}
                                                    category={assessment.category} 
                                                    questionsCount={assessment.questionsCount}
                                                    assessmentType={assessment.assessmentType}
                                                    path={assessment.assessmentId} 
                                                    isSelected={assessment.isSelected}
                                                    selectAction={()=> selectAssessmentToAdd(assessment.id)}                    
                                                />
                                            
                                    })
                                :   <DataLoadingError message="There are no assessments to show" />
                            }
                        </GridList>
                    </div>
                </div>

                <div className={styles.buttons}>
                    <FadedBackgroundButton 
                        width="200px"
                        label="Cancel"
                        labelColor={"var(--blue-accent-200)"}
                        backgroundColor={"var(--blue-accent-faded-100)"}
                        action={() => close()}
                    />
                    
                    <PrimaryTextButton
                        width="200px"
                        label="Assign Service"
                        clickAction={()=> submitForm()}
                        disabled={!isButtonEnabled}
                        isLoading={assessmentState.status === 'LOADING'}
                    />
                </div>
            </div>
        </ModalContainer>
    )
}