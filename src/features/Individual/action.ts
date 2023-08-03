import { getFetch, patchFetch, postFetch } from "src/lib/fetch"
import { successResponseType } from "src/lib/types"
import { IGoalService, IIndividualMedicationsListItem, ISupervisoryMedicationReviews, IndividualListItemType, IndividualProfileResponseType, IndividualServiceListItemType } from "./types"
import { AssessmentModelType } from "../assessment/types"

export interface IndividualListResponseType extends Omit<successResponseType, 'data'> {
    data: { 
        list:IndividualListItemType[],
        currentListPage:number
        totalListPages:number
    }
}

export interface IndividualProfileSuccessResponseType extends Omit<successResponseType, 'data'> {
    data: { 
        individual:IndividualProfileResponseType,
    }
}

export function registerIndividualAction(payload:FormData) {
    return new Promise<IndividualListResponseType>((resolve, reject)=> {
        postFetch('/individuals', payload)
        .then((response:successResponseType)=> {
            resolve({
                ...response,
                data: {
                    list: response.data.individuals,
                    currentListPage: response.data.currentListPage,
                    totalListPages: response.data.totalListPages
                }
            })
        })
        .catch((error)=> reject({error}))
    })
}

export function fetchIndividualListAction(pageNumber:number) {
    return new Promise<IndividualListResponseType>((resolve, reject)=> {
        getFetch(`/individuals/${pageNumber}`)
        .then((response:successResponseType)=> {
            resolve({
                ...response, 
                data: { 
                    currentListPage: response.data.currentListPage,
                    totalListPages: response.data.totalListPages,
                    list: response.data.individuals
                }
            })
        })
        .catch((error)=> reject(error.response.data))
    })
}

export function fetchIndividualProfileAction(id:string) {
    return new Promise<IndividualProfileSuccessResponseType>((resolve, reject)=> {
        getFetch(`/individuals/profile/${id}`)
        .then((response:successResponseType)=> resolve({
            ...response, 
            data: {
                individual: response.data.individual
            }
        }))
        .catch((error)=> {
            reject(error)
        })
    })
}

export interface IndividualAssessmentSessionResponseType extends Omit<successResponseType, 'data'> {
    data: {
        assessmentDetails: AssessmentModelType
    }
}

export function fetchIndividualAssessmentSessionAction(assessmentId:string) {
    return new Promise<IndividualAssessmentSessionResponseType>((resolve, reject)=> {
        getFetch(`/individuals/assessments/${assessmentId}/session`)
        .then((response:successResponseType)=> {
            resolve({
                ...response,
                data: { assessmentDetails: response.data.individualAssessmentSession }
            })
        })
        .catch((error)=> {
            reject(error)
        })
    })
}

export function saveAssessmentSessionAction(assessmentId:string, payload:Pick<AssessmentModelType, 'questions'>) {
    return new Promise<IndividualAssessmentSessionResponseType>((resolve, reject)=> {
        patchFetch(`/individuals/assessments/${assessmentId}/session`, payload)
        .then((response:successResponseType)=> {
            resolve({
                ...response,
                data: { assessmentDetails: response.data.individualAssessmentSession }
            })
        })
        .catch((error)=> {
            reject(error)
        })
    })
}

export function completeAssessmentSessionAction(assessmentId:string, payload:Pick<AssessmentModelType, 'questions'>) {
    return new Promise<IndividualAssessmentSessionResponseType>((resolve, reject)=> {
        postFetch(`/individuals/assessments/${assessmentId}/session`, payload)
        .then((response:successResponseType)=> {
            resolve({
                ...response,
                data: { assessmentDetails: response.data.individualAssessmentSession }
            })
        })
        .catch((error)=> reject(error))
    })
}

export interface IndividualServicesSuccessResponseType extends successResponseType {
    data: {
        individualServices:IndividualServiceListItemType[]
    }
}

export function fetchIndividualServicesAction(individualId:string) {
    return new Promise<IndividualServicesSuccessResponseType>((resolve, reject)=> {
        getFetch(`/individuals/${individualId}/services`)
        .then((response)=> {
            resolve({
                ...response,
                data: { individualServices: response.data.individualServices }
            })
        })
        .catch((error)=> reject(error))
    })
}

interface IAddServiceToIndividualPayload {
    serviceId:string;
    schedule: {
        startDate:string;
        time:string;
        frequency:string;
        frequencyAttr:number;
    }
}

export function addServiceToIndividualAction(individualId:string, payload:IAddServiceToIndividualPayload) {
    return new Promise<IndividualServicesSuccessResponseType>((resolve, reject)=> {
        postFetch(`/individuals/${individualId}/services`, payload)
        .then((response)=> {
            resolve({
                ...response,
                data: { individualServices: response.data.individualServices }
            })
        })
        .catch((error)=> reject(error))
    })
}

export interface IIndividualMedicationsSuccessResponse extends Omit<successResponseType, 'data'> {
    data: { 
        list:IIndividualMedicationsListItem[],
        currentPage:number
        totalPages:number
    }
}

export function fetchIndividualMedicationsAction(individualId:number, pageNumber:number) {
    return new Promise<IIndividualMedicationsSuccessResponse>((resolve, reject)=> {
        getFetch(`/individuals/${individualId}/medications/${pageNumber}`)
        .then((response)=> {
            resolve({
                ...response,
                data: {
                    currentPage: response.data.currentPage,
                    totalPages: response.data.totalPages,
                    list: response.data.medications 
                }
            })
        })
        .catch((error)=> reject(error))
    })
}

interface IAddMedicationToIndividualPayload {
    medicationId:string;
    schedule:{
        startDate:string;
        frequency:string;
        frequencyAttr:number;
        time:string;
    },
    amountAllocated:number;
}

export function addMedicationToIndividualAction(individualId:number, payload:IAddMedicationToIndividualPayload) {
    return new Promise<IIndividualMedicationsSuccessResponse>((resolve, reject)=> {
        postFetch(`/individuals/${individualId}/medications`, payload)
        .then((response)=> {
            resolve({
                ...response,
                data: {
                    currentPage: response.data.currentPage,
                    totalPages: response.data.totalPages,
                    list: response.data.medications 
                }
            })
        })
        .catch((error)=> reject(error))
    })
}

interface IAddPRNMedicationToIndividualPayload {
    individualMedicationId:string;
    selectedMedicationId:string;
    note:string;
    amountAdministered:number;
}

export function administerPRNMedicationToIndividualAction(individualId:string, payload:IAddPRNMedicationToIndividualPayload){
    return new Promise<successResponseType>((resolve, reject)=> {
        postFetch(`/individuals/${individualId}/medications/prn-medication`, payload)
        .then((response)=> resolve({
            ...response
        }))
        .catch((error)=> reject(error))
    })
}

export function discontinueIndividualMedicationAction(individualId:number, payload:{medicationId:number, active:boolean, currentPage:number}) {
    return new Promise<IIndividualMedicationsSuccessResponse>((resolve, reject)=> {
        patchFetch(`/individuals/${individualId}/medications/toggle`, payload)
        .then((response)=> {
            resolve({
                ...response,
                data: {
                    currentPage: response.data.currentPage,
                    totalPages: response.data.totalPages,
                    list: response.data.medications 
                }
            })
        })
        .catch((error)=> reject(error))
    })
}

interface IAllocateMedicationPillsPayload {
    medicationId:number;
    newAmountAllocated:number;
    newPharmacy:string;
}

// export function addNewAllocationAction(individualId:number, payload:IAllocateMedicationPillsPayload) {
//     return new Promise<IIndividualMedicationsSuccessResponse>((resolve, reject)=> {
//         patchFetch(`/individuals/${individualId}/medications/pills-allocation`, payload)
//         .then((response)=> {
//             resolve({
//                 ...response,
//                 data: {
//                     currentPage: response.data.currentPage,
//                     totalPages: response.data.totalPages,
//                     list: response.data.medications 
//                 }
//             })
//         })
//         .catch((error)=> reject(error))
//     })
// }

export interface IIndividualSupervisoryReviewsListResponse extends Omit<successResponseType, 'data'> {
    data: {
        medicationId:string;
        currentPage:number;
        totalPages:number;
        list:ISupervisoryMedicationReviews[];
        lastMonthReviewed?:number;
    }
}

export function submitSupervisoryMedReviewAction(individualId:number, payload:IAllocateMedicationPillsPayload) {
    return new Promise<IIndividualSupervisoryReviewsListResponse>((resolve, reject)=> {
        patchFetch(`/individuals/${individualId}/medications/supervisory-medication-review`, payload)
        .then((response)=> {
            resolve({
                ...response,
                data: { 
                    medicationId: response.data.medicationId,
                    currentPage: response.data.currentPage,
                    totalPages: response.data.totalPages,
                    list: response.data.supervisoryReviews,
                    lastMonthReviewed: response.data.lastMonthReviewed
                }
            })
        })
        .catch((error)=> reject(error))
    })
}

export function fetchIndividualSupervisoryReviewHistoryAction(individualId:number, medId:number, pageNumber:number) {
    return new Promise<IIndividualSupervisoryReviewsListResponse>((resolve, reject)=> {
        getFetch(`/individuals/${individualId}/medications/${medId}/supervisory-medication-review/${pageNumber}`)
        .then((response)=> {
            resolve({
                ...response,
                data: {
                    currentPage: response.data.currentPage,
                    totalPages: response.data.totalPages,
                    medicationId: response.data.medicationId,
                    list: response.data.supervisoryReviews,
                    lastMonthReviewed: response.data.lastMonthReviewed
                }
            })
        })
        .catch((error)=> reject(error))
    })
}

export interface IIndividualGoalServicesSuccessResponse extends Omit<successResponseType, 'data'> {
    data: { 
        list:IGoalService[],
        currentPage:number
        totalPages:number
    }
}

interface IAddGoalServiceToIndividualPayload {
    objective:string;
    method:string;
    schedule: {
        startDate:string;
        time:string;
        frequency:string;
        frequencyAttr:number;
    }
}

export function addGoalToIndividualAction(individualId:string, payload:IAddGoalServiceToIndividualPayload) {
    return new Promise<IIndividualGoalServicesSuccessResponse>((resolve, reject)=> {
        postFetch(`/individuals/${individualId}/services/goal-tracking`, payload)
        .then((response)=> {
            resolve({
                ...response,
                data: {
                    currentPage: response.data.currentPage,
                    totalPages: response.data.totalPages,
                    list: response.data.goals 
                }
            })
        })
        .catch((error)=> reject(error))
    })
} 

export function fetchIndividualGoalsAction(individualId:number, pageNumber:number) {
    return new Promise<IIndividualGoalServicesSuccessResponse>((resolve, reject)=> {
        getFetch(`/individuals/${individualId}/services/goal-tracking/${pageNumber}`)
        .then((response)=> {
            resolve({
                ...response,
                data: {
                    currentPage: response.data.currentPage,
                    totalPages: response.data.totalPages,
                    list: response.data.goals 
                }
            })
        })
        .catch((error)=> reject(error))
    })
}