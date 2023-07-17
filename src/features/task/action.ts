import { getFetch } from "src/lib/fetch"
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

export function fetchTaskDetailsAction(medicationId:number) {
    return new Promise<IFetchTaskDetailsResponse>((resolve, reject)=> {
        getFetch(`/tasks/${medicationId}/details`)
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