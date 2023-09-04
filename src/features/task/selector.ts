import { selectorFamily, useRecoilValue } from "recoil"
import { IFetchTaskDetailsResponse, IFetchTasksListResponse, fetchTaskDetailsAction, fetchTasksListAction } from "./action";
import { taskInitState } from "./state";

interface IFetchTasksList {
    tasks: Pick<IFetchTasksListResponse, 'data'>['data'];
    code:number;
    message:string;
    error:boolean;
}

const fetchTasksListSelector = selectorFamily({
    key: 'fetch_medications_list_selector',
    get: (pageNumber:number)=> async ()=> {
        return await fetchTasksListAction(pageNumber)
        .then((response)=> {
            return {
                tasks: response.data,
                code: response.code,
                message: response.message,
                error: false

            } satisfies IFetchTasksList
        })
        .catch((error)=> {
            return {
                code: error.code,
                error: true,
                message: error.message,
                tasks: taskInitState.tasks

            } satisfies IFetchTasksList
        })
    }
})
export const useFetchTasksListSelector = (pageNumber:number)=> useRecoilValue(fetchTasksListSelector(pageNumber))

interface IFetchTaskDetails {
    task: Pick<IFetchTaskDetailsResponse, 'data'>['data']['task'];
    code:number;
    message:string;
    error:boolean;
}

const fetchTaskDetailsSelector = selectorFamily({
    key: 'fetch_medication_details_selector',
    get: (taskId:number)=> async ()=> {
        return await fetchTaskDetailsAction(taskId)
        .then((response)=> {
            return {
                task: response.data.task,
                code: response.code,
                message: response.message,
                error: false

            } satisfies IFetchTaskDetails
        })
        .catch((error)=> {
            return {
                code: error.code,
                error: true,
                message: error.message,
                task: taskInitState.taskDetails

            } satisfies IFetchTaskDetails
        })
    }
})
export const useFetchTaskDetailsSelector = (taskId:number)=> useRecoilValue(fetchTaskDetailsSelector(taskId))