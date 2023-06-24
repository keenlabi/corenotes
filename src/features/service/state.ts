import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { IServiceStateType } from "./types";

export const serviceInitState:IServiceStateType = {
    status: 'IDLE',
    error: false,
    message: '',
    servicesList: [],
    currentListPage: 1,
    totalListPages: 1,
}

export const serviceAtom = atom({
    key: 'serviceState',
    default: serviceInitState
});

export const useServicesStateValue = ()=> useRecoilValue(serviceAtom);
export const useServicesState = ()=> useRecoilState(serviceAtom);
export const useSetServicesState = ()=> useSetRecoilState(serviceAtom);