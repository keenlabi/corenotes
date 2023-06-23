import { initStateType } from "../types";

export interface CompartmentStateType extends initStateType {
    compartmentsList:CompartmentListItem[],
    currentListPage:number,
    totalListPages:number,
}

export interface CompartmentListItem {
    id:string,
    compartmentId:number,
    title:string,
    image:string,
    staffRolesCount:number,
    assignedIndividualsCount:number,
    meta: {
        bgColor:string,
        labelColor:string,
    }
}