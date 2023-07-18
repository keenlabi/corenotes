import { initStateType } from "../types";

export interface ITaskState extends initStateType {
    tasks:{
        list:Array<ITask>;
        currentPage:number;
        totalPages:number;
    },
    taskDetails:ITaskDetails
}

export interface ITask {
    id:string;
    taskId:number;
    desc:string;
    service:{
        title:string;
    };
    individual:{
        firstname:string;
        lastname:string;
        profileImage:string;
    },
    schedule:{
        startAt:Date;
        endAt:Date;
    }
}

export interface ITaskDetails {
    id:string;
    taskId:number;
    service:{
        title:string;
    };
    medication?:{
        name:string;
        strength:string;
        route:string;
        indications:Array<string>;
        amountLeft:number;
    };
    individual:{
        firstname:string;
        lastname:string;
        profileImage:string;
    },
    schedule:{
        startAt:Date;
        endAt:Date;
    }
}
