import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { CompartmentStateType } from "./types";

export const compartmentInitState:CompartmentStateType = {
    status: 'IDLE',
    error: false,
    message: '',
    compartmentsList: [],
    currentListPage: 1,
    totalListPages: 1,
}

export const CompartmentAtom = atom({
    key: 'compartmentState',
    default: compartmentInitState
});

export const useCompartmentStateValue = ()=> useRecoilValue(CompartmentAtom);
export const useCompartmentState = ()=> useRecoilState(CompartmentAtom);
export const useSetCompartmentState = ()=> useSetRecoilState(CompartmentAtom);