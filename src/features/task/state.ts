import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { ITaskState } from "./types";

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
            profileImage: ""
        },
        schedule: {
            startAt: new Date,
            endAt: new Date
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