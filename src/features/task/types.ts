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
    status:string;
    desc:string;
    service:{
        title:string;
    };
    individual:{
        id:string;
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
    status:string;
    service:{
        title:string;
    };
    medication?:{
        id:string;
        name:string;
        strength:string;
        route:string;
        indications:Array<string>;
        amountLeft:number;
        category:string;
        PRN:Array<IPRNMedication>;
    };
    individual:{
        id:string;
        firstname:string;
        lastname:string;
        profileImage:string;
    },
    schedule:{
        startAt:Date;
        endAt:Date;
    }
}

export interface IPRNMedication {
    id:string;
    title:string;
    note:string;
    name:string;
    amountAdministered:number;
    createdAt:Date;
}