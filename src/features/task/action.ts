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
            console.log(response)
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
    data:{
        task:ITaskDetails
    }
}

export function fetchTaskDetailsAction(taskId:number) {
    return new Promise<IFetchTaskDetailsResponse>((resolve, reject)=> {
        getFetch(`/tasks/${taskId}/details`)
        .then((response)=> {
            resolve({
                ...response,
                data: {
                    task: response.data.task,
                }
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
        .catch((error)=> reject(error.response.data))
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
        .catch((error)=> reject(error.response.data))
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
        .catch((error)=> reject(error.response.data))
    })
}