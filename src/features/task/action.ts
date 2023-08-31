import { getFetch, patchFetch, postFetch } from "src/lib/fetch"
import { successResponseType } from "src/lib/types"
import { ITask, ITaskDetails } from "./types";

export interface IFetchTasksListResponse extends Omit<successResponseType, 'data'> {
    data:{
        currentPage:number;
        totalPages:number;
        list:Array<ITask>
    }
}

export function fetchTasksListAction(pageNumber:number) {
    return new Promise<IFetchTasksListResponse>((resolve, reject)=> {
        getFetch(`/tasks/${pageNumber}`)
        .then((response)=> {
            resolve({
                ...response,
                data: {
                    currentPage: response.data.currentPage,
                    totalPages: response.data.totalPages,
                    list: response.data.tasks,
                }
            })
        })
        .catch((error)=> reject(error))
    })
}

export interface IFetchTaskDetailsResponse extends Omit<successResponseType, 'data'> {
    data:{ task:ITaskDetails }
}

export function fetchTaskDetailsAction(taskId:number) {
    return new Promise<IFetchTaskDetailsResponse>((resolve, reject)=> {
        getFetch(`/tasks/${taskId}/details`)
        .then((response)=> {
            resolve({
                ...response,
                data: { task: response.data.task }
            })
        })
        .catch((error)=> reject(error))
    })
}

interface IAdministerMedTask {
    amountAdministered?:number;
    amountLeft?:number;
}

export function administerMedTaskAction(taskId:number, payload:IAdministerMedTask) {
    console.log(taskId)
    return new Promise<IFetchTaskDetailsResponse>((resolve, reject)=> {
        patchFetch(`/tasks/${taskId}/administer`, payload)
        .then((response)=> {
            resolve({
                ...response,
                data: { task: response.data.task }
            })
        })
        .catch((error)=> reject(error))
    })
}

export function delineMedAdministrationTaskAction(taskId:string) {
    return new Promise<IFetchTaskDetailsResponse>((resolve, reject)=> {
        patchFetch(`/tasks/${taskId}/decline`, {})
        .then((response)=> {
            resolve({
                ...response,
                data: { task: response.data.task }
            })
        })
        .catch((error)=> reject(error))
    })
}

export function adminiterUncontrolledMedTask(taskId:string, payload:FormData) {
    return new Promise<IFetchTaskDetailsResponse>((resolve, reject)=> {
        patchFetch(`/tasks/${taskId}/administer-uncontrolled`, payload)
        .then((response)=> {
            resolve({
                ...response,
                data: { task: response.data.task }
            })
        })
        .catch((error)=> reject(error))
    })
}

export function findMedicationTaskWithCodeAction(medicationBarcode:string) {
    return new Promise<IFetchTaskDetailsResponse>((resolve, reject)=> {
        getFetch(`/tasks/medications/search-by-barcode/${medicationBarcode}`)
        .then((response)=> {
            resolve({
                ...response,
                data: { task: response.data.task }
            })
        })
        .catch((error)=> reject(error))
    })
}

interface ICompleteGoalTrackingTask {
    timeTaken:number;
    wasGoalMet:string;
    note:string;
}

export function completeGoalTrackingTaskAction(taskId:number, payload:ICompleteGoalTrackingTask) {
    return new Promise<IFetchTaskDetailsResponse>((resolve, reject)=> {
        postFetch(`/tasks/${taskId}/complete-goal-tracking`, payload)
        .then((response)=> {
            resolve({
                ...response,
                data: { task: response.data.task }
            })
        })
        .catch((error)=> reject(error))
    })
}

export function declineGoalTrackingTaskAction(taskId:number) {
    return new Promise<IFetchTaskDetailsResponse>((resolve, reject)=> {
        postFetch(`/tasks/${taskId}/decline-goal-tracking`, {})
        .then((response)=> {
            resolve({
                ...response,
                data: { task: response.data.task }
            })
        })
        .catch((error)=> reject(error))
    })
}

interface ICompleteSkinIntegrityTask {
    timeTaken:number;
    note:string;
}

export function completeSkinIntegrityTaskAction(taskId:number, payload:ICompleteSkinIntegrityTask) {
    return new Promise<IFetchTaskDetailsResponse>((resolve, reject)=> {
        postFetch(`/tasks/${taskId}/complete-skin-integrity`, payload)
        .then((response)=> {
            resolve({
                ...response,
                data: { task: response.data.task }
            })
        })
        .catch((error)=> reject(error))
    })
}

export function declineSkinIntegrityTaskAction(taskId:number) {
    return new Promise<IFetchTaskDetailsResponse>((resolve, reject)=> {
        postFetch(`/tasks/${taskId}/decline-skin-integrity`, {})
        .then((response)=> {
            resolve({
                ...response,
                data: { task: response.data.task }
            })
        })
        .catch((error)=> reject(error))
    })
}

interface ICompleteBowelMovementTask {
    amount:number;
    note:string;
}

export function completeBowelMovementTaskAction(taskId:number, payload:ICompleteBowelMovementTask) {
    return new Promise<IFetchTaskDetailsResponse>((resolve, reject)=> {
        console.log(payload)
        postFetch(`/tasks/${taskId}/complete-bowel-movement`, payload)
        .then((response)=> {
            resolve({
                ...response,
                data: { task: response.data.task }
            })
        })
        .catch((error)=> reject(error))
    })
}

export function declineBowelMovementTaskAction(taskId:number) {
    return new Promise<IFetchTaskDetailsResponse>((resolve, reject)=> {
        postFetch(`/tasks/${taskId}/decline-bowel-movement`, {})
        .then((response)=> {
            resolve({
                ...response,
                data: { task: response.data.task }
            })
        })
        .catch((error)=> reject(error))
    })
}

export interface ICompleteDailyLivingActivityTask {
    note:string;
}

export function completeDailyLivingActivityTaskAction(taskId:number, payload:ICompleteDailyLivingActivityTask) {
    return new Promise<IFetchTaskDetailsResponse>((resolve, reject)=> {
        postFetch(`/tasks/${taskId}/complete-daily-living-activity`, payload)
        .then((response)=> {
            resolve({
                ...response,
                data: { task: response.data.task }
            })
        })
        .catch((error)=> reject(error))
    })
}

export function declineDailyLivingActivityTaskAction(taskId:number) {
    return new Promise<IFetchTaskDetailsResponse>((resolve, reject)=> {
        postFetch(`/tasks/${taskId}/decline-daily-living-activity`, {})
        .then((response)=> {
            resolve({
                ...response,
                data: { task: response.data.task }
            })
        })
        .catch((error)=> reject(error))
    })
}

interface ICompleteShiftNotesTask {
    note:string;
}


export function completeShiftNotesTaskAction(taskId:number, payload:ICompleteShiftNotesTask) {
    return new Promise<IFetchTaskDetailsResponse>((resolve, reject)=> {
        postFetch(`/tasks/${taskId}/complete-shift-notes`, payload)
        .then((response)=> {
            resolve({
                ...response,
                data: { task: response.data.task }
            })
        })
        .catch((error)=> reject(error))
    })
}

export function declineShiftNotesTaskAction(taskId:number) {
    return new Promise<IFetchTaskDetailsResponse>((resolve, reject)=> {
        postFetch(`/tasks/${taskId}/decline-shift-notes`, {})
        .then((response)=> {
            resolve({
                ...response,
                data: { task: response.data.task }
            })
        })
        .catch((error)=> reject(error))
    })
}

export function completeBloodGlucoseCheckTaskAction(taskId:number, payload:ICompleteShiftNotesTask) {
    return new Promise<IFetchTaskDetailsResponse>((resolve, reject)=> {
        postFetch(`/tasks/${taskId}/complete-blood-glucose-check`, payload)
        .then((response)=> {
            resolve({
                ...response,
                data: { task: response.data.task }
            })
        })
        .catch((error)=> reject(error))
    })
}

export function declineBloodGlucoseCheckTaskAction(taskId:number) {
    return new Promise<IFetchTaskDetailsResponse>((resolve, reject)=> {
        postFetch(`/tasks/${taskId}/decline-blood-glucose-check`, {})
        .then((response)=> {
            resolve({
                ...response,
                data: { task: response.data.task }
            })
        })
        .catch((error)=> reject(error))
    })
}

interface IDeclineBehaviorManagementTask {
    note:string;
}

export function declineBehaviorManagementTaskAction(taskId:number, payload:IDeclineBehaviorManagementTask) {
    return new Promise<IFetchTaskDetailsResponse>((resolve, reject)=> {
        postFetch(`/tasks/${taskId}/decline-behavior-management`, payload)
        .then((response)=> {
            resolve({
                ...response,
                data: { task: response.data.task }
            })
        })
        .catch((error)=> reject(error))
    })
}

interface ICompleteBehaviorManagementTask {
    note:string;
}

export function completeBehaviorManagementTaskAction(taskId:number, payload:ICompleteBehaviorManagementTask) {
    return new Promise<IFetchTaskDetailsResponse>((resolve, reject)=> {
        postFetch(`/tasks/${taskId}/complete-behavior-management`, payload)
        .then((response)=> {
            resolve({
                ...response,
                data: { task: response.data.task }
            })
        })
        .catch((error)=> reject(error))
    })
}

// seizure tracking task actions ***************

interface ICompleteSeizureTrackingTask {
    seizureStartDate:string,
    seizureEndModel:string,
    note:string;
}

export function completeSeizureTrackingTaskAction(taskId:number, payload:ICompleteSeizureTrackingTask) {
    return new Promise<IFetchTaskDetailsResponse>((resolve, reject)=> {
        postFetch(`/tasks/${taskId}/complete-seizure-tracking`, payload)
        .then((response)=> {
            resolve({
                ...response,
                data: { task: response.data.task }
            })
        })
        .catch((error)=> reject(error))
    })
}

interface IDeclineSeizureTrackingTask {
    note:string;
}

export function declineSeizureTrackingTaskAction(taskId:number, payload:IDeclineSeizureTrackingTask) {
    return new Promise<IFetchTaskDetailsResponse>((resolve, reject)=> {
        postFetch(`/tasks/${taskId}/decline-seizure-tracking`, payload)
        .then((response)=> {
            resolve({
                ...response,
                data: { task: response.data.task }
            })
        })
        .catch((error)=> reject(error))
    })
}

// ***************************************

// fire drill task actions ***************

interface ICompleteFireDrillTask {
    noOfIndividuals:string;
    lengthOfDrill:string;
    fireExtinguisherDate:string;
    smokeDetectorDate:string;
    whatToDo:string;
    howToAlarm:string;
    whatToDoBeforeFireDept:string;
    howToConfirmEvacuation:string;
}

export function completeFireDrillTaskAction(taskId:number, payload:ICompleteFireDrillTask) {
    return new Promise<IFetchTaskDetailsResponse>((resolve, reject)=> {
        postFetch(`/tasks/${taskId}/complete-fire-drill`, payload)
        .then((response)=> {
            resolve({
                ...response,
                data: { task: response.data.task }
            })
        })
        .catch((error)=> reject(error))
    })
}

interface IDeclineFireDrillTask {
    note:string;
}

export function declineFireDrillTaskAction(taskId:number, payload:IDeclineFireDrillTask) {
    return new Promise<IFetchTaskDetailsResponse>((resolve, reject)=> {
        postFetch(`/tasks/${taskId}/decline-fire-drill`, payload)
        .then((response)=> {
            resolve({
                ...response,
                data: { task: response.data.task }
            })
        })
        .catch((error)=> reject(error))
    })
}

// ***************************************

// tornado drill task actions ***************

interface ICompleteTornadoDrillTask {
    noOfIndividuals:number;
    didStaffAnnounce:string;
    didIndividualsEvacuate:string;
    note:string;
}

export function completeTornadoDrillTaskAction(taskId:number, payload:ICompleteTornadoDrillTask) {
    return new Promise<IFetchTaskDetailsResponse>((resolve, reject)=> {
        postFetch(`/tasks/${taskId}/complete-tornado-drill`, payload)
        .then((response)=> {
            resolve({
                ...response,
                data: { task: response.data.task }
            })
        })
        .catch((error)=> reject(error))
    })
}

interface IDeclineTornadoDrillTask {
    note:string;
}

export function declineTornadoDrillTaskAction(taskId:number, payload:IDeclineTornadoDrillTask) {
    return new Promise<IFetchTaskDetailsResponse>((resolve, reject)=> {
        postFetch(`/tasks/${taskId}/decline-tornado-drill`, payload)
        .then((response)=> {
            resolve({
                ...response,
                data: { task: response.data.task }
            })
        })
        .catch((error)=> reject(error))
    })
}

// ***************************************

// chore drill task actions **************

interface ICompleteChoreTask {
    note:string;
}

export function completeChoreTaskAction(taskId:number, payload:ICompleteChoreTask) {
    return new Promise<IFetchTaskDetailsResponse>((resolve, reject)=> {
        postFetch(`/tasks/${taskId}/complete-chore`, payload)
        .then((response)=> {
            resolve({
                ...response,
                data: { task: response.data.task }
            })
        })
        .catch((error)=> reject(error))
    })
}

interface IDeclineChoreTask {
    note:string;
}

export function declineChoreTaskAction(taskId:number, payload:IDeclineChoreTask) {
    return new Promise<IFetchTaskDetailsResponse>((resolve, reject)=> {
        postFetch(`/tasks/${taskId}/decline-chore`, payload)
        .then((response)=> {
            resolve({
                ...response,
                data: { task: response.data.task }
            })
        })
        .catch((error)=> reject(error))
    })
}

// ***************************************

// prn medication review task actions **************

interface ICompletePRNMedicationReviewTask {
    note:string;
}

export function completePRNMedicationReviewTaskAction(taskId:number, payload:ICompletePRNMedicationReviewTask) {
    return new Promise<IFetchTaskDetailsResponse>((resolve, reject)=> {
        postFetch(`/tasks/${taskId}/complete-prn-medication-review`, payload)
        .then((response)=> {
            resolve({
                ...response,
                data: { task: response.data.task }
            })
        })
        .catch((error)=> reject(error))
    })
}

interface IDeclinePRNMedicationReviewTask {
    note:string;
}

export function declinePRNMedicationReviewTaskAction(taskId:number, payload:IDeclinePRNMedicationReviewTask) {
    return new Promise<IFetchTaskDetailsResponse>((resolve, reject)=> {
        postFetch(`/tasks/${taskId}/decline-prn-medication-review`, payload)
        .then((response)=> {
            resolve({
                ...response,
                data: { task: response.data.task }
            })
        })
        .catch((error)=> reject(error))
    })
}

// ***************************************

interface ICreatePRNTask {
    individualId:number;
    serviceId:number;
    schedule:{
        startDate:string;
        frequency:string;
        frequencyAttr:number;
        time:string;
    }
}

export function createPRNTaskAction(payload:ICreatePRNTask) {
    return new Promise<IFetchTasksListResponse>((resolve, reject)=> {
        postFetch(`/tasks`, payload)
        .then((response)=> {
            resolve({
                ...response,
                data: {
                    currentPage: response.data.currentPage,
                    totalPages: response.data.totalPages,
                    list: response.data.tasks
                }
            })
        })
        .catch((error)=> reject(error))
    })
}
