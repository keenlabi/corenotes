import { initStateType } from "../types";

export interface IServiceStateType extends initStateType {
    servicesList:ServicesListItemType[],
    currentListPage:number,
    totalListPages:number,
    service: ServicesListItemType
}

export interface ServicesListItemType {
    id:string,
    serviceId:string,
    title:string,
    assignedIndividualsCount:number,
    createdAt:string,
    category:string
}