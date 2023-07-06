import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { IServiceStateType } from "./types";

export const serviceInitState:IServiceStateType = {
    status: 'IDLE',
    error: false,
    message: '',
    servicesList: [],
    currentListPage: 1,
    totalListPages: 1,
    service:{
        id: "",
        serviceId: "",
        title: "",
        category: "",
        individuals: {
            list: [],
            currentPage: 1,
            totalPages: 1
        },
        staffs: {
            list: [],
            currentPage: 1,
            totalPages: 1
        },
        assessments: {
            list: [],
            currentPage: 1,
            totalPages: 1
        },
        createdAt:""
    }
}

export const serviceAtom = atom({
    key: 'serviceState',
    default: serviceInitState
});

export const useServicesStateValue = ()=> useRecoilValue(serviceAtom);
export const useServicesState = ()=> useRecoilState(serviceAtom);
export const useSetServicesState = ()=> useSetRecoilState(serviceAtom);