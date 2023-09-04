import { initStateType } from "../types";

export interface IMedicationState extends initStateType {
    medications:{
        list:Array<IMedication>;
        currentPage:number;
        totalPages:number;
    },
    medicationDetails:IMedicationDetails
}

export interface IMedication {
    id:string;
    medicationId:number;
    name:string;
    strength:string;
    medType:string;
    category:string;
    currentAmount:number;
    barCode:number;
}

export interface IMedicationDetails {
    id:string;
    name:string;
    strength:string;
    route:string;
    medType:string;
    indications:Array<string>;
    providers:Array<string>;
    pharmarcy:string;
    prescriber:string;
    instructions:string;
    category:string;
    barcode:number;
    amount:{
        current:number;
        startWith:number;
        administered:number;
    };
    services:Array<{
        id:string;
        serviceId:number;
        title:string;
        description:string;
        individualsCount:number;
    }>;
}

export interface INewMedication {
    name:string;
    strength:string;
    route:string;
    medType:string;
    indications:Array<string>;
    providers:Array<string>;
    pharmarcy:string;
    prescriber:string;
    instructions:string;
    category:string;
}

export type IMedicationType = ""|"PRN"|"SCHEDULED"