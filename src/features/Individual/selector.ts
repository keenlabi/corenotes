import { selectorFamily, useRecoilValue } from "recoil"
import {
    IIndividualBehaviorManagementServicesSuccessResponse,
    IIndividualChoreServicesSuccessResponse,
    IIndividualDailyLivingActivityServicesSuccessResponse,
    IIndividualGoalServicesSuccessResponse,
    IIndividualMedicationsSuccessResponse,
    IIndividualSupervisoryReviewsListResponse,
    IndividualAssessmentSessionResponseType, 
    IndividualListResponseType, 
    IndividualProfileSuccessResponseType, 
    IndividualServicesSuccessResponseType, 
    fetchIndividualAssessmentSessionAction, 
    fetchIndividualAssessmentsList, 
    fetchIndividualBehaviorManagementServicesListAction, 
    fetchIndividualChoreServicesListAction, 
    fetchIndividualDailyLivingActivitiesListAction, 
    fetchIndividualDocumentsAction, 
    fetchIndividualGoalsAction, 
    fetchIndividualListAction, 
    fetchIndividualMedicationsAction, 
    fetchIndividualProfileAction, 
    fetchIndividualServicesAction, 
    fetchIndividualSupervisoryReviewHistoryAction} from "./action"
import formatIndividual from "./utils/formatIndividual"
import { individualInitState } from "./state"
import { IIndividualAssessmentSession, IIndividualAssessmentsList, IndividualStateType } from "./types"
import { AssessmentInitState } from "../assessment/state"

interface IFetchIndividualList {
    code:number;
    error:boolean;
    message:string;
    individuals:Pick<IndividualListResponseType, 'data'>['data']
}

const fetchIndividualsListSelector = selectorFamily({
    key: 'fetch_individual_list_selector',
    get: (pageNumber:number)=> async ()=> {
        return await fetchIndividualListAction(pageNumber)
        .then((response)=> {
            return {
                individuals: response.data,
                code: response.code,
                message: response.message,
                error: false

            } satisfies IFetchIndividualList
        })
        .catch((error)=> {
            return {
                individuals: individualInitState.individuals,
                code: error.code,
                message: error.message,
                error: true,
                
            } satisfies IFetchIndividualList
        })
    }
})
export const useFetchIndividualListSelector = (pageNumber:number)=> useRecoilValue(fetchIndividualsListSelector(pageNumber))

const fetchIndividualProfileSelector = selectorFamily({
    key: 'fetch_individual_profile_selector',
    get: (individualId:string)=> async ()=> {
        return await fetchIndividualProfileAction(individualId)
        .then((response:IndividualProfileSuccessResponseType)=> {
            return {
                individual: formatIndividual(response.data.individual),
                code: response.code,
                message: '',
                error: false
            }
        })
        .catch((error)=> {
            return {
                code: error.code,
                error: true,
                message: error.message,
                individual: individualInitState.profile
            }
        })
    }
})
export const useFetchIndividualSelector = (individualId:string)=> useRecoilValue(fetchIndividualProfileSelector(individualId))

interface IIndividualAssessmentsListResponse {
    code:number;
    message:string;
    error:boolean;
    individualAssessments:{
        list:IIndividualAssessmentsList[];
        currentPage:number;
        totalPages:number;
    }
}

const fetchIndividualAssessmentSelector = selectorFamily({
    key: 'fetch_individual_assessments_selector',
    get: ({individualId, pageNumber}:{individualId:number, pageNumber:number})=> async ()=> {
        return await fetchIndividualAssessmentsList(individualId, pageNumber)
        .then((response)=> {
            return {
                code: response.code,
                error: false,
                message: response.message,
                individualAssessments: response.data.individualAssessments

            } satisfies IIndividualAssessmentsListResponse
        })
        .catch((error)=> {
            return {
                code: error.code,
                error: true,
                message: error.message,
                individualAssessments: individualInitState.assessments

            } satisfies IIndividualAssessmentsListResponse
        })
    }
})
export const useFetchIndividualAssessmentsList = (individualId:number, pageNumber:number)=> useRecoilValue(fetchIndividualAssessmentSelector({individualId, pageNumber}))

interface IFetchIndividualAssessmentSession {
    code:number;
    message:string;
    error:boolean;
    assessmentSession:IIndividualAssessmentSession
}

const fetchIndividualAssessmentSessionSelector = selectorFamily({
    key: 'fetch_assessments_session_selector',
    get: ({ individualId, assessmentId}:{individualId:number, assessmentId:string})=> async ()=> {
        return await fetchIndividualAssessmentSessionAction(individualId, assessmentId)
        .then((response:IndividualAssessmentSessionResponseType)=> {
            return {
                code: response.statusCode!,
                message: response.message,
                error: false,
                assessmentSession: response.data.assessmentSession

            } satisfies IFetchIndividualAssessmentSession
        })
        .catch((error)=> {
            return {
                code: error.statusCode,
                message: error.message,
                error: true,
                assessmentSession: AssessmentInitState.assessmentSession

            } satisfies IFetchIndividualAssessmentSession
        })
    }
})
export const useFetchIndividualAssessmentSession = (individualId:number, assessmentId:string)=> useRecoilValue(fetchIndividualAssessmentSessionSelector({ individualId, assessmentId }))

interface IFetchIndividualServicesList {
    individualServices: Pick<IndividualServicesSuccessResponseType, 'data'>['data']['individualServices'];
    code:number;
    message:string;
    error:boolean;
}

const fetchIndividualServicesListSelector = selectorFamily({
    key:'fetch_individual_services_list_selector',
    get: (individualId:string)=> async ()=> {
        return await fetchIndividualServicesAction(individualId)
        .then((response:IndividualServicesSuccessResponseType)=> {
            return {
                message: response.message,
                code: response.code,
                error: false,
                individualServices: response.data.individualServices

            } satisfies IFetchIndividualServicesList
        })
        .catch((error)=> {
            console.log(error)
            return {
                code: error.statusCode,
                message: error.message,
                error: false,
                individualServices: individualInitState.services
                
            } satisfies IFetchIndividualServicesList
        })
    }
})

export const useFetchIndividualServicesList = (individualId:string)=> useRecoilValue(fetchIndividualServicesListSelector(individualId))

interface IFetchIndividualMedicationsList {
    medications: Pick<IIndividualMedicationsSuccessResponse, 'data'>['data'];
    code:number;
    message:string;
    error:boolean;
}

const fetchIndividualMedicationsListSelector = selectorFamily({
    key:'fetch_individual_medications_list_selector',
    get: ({individualId, pageNumber}:{individualId:number, pageNumber:number})=> async ()=> {
        return await fetchIndividualMedicationsAction(individualId, pageNumber)
        .then((response)=> {
            return {
                message: response.message,
                code: response.code,
                error: false,
                medications: response.data

            } satisfies IFetchIndividualMedicationsList
        })
        .catch((error)=> {
            console.log(error)
            return {
                code: error.statusCode,
                message: error.message,
                error: false,
                medications: individualInitState.medications
                
            } satisfies IFetchIndividualMedicationsList
        })
    }
})
export const useFetchIndividualMedicationsList = (individualId:number, pageNumber:number)=> useRecoilValue(fetchIndividualMedicationsListSelector({individualId, pageNumber}))


interface IFetchIndividualGoalsList {
    goals: Pick<IIndividualGoalServicesSuccessResponse, 'data'>['data'];
    code:number;
    message:string;
    error:boolean;
}

const fetchIndividualGoalsListSelector = selectorFamily({
    key:'fetch_individual_goals_list_selector',
    get: ({individualId, pageNumber}:{individualId:number, pageNumber:number})=> async ()=> {
        return await fetchIndividualGoalsAction(individualId, pageNumber)
        .then((response)=> {
            return {
                message: response.message,
                code: response.code,
                error: false,
                goals: response.data

            } satisfies IFetchIndividualGoalsList
        })
        .catch((error)=> {
            return {
                code: error.statusCode,
                message: error.message,
                error: false,
                goals: individualInitState.goalServices
                
            } satisfies IFetchIndividualGoalsList
        })
    }
})
export const useFetchIndividualGoalsList = (individualId:number, pageNumber:number)=> useRecoilValue(fetchIndividualGoalsListSelector({individualId, pageNumber}))


interface IFetchIndividualDailyActivityList {
    dailyLivingActivities: Pick<IIndividualDailyLivingActivityServicesSuccessResponse, 'data'>['data'];
    code:number;
    message:string;
    error:boolean;
}
const fetchIndividualDailyActivitiesSelector = selectorFamily({
    key:'fetch_individual_daily_living_activities_list_selector',
    get: ({individualId, pageNumber}:{individualId:number, pageNumber:number})=> async ()=> {
        return await fetchIndividualDailyLivingActivitiesListAction(individualId, pageNumber)
        .then((response)=> {
            return {
                message: response.message,
                code: response.code,
                error: false,
                dailyLivingActivities: response.data

            } satisfies IFetchIndividualDailyActivityList
        })
        .catch((error)=> {
            return {
                code: error.statusCode,
                message: error.message,
                error: false,
                dailyLivingActivities: individualInitState.dailyLivingActivities
                
            } satisfies IFetchIndividualDailyActivityList
        })
    }
})
export const useFetchIndividualDailyLivingActivitiesList = (individualId:number, pageNumber:number)=> useRecoilValue(fetchIndividualDailyActivitiesSelector({individualId, pageNumber}))


interface IFetchIndividualSupervisoryReviewsList {
    supervisoryReviews:Pick<IIndividualSupervisoryReviewsListResponse, 'data'>['data'];
    code:number;
    message:string;
    error:boolean;
}
const fetchIndividualSupervisoryReviewHistory = selectorFamily({
    key:"fetch_individual_med_review_history",
    get: ({individualId, medId, pageNumber}:{individualId:number, medId:number, pageNumber:number})=> async ()=> {
        return await fetchIndividualSupervisoryReviewHistoryAction(individualId, medId, pageNumber)
        .then((response)=> {
            return {
                message: response.message,
                code: response.code,
                error: false,
                supervisoryReviews: response.data,

            } satisfies IFetchIndividualSupervisoryReviewsList
        })
        .catch((error)=> {
            return {
                code: error.statusCode,
                message: error.message,
                error: false,
                supervisoryReviews: individualInitState.supervisoryMedicationReviews
                
            } satisfies IFetchIndividualSupervisoryReviewsList
        })
    }
})
export const useFetchReviewHistorySelector = (individualId:number, medId:number, pageNumber:number)=> useRecoilValue(fetchIndividualSupervisoryReviewHistory({ individualId, medId, pageNumber }))


interface IFetchIndividualBehaviorManagementServicesList {
    behaviorManagementServices:Pick<IIndividualBehaviorManagementServicesSuccessResponse, 'data'>['data'];
    code:number;
    message:string;
    error:boolean;
}
const fetchIndividualBehaviorManagementServices = selectorFamily({
    key:"fetch_individual_behavior_manangement_services",
    get: ({individualId, pageNumber}:{individualId:number, pageNumber:number})=> async ()=> {
        return fetchIndividualBehaviorManagementServicesListAction(individualId, pageNumber)
        .then((response)=> {
            return {
                error: false,
                code: response.code,
                message: response.message,
                behaviorManagementServices: response.data

            } satisfies IFetchIndividualBehaviorManagementServicesList
        })
        .catch((error)=> {
            return { 
                error: true,
                code: error.code,
                message: error.message,
                behaviorManagementServices: individualInitState.behaviorsServices
                
            } satisfies IFetchIndividualBehaviorManagementServicesList
        });
    }
})
export const useFetchIndividualBehaviorManangementServicesSelector = (individualId:number, pageNumber:number)=> useRecoilValue(fetchIndividualBehaviorManagementServices({ individualId, pageNumber }))

interface IFetchIndividualChoreServicesList {
    choreServices:Pick<IIndividualChoreServicesSuccessResponse, 'data'>['data'];
    code:number;
    message:string;
    error:boolean;
}
const fetchIndividualChoreServices = selectorFamily({
    key:"fetch_individual_chore_services",
    get: ({individualId, pageNumber}:{individualId:number, pageNumber:number})=> async ()=> {
        return fetchIndividualChoreServicesListAction(individualId, pageNumber)
        .then((response)=> {
            return {
                error: false,
                code: response.code,
                message: response.message,
                choreServices: response.data

            } satisfies IFetchIndividualChoreServicesList
        })
        .catch((error)=> {
            return { 
                error: true,
                code: error.code,
                message: error.message,
                choreServices: individualInitState.choreServices
                
            } satisfies IFetchIndividualChoreServicesList
        });
    }
})
export const useFetchIndividualChoreServicesSelector = (individualId:number, pageNumber:number)=> useRecoilValue(fetchIndividualChoreServices({ individualId, pageNumber }))

interface IFetchIndividualDocument {
    data:Pick<IndividualStateType, 'documents'>['documents'];
    code:number;
    message:string;
    error:boolean
}

const fetchIndividualDocumentsSelector = selectorFamily({
    key: 'fetch_individual_documents_selector',
    get: ({id, pageNumber}:{id:string, pageNumber:number})=> async ()=> {
        return await fetchIndividualDocumentsAction(id, pageNumber)
        .then((response)=> {
            return {
                data: response.data,
                code: response.code,
                message: response.message,
                error: false

            } satisfies IFetchIndividualDocument
        })
        .catch((error)=> {
            return {
                code: error.code,
                error: true,
                message: error.message,
                data: individualInitState.documents

            } satisfies IFetchIndividualDocument
        })
    }
})
export const useFetchIndividualDocumentsSelector = (id:string, pageNumber:number)=> useRecoilValue(fetchIndividualDocumentsSelector({id, pageNumber}))
