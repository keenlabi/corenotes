import styles from "./assessmentsession.module.css";
import { useEffect, useState } from "react";
import { ReactComponent as IconCancel } from "src/assets/icons/icon-cancel-circle.svg";
import ModalContainer from "src/components/Modal/ModalContainer";
import { useFetchIndividualAssessmentSession } from "src/features/Individual/selector";
import { useIndividualState } from "src/features/Individual/state";
import GridList from "src/components/GridList/GridList";
import QuestionCard from "./QuestionCard";
import { completeAssessmentSessionAction, saveAssessmentSessionAction } from "src/features/Individual/action";
import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton";
import FormWrapper from "src/components/FormComponents/FormWrapper";
import AssessmentStatusCapsule from "./AssessmentStatusCapsule";

export default function AssessmentSession({
    assessmentId, 
    closeAssessment
}:{ assessmentId:string, closeAssessment:()=> void }) {

    const [individualState, setIndividualState] = useIndividualState();

    const assessmentSession = useFetchIndividualAssessmentSession(assessmentId);

    useEffect(()=> {
        if(!assessmentSession.error) {
            setIndividualState(state => {
                return {
                    ...state,
                    status:'SUCCESS',
                    assessments: {
                        ...state.assessments,
                        session: {
                            id: assessmentSession.assessmentDetails.id,
                            title: assessmentSession.assessmentDetails.title,
                            category: assessmentSession.assessmentDetails.category,
                            questions: assessmentSession.assessmentDetails.questions,
                            status: assessmentSession.assessmentDetails.status,
                        }
                    }
                }
            })
        }

        setIsAssessmentComplete(individualState.assessments.session.status === 'COMPLETED' ? true : false)

        return ()=> {
            setIndividualState((state)=> {
                return {
                    ...state,
                    status: 'IDLE',
                    error: false
                }
            })
        }
    }, [assessmentSession, individualState.assessments.session.questions.length, individualState.assessments.session.status, setIndividualState])

    function saveOption (option:string, questionId:string) {
        const stateQuestions = [...individualState.assessments.session!.questions];
        const questionIndex = stateQuestions.findIndex(question => question.id === questionId);

        stateQuestions[questionIndex] = { ...stateQuestions[questionIndex], answer: option === 'YES' ?'YES' :'NO' };

        setIndividualState(state => ({
            ...state,
            assessments:{
                ...state.assessments,
                session: {
                    ...state.assessments.session!,
                    questions: [ ...stateQuestions! ]
                }
            }
        }))

        completeAssessment()
    }

    function saveComment (comment:string, questionId:string) {
        const stateQuestions = [...individualState.assessments.session!.questions];
        const questionIndex = stateQuestions.findIndex(question => question.id === questionId);

        stateQuestions[questionIndex] = { ...stateQuestions[questionIndex], comment: comment };

        setIndividualState(state => ({
            ...state,
            assessments:{
                ...state.assessments,
                session: {
                    ...state.assessments.session!,
                    questions: [ ...stateQuestions! ]
                }
            }
        }))

        completeAssessment()
    }

    function saveAssessmentSession() {
        const payload = {
            questions: individualState.assessments.session!.questions
        }

        setIndividualState(state => {
            return {
                ...state,
                status:'LOADING',
                error:false,
                message:''
            }
        })

        saveAssessmentSessionAction(assessmentId, payload)
        .then((response)=> {
            setIndividualState(state => {
                return {
                    ...state,
                    status:'SUCCESS',
                    message:'Assessment session updated successfully',
                    assessments:{
                        ...state.assessments,
                        session: {
                            ...state.assessments.session!,
                            questions: response.data.assessmentDetails.questions,
                        }
                    }
                }
            })
        })
        .catch((error)=> {
            setIndividualState(state => {
                return {
                    ...state,
                    status:'FAILED',
                    error: true,
                    message: error.message ?? "There was an error saving session, try again"
                }
            })
        })
        .finally(()=> {
            completeAssessment()
        })
    }

    function resetState() {
        setIndividualState(state => ({
            ...state,
            status:'IDLE',
            error:false,
            message:''
        }))
    }

    const [isAssessmentComplete, setIsAssessmentComplete] = useState(false)

    function completeAssessment() {
        const answeredQuestions = individualState.assessments.session?.questions.filter(question => question.answer).length;

        if(answeredQuestions === individualState.assessments.session?.questions.length) {
            setIsAssessmentComplete(true)
        } else setIsAssessmentComplete(false)
    }

    function completeAssessmentSession() {
        const payload = {
            questions: individualState.assessments.session!.questions
        }

        completeAssessmentSessionAction(assessmentId, payload)
        .then((response)=> {
            setIndividualState(state => {
                return {
                    ...state,
                    status:'SUCCESS',
                    message:'Assessment session completed successfully',
                    assessments: {
                        ...state.assessments,
                        session: {
                            ...state.assessments.session!,
                            status:'COMPLETED',
                            questions: response.data.assessmentDetails.questions,
                        }
                    }
                }
            })
        })
        .catch((error)=> {
            setIndividualState(state => {
                return {
                    ...state,
                    status:'FAILED',
                    error: true,
                    message: error.message ?? "There was an error saving session, try again"
                }
            })
        })
        .finally(()=> {
            completeAssessment()
        })
    }

    return (
        <ModalContainer 
            close={()=> ({})}
            contentContainerWidth={"80vw"}
        >
            <FormWrapper state={individualState} resetState={()=> resetState()}>
                <div className={styles.assessment_session_modal}>
                    <div className={styles.header}>
                        <div className={styles.heading}>
                            <div className={styles.title}>{individualState.assessments.session?.title}</div>
                            <AssessmentStatusCapsule 
                                height={"20px"}
                                status={individualState.assessments.session.status} 
                            />
                        </div>
                        
                        {
                            isAssessmentComplete
                            ?   <PrimaryTextButton
                                    width={"15%"}
                                    label="Complete"
                                    isLoading={individualState.status === 'LOADING'}
                                    clickAction={()=> completeAssessmentSession()}
                                />
                            :   <PrimaryTextButton
                                    width={"15%"}
                                    label="Save"
                                    isLoading={individualState.status === 'LOADING'}
                                    clickAction={()=> saveAssessmentSession()}
                                />
                        }

                        <IconCancel onClick={()=> closeAssessment()} />
                    </div>

                    <div className={styles.questions_container}>
                        <GridList columnCount={2}>
                            {   
                                individualState.assessments.session!.questions.map((question, index:number) => {
                                    return  <QuestionCard 
                                                key={question.id}
                                                position={index + 1}
                                                question={question.question}
                                                answer={question.answer}
                                                comment={question.comment}
                                                optionSelectAction={(option:string)=> saveOption(option, question.id)}
                                                commentAction={(comment:string)=> saveComment(comment, question.id)}
                                            />
                                })
                            }
                        </GridList>
                    </div>
                </div>
            </FormWrapper>
        </ModalContainer>
    )
}