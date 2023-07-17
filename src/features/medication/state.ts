import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { IMedicationState } from "./types";

export const medicationInitState:IMedicationState = {
    status: 'IDLE',
    error: false,
    message: '',
    medications:{
        list: [],
        currentPage: 1,
        totalPages: 1
    },
    medicationDetails:{
        id: "",
        name: "",
        strength: "",
        route: "",
        medType: "",
        indications: [],
        providers: [],
        pharmarcy: "",
        prescriber: "",
        instructions: "",
        category: "",
        amount: {
            current: 0,
            startWith: 0,
            administered: 0
        }
    }
}

export const MedicationState = atom({
    key: 'medicationState',
    default: medicationInitState 
});

export const useMedicationSetState = ()=> useSetRecoilState(MedicationState);
export const useMedicationStateValue = ()=> useRecoilValue(MedicationState);
export const useMedicationState = ()=> useRecoilState(MedicationState);