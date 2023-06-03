import { selectorFamily, useRecoilValue } from "recoil"
import { IndividualAssessmentSessionResponseType, IndividualListResponseType, IndividualProfileSuccessResponseType, fetchIndividualAssessmentSessionAction, fetchIndividualListAction, fetchIndividualProfileAction } from "./action"
import formatIndividuals from "./utils/formatIndividuals"
import formatIndividual from "./utils/formatIndividual"
import { individualInitState } from "./state"
import formatAssessmentSession from "./utils/formatAssessmentSession"

const fetchIndividualsListSelector = selectorFamily({
    key: 'fetch_individual_list_selector',
    get: (pageNumber:number)=> async ()=> {
        return await fetchIndividualListAction(pageNumber)
        .then(({data}:IndividualListResponseType)=> {
            return {
                individuals: formatIndividuals(data.individuals),
                code: 200,
                message: '',
                error: false
            }
        })
        .catch((error)=> {
            return {
                code: error.code,
                error: true,
                message: error.message,
                individuals: []
            }
        })
    }
})
export const useFetchIndividualListSelector = (pageNumber:number)=> useRecoilValue(fetchIndividualsListSelector(pageNumber))

const fetchIndividualProfileSelector = selectorFamily({
    key: 'fetch_individual_profile_selector',
    get: (id:string)=> async ()=> {
        return await fetchIndividualProfileAction(id)
        .then((response:IndividualProfileSuccessResponseType)=> {
            return {
                individual: formatIndividual(response.data.individual),
                code: 200,
                message: '',
                error: false
            }
        })
        .catch((error)=> {
            console.log(error)
            return {
                code: 500,
                error: true,
                message: error.response.message,
                individual: individualInitState.profile
            }
        })
    }
})
export const useFetchIndividualSelector = (id:string)=> useRecoilValue(fetchIndividualProfileSelector(id))

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