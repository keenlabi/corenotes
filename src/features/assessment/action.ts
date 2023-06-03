import { getFetch, postFetch } from "src/lib/fetch"
import { successResponseType } from "src/lib/types"
import { AssessmentModelType } from "./types"

export interface AssessmentListResponseType extends Omit<successResponseType, 'data'> {
    data: {
        assessments: AssessmentModelType[],
        currentListPage: string,
        totalListPage: string
    }
}

export function createAssessmentAction(payload: {
    title:string,
    category:string,
    questions:Array<{category:string, question:string}>,
    assignees: {
        assigneesType:'ALL'|'SPECIFIC',
        assigneesList:Array<string>
    }
}) {
    return new Promise<AssessmentListResponseType>((resolve, reject)=> {
        postFetch('/assessments', payload)
        .then((response:successResponseType)=> {
            resolve({
                ...response,
                data: {
                    assessments: response.data.assessments,
                    currentListPage: response.data.currentListPage,
                    totalListPage: response.data.totalListPages
                }
            })
        })
        .catch((error)=> reject({error}))
    })
}

export function fetchAssessmentsAction({pageNumber, individualId}:{pageNumber:number, individualId:string}) {
    return new Promise<AssessmentListResponseType>((resolve, reject)=> {
        getFetch(`/assessments/${individualId}/${pageNumber}`)
        .then((response:successResponseType)=> {
            
            resolve({
                ...response,
                data: {
                    assessments: response.data.assessments,
                    currentListPage: response.data.currentListPage,
                    totalListPage: response.data.totalListPages
                }
            })
        })
        .catch((error)=> reject({error}))
    })
}

export interface AssessmentCategoriesResponseType extends Omit<successResponseType, 'data'> {
    data: {
        assessmentCategories: {
            id:string,
            name:string
        }[],
        questionCategories: {
            id:string,
            name:string
        }[]
    }
}

export function fetchAssessmentCategoriesAction() {
    return new Promise<AssessmentCategoriesResponseType>((resolve, reject)=> {
        getFetch(`/assessments/categories`)
        .then((response:successResponseType)=> {
            resolve({
                ...response,
                data: { 
                    assessmentCategories: response.data.assessmentCategories,
                    questionCategories: response.data.questionCategories,
                }
            })
        })
        .catch((error)=> {
            console.log(error)
            reject(error)
        })
    })
}

export interface AssessmentQuestionCategoriesResponseType extends Omit<successResponseType, 'data'> {
    data: {
        questionCategories: {
            id:string,
            name:string
        }[]
    }
}

export function createAssessmentCategoryAction(payload:{assessmentCategoryName:string}) {
    return new Promise<AssessmentCategoriesResponseType>((resolve, reject)=> {
        postFetch(`/assessments/assessment-categories`, payload)
        .then((response:successResponseType)=> {
            resolve({
                ...response,
                data: { 
                    assessmentCategories: response.data.assessmentCategories,
                    questionCategories: response.data.questionCategories,
                }
            })
        })
        .catch((error)=> {
            reject(error)
        })
    })
}

export function createAssessmentQuestionCategoryAction(payload:{questionCategoryName:string}) {
    return new Promise<AssessmentCategoriesResponseType>((resolve, reject)=> {
        postFetch(`/assessments/question-categories`, payload)
        .then((response:successResponseType)=> {
            resolve({
                ...response,
                data: { 
                    assessmentCategories: response.data.assessmentCategories,
                    questionCategories: response.data.questionCategories,
                }
            })
        })
        .catch((error)=> {
            reject(error)
        })
    })
}


