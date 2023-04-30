import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { staffStateType } from "./types";

export const staffState:staffStateType = {
    status: 'IDLE',
    error: false,
    message: '',
    list:[],
    currentPage:1,
    totalPages:1
}

export const staffAtom = atom({
    key: 'init',
    default: staffState  
});

export const useStaffValue = ()=> useRecoilValue(staffAtom);
export const useStaffState = ()=> useRecoilState(staffAtom);
export const useSetStaffState = ()=> useSetRecoilState(staffAtom);