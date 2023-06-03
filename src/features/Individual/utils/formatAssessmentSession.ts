import { AssessmentModelType } from "src/features/assessment/types";

export default function formatAssessmentSession(assessmentSession:AssessmentModelType) {
    if(!assessmentSession) return assessmentSession;

    return ({
        id:assessmentSession.id, 
        title:assessmentSession.title, 
        category:assessmentSession.category, 
        questions:assessmentSession.questions,
        status:assessmentSession.status
    })
}