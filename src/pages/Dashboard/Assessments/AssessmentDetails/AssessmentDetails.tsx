import GoBackButton from "src/components/Buttons/GoBackButton";
import styles from "./assessmentdetails.module.css";
import { useFetchAssessmentDetailsResponse } from "src/features/assessment/selector";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAssessmentState } from "src/features/assessment/state";
import DataLoadingError from "src/components/DataLoadingError";
import GridList from "src/components/GridList/GridList";
import AssessmentQuestion from "../AssessmentQuestion";

export default function AssessmentDetails() {

    const params = useParams()

    const [assessmentState, setAssessmentState] = useAssessmentState();

    const assessmentDetailsResponse = useFetchAssessmentDetailsResponse(params.assessmentId!)

    useEffect(()=> {
        console.log(assessmentDetailsResponse.assessment);
        setAssessmentState(state => ({
            ...state,
            error: assessmentDetailsResponse.error,
            assessmentDetails: assessmentDetailsResponse.assessment
        }))

    }, [assessmentDetailsResponse, setAssessmentState])

    return (
        <div className={styles.assessment_details_page}>
            <GoBackButton path={"/dashboard/individuals/assessments"} />

            {
                assessmentState.error
                ?   <DataLoadingError message={assessmentState.message} />
                :   <div className={styles.assessment_details}>
                        <div className={styles.title}>{assessmentState.assessmentDetails.title}</div>

                        <div className={styles.category}>{assessmentState.assessmentDetails.category}</div>

                        <div className={styles.questions}>
                            <GridList columnCount={2}>
                                {
                                    assessmentState.assessmentDetails.questions.map((question, index) => {
                                        return  <AssessmentQuestion 
                                                    key={question.id}
                                                    sNumber={++index}
                                                    question={question.question}
                                                    category={question.category}
                                                />
                                    })
                                }
                            </GridList>
                        </div>
                    </div>
            }
        </div>
    )
}