import { selectorFamily, useRecoilValue } from "recoil"
import { 
    IIndividualMedicationsSuccessResponse,
    IndividualAssessmentSessionResponseType, 
    IndividualListResponseType, 
    IndividualProfileSuccessResponseType, 
    IndividualServicesSuccessResponseType, 
    fetchIndividualAssessmentSessionAction, 
    fetchIndividualListAction, 
    fetchIndividualMedicationsAction, 
    fetchIndividualProfileAction, 
    fetchIndividualServicesAction } from "./action"
import formatIndividual from "./utils/formatIndividual"
import { individualInitState } from "./state"
import formatAssessmentSession from "./utils/formatAssessmentSession"

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

const fetchIndividualAssessmentSessionSelector = selectorFamily({
    key: 'fetch_assessments_details_selector',
    get: (assessmentId:string)=> async ()=> {
        return await fetchIndividualAssessmentSessionAction(assessmentId)
        .then((response:IndividualAssessmentSessionResponseType)=> {
            return {
                status:response.status,
                code: response.code,
                error: false,
                assessmentDetails: formatAssessmentSession(response.data.assessmentDetails)
            }
        })
        .catch((error)=> ({
            status:'ERROR',
            code: error.code,
            error: true,
            assessmentDetails: {id:'', title:'', category:'', questions:[], status:'PENDING'}
        }))
    }
})
export const useFetchIndividualAssessmentSession = (assessmentId:string)=> useRecoilValue(fetchIndividualAssessmentSessionSelector(assessmentId))

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

// useFetchIndividualMedicationsSelector