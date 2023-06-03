import { selector, selectorFamily, useRecoilValue } from "recoil"
import { AssessmentCategoriesResponseType, AssessmentListResponseType, fetchAssessmentCategoriesAction, fetchAssessmentsAction } from "./action"

const fetchAssessmentsListSelector = selectorFamily({
    key: 'fetch_assessments_list_selector',
    get: (payload:{pageNumber:number, individualId:string})=> async ()=> {
        return await fetchAssessmentsAction(payload)
        .then(({data}:AssessmentListResponseType)=> {
            return {
                assessments: data.assessments,
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
                assessments: []
            }
        })
    }
})
export const useFetchAssessmentsListSelector = (pageNumber:number, individualId:string)=> useRecoilValue(fetchAssessmentsListSelector({pageNumber, individualId}))

const fetchAssessmentCategoriesSelector = selector({
    key: 'fetch_assessments_category_selector',
    get: async ()=> {
        return await fetchAssessmentCategoriesAction()
        .then((response:AssessmentCategoriesResponseType)=> {
            console.log(response)
            return {
                status:response.status,
                code: response.code,
                error: false,
                assessmentCategories: response.data.assessmentCategories,
                questionCategories: response.data.questionCategories,
            }
        })
        .catch((error)=> ({
            status:'ERROR',
            code: error.code,
            error: true,
            assessmentCategories:[],
            questionCategories:[]
        }))
    }
})
export const useFetchAssessmentCategories = ()=> useRecoilValue(fetchAssessmentCategoriesSelector)