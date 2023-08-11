import { SetterOrUpdater, atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { ITaskState } from "./types";
import { InitState } from "../state";

export const taskInitState:ITaskState = {
    status: 'IDLE',
    error: false,
    message: '',
    tasks: {
        list: [],
        currentPage: 1,
        totalPages: 1
    },
    taskDetails:{
        id: "",
        taskId: 0,
        service: {
            title: ""
        },
        individual: {
            firstname: "",
            lastname: "",
            profileImage: "",
            id: ""
        },
        schedule: {
            startAt: new Date,
            endAt: new Date
        },
        status: "",
        goalTracking: {
            id: "",
            objective: "",
            method: ""
        },
        dailyLivingActivity: {
            id: "",
            title: "",
            instructions: ""
        }
    }
}

export const TaskState = atom({
    key: 'taskState',
    default: taskInitState 
});

export const useTaskSetState = ()=> useSetRecoilState(TaskState);
export const useTaskStateValue = ()=> useRecoilValue(TaskState);
export const useTaskState = ()=> useRecoilState(TaskState);

export function resetTaskState(setState:SetterOrUpdater<ITaskState>) {
    setState(state => ({
        ...state,
        ...InitState
    }))
}