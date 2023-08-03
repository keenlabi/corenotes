export default function formatAssessmentSession(assessmentSession:any) {
    if(!assessmentSession) return assessmentSession;

    return ({
        id:assessmentSession.id, 
        title:assessmentSession.title, 
        category:assessmentSession.category, 
        questions:assessmentSession.questions,
        status:assessmentSession.status
    })
}