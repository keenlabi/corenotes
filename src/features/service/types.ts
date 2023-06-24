import { initStateType } from "../types";

export interface IServiceStateType extends initStateType {
    servicesList:ServicesListItemType[],
    currentListPage:number,
    totalListPages:number,
}

export interface ServicesListItemType {
    id:string,
    title:string,
    assignedIndividualsCount:number,
    createdAt:string
}