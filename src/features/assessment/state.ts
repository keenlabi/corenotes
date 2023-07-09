import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { AssessmentStateType } from "./types";

export const AssessmentInitState:AssessmentStateType = {
    status: 'IDLE',
    error: false,
    message: '',
    assessments: {
        list: [],
        currentPage: 1,
        totalPages: 1,
    },
    assessmentCategories:[],
    questionCategories:[],
    newAssessment: {
        title:'',
        category:'',
        questions:[{
            category:'',
            question:''
        }],
        assignees:{
            assigneesType:'ALL',
            assigneesList:[]
        }
    }
}

export const AssessmentState = atom({
    key: 'assessmentState',
    default: AssessmentInitState 
});

export const useAssessmentStateValue = ()=> useRecoilValue(AssessmentState);
export const useAssessmentState = ()=> useRecoilState(AssessmentState);
export const useSetAssessmentState = ()=> useSetRecoilState(AssessmentState);