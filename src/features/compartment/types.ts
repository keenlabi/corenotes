import { initStateType } from "../types";

export interface CompartmentStateType extends initStateType {
    compartmentsList:CompartmentListItem[],
    currentListPage:number,
    totalListPages:number,
    compartment: CompartmentDetails
}

export interface CompartmentListItem {
    id:string;
    compartmentId:number;
    title:string;
    image:string;
    servicesCount:number;
    staffRolesCount:number;
    assignedIndividualsCount:number;
    meta: {
        bgColor:string;
        labelColor:string;
    }
}

export interface CompartmentDetails {
    id:string;
    compartmentId:number;
    title:string;
    image:string;
    staffRoles:Array<string>;
    assignedIndividuals:Array<string>;
    meta: {
        bgColor:string;
        labelColor:string;
    };
    services:Array<{
        id:string;
        serviceId:number;
        title:string;
        description: string;
        individuals:string;
        staffRoles:string;
        assessments:Array<string>;
        category:string;
    }>
}