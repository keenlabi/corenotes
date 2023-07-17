import { AssessmentModelType } from "../assessment/types";
import { initStateType } from "../types";

export interface IndividualStateType extends initStateType {
    individuals:{
        list:IndividualListItemType[];
        currentListPage:number;
        totalListPages:number;
    },
    newIndividual:NewIndividualType;
    profile: IndividualProfileType;
    assessments: {
        list: AssessmentModelType[];
        currentPage:number;
        totalPages:number;
        session: AssessmentModelType;
    },
    services:IndividualServiceListItemType[];
    medications: {
        list:Array<IIndividualMedicationsListItem>;
        currentPage:number,
        totalPages:number
    }
}

export interface IndividualListItemType {
    id:string;
    individualId:number;
    profileImage:string;
    firstname:string;
    lastname:string;
    age:number;
    gender:string;
    medicaidNumber:string;
    compartment:string;
}

export interface NewIndividualType {
    // NEW PERSONAL INFORMATION
    firstname: string,
    middlename: string,
    lastname: string,
    nickname: string,
    dob:string,
    gender: string,
    maritalStatus: string,
    religion: string,
    ssn: string,
    weight: string,
    medicaidNumber: number,
    codeAlert: Array<string>,
    profileImage?:Blob|MediaSource,
    contact: {
        name: string,
        email: string,
        phoneNumber: string
    },
    // NEW HEALTH INFORMATION
    requestedServices: Array<{
        service:string,
        startDate:string
    }>,
    diet: Array<string>,
    allergies: {
        food: Array<string>,
        med: Array<string>,
        other: Array<string>
    },
    compartment:string,
    compartmentId:number
}

export interface IndividualProfileResponseType {
    _id:string,
    active:boolean,
    // ACCOUNT INFO
    role:'INDIVIDUAL',
    createdAt:string,
    // PERSONAL INFORMATION
    firstname:string,
    middlename:string,
    lastname:string,
    nickname:string,
    dob:string,
    gender:string,
    contact: {
        name:string,
        email:string,
        phoneNumber:string
    },
    profileImage:string,
    // DOCUMENTS
    documents:Array<{
        docTitle:string,
        docType:string,
        docDate:string,
        docFileLink:string,
        docFileName:string,
        createdAt:string
    }>,
    religion:string,
    ssn:string,
    weight:number,
    medicaidNumber:number,
    maritalStatus:string,
    codeAlert:Array<string>
    compartment:string,
    requestedServices: Array<{
        service:string,
        startDate:string
    }>,
    diet: Array<string>,
    allergies: {
        food: Array<string>,
        med: Array<string>,
        other: Array<string>
    }
}

export interface IndividualProfileType {
    id: string,
    personalInformation: {
        profileImage: string,
        firstName: string,
        middleName: string,
        lastName: string,
        nickName: string,
        dob: string,
        gender: string,
        maritalStatus: string,
        religion: string,
        ssn: string,
        weight: number,
        contact: {
            name: string,
            email: string,
            phoneNumber: string
        },
        medicaidNumber: number,
        compartment: string
    },
    healthInformation: {
        diet: Array<string>,
        allergies: {
            food: Array<string>,
            meds: Array<string>,
            others: Array<string>
        }
    }
}

export interface IndividualServiceListItemType {
    id:string;
    serviceId:number;
    title:string;
    category:string;
    startDate:string;
    // createdAt:string
}

export interface IIndividualMedicationsListItem {
    id:string;
    medicationId:string;
    name:string;
    strength:string;
    amount:{
        current:number;
        allocated:number;
        administered:number;
    },
    frequency:string;
    time:string;
}

// export interface IndividualAssessmentType {
//     id:string,
//     assessmentId:string,
//     status:'PENDING'|'IN-PROGRESS'|'COMPLETED',
//     questions:Array<{
//         id:string,
//         question:string,
//         answer:'YES'|'NO',
//         comment:string
//     }>,
//     createdAt:string
// }