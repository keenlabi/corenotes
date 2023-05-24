import { selectorFamily, useRecoilValue } from "recoil"
import { IndividualListResponseType, IndividualProfileSuccessResponseType, fetchIndividualListAction, fetchIndividualProfileAction } from "./action"
import formatIndividuals from "./utils/formatIndividuals"
import formatIndividual from "./utils/formatIndividual"
import { individualState } from "./state"

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
                individual: individualState.profile
            }
        })
    }
})
export const useFetchIndividualSelector = (id:string)=> useRecoilValue(fetchIndividualProfileSelector(id))
