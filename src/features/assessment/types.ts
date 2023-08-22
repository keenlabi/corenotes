import { IIndividualAssessmentSession } from "../Individual/types";
import { initStateType } from "../types"

// Type for response data from api
export interface AssessmentModelType {
    id:string;
    assessmentId:string;
    title:string
    category:string;
    questions:Array<{
        id:string;
        question:string;
        category:string;
        answer:'YES'|'NO';
        comment:string;
    }>;
}

export interface IAssessmentSession {
    id:string;
    assessmentId:string;
    title:string
    category:string;
    status:string;
    questions:Array<{
        id:string;
        question:string;
        category:string;
        answer:'YES'|'NO';
        comment:string;
    }>;
}

export interface AssessmentListItemType {
    id:string;
    assessmentId:string;
    title:string;
    category:string;
    questionsCount:number;
    status:string;
    assignedTo:string;
    assignees: {
        assigneesType:string;
        assigneesList:Array<string>;
    };
}

// Type for creating new assessment
export interface NewAssessmentType {
    title:string,
    category:string,
    questions: Array<{
        question:string,
        category:string
    }>,
    assignees:{
        assigneesType: 'ALL'|'SPECIFIC',
        assigneesList: Array<string>,
    }
}

// Type for the assessment state object
export interface AssessmentStateType extends initStateType {
    assessments:{
        list:AssessmentListItemType[],
        currentPage:number,
        totalPages:number
    },
    assessmentDetails:AssessmentModelType;
    newAssessment:NewAssessmentType,
    assessmentCategories:{id:string, name:string}[]
    questionCategories:{id:string, name:string}[],
    assessmentSession:IIndividualAssessmentSession
}