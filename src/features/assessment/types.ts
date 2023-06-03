import { initStateType } from "../types"

// Type for response data from api
export interface AssessmentModelType {
    id:string,
    title:string
    category:string,
    questions:Array<{
        id:string,
        question:string,
        answer:'YES'|'NO',
        comment:string
    }>,
    status:string
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
    list:AssessmentModelType[],
    currentListPage:number,
    totalListPages:number,
    newAssessment:NewAssessmentType,
    assessmentCategories:{id:string, name:string}[]
    questionCategories:{id:string, name:string}[]
}