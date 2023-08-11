import { AssessmentListItemType } from "../assessment/types";
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
        list: AssessmentListItemType[];
        currentPage:number;
        totalPages:number;
        session: IAssessmentSession;
    },
    services:IndividualServiceListItemType[];
    medications: {
        list:Array<IIndividualMedicationsListItem>;
        currentPage:number,
        totalPages:number
    },
    supervisoryMedicationReviews:{
        medicationId:string;
        lastMonthReviewed?:number;
        list: ISupervisoryMedicationReviews[];
        currentPage:number;
        totalPages:number;
    };
    goalServices:{
        list:IGoalService[];
        currentPage:number;
        totalPages:number;
    },
    dailyLivingActivities:{
        list:IDailyLivingActivity[];
        currentPage:number;
        totalPages:number;
    }
}

export interface IDailyLivingActivity {
    id:string;
    title:string;
    goals:Array<string>;
    frequency:string;
    time:string;
    endDate:string;
    comments:{
        createAt:string;
        message:string;
    };
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
    time:string;
    frequency:string;
    // createdAt:string
}

export interface IIndividualMedicationsListItem {
    id:string;
    active:boolean;
    medicationId:number;
    barcode:string;
    name:string;
    category:string;
    strength:string;
    amount:{
        current:number;
        allocated:number;
        administered:number;
    },
    frequency:string;
    time:string;
}

export interface IAssessmentSession {
    id:string,
    title:string;
    assessmentId:string,
    status:'PENDING'|'IN-PROGRESS'|'COMPLETED',
    questions:Array<{
        id:string,
        question:string,
        answer:'YES'|'NO',
        comment:string
    }>,
    createdAt:string
}

export interface IGoalService {
    id:string;
    objective:string;
    method:string;
    frequency:string;
    time:string;
    endDate:string;
    comments:{
        createAt:string;
        message:string;
    };
}

export interface ISupervisoryMedicationReviews {
    id:string;
    month:number;
    signedBy:{
        firstname:string;
        lastname:string;
        profilePicture:string;
    },
    reviewedAt:Date
}