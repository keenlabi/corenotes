import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { staffStateType } from "./types";

export const staffState:staffStateType = {
    status: 'IDLE',
    error: false,
    message: '',
    list:[],
    currentPage:1,
    totalPages:1,
    details: {
        id:'',
        email: '',
        username: '',
        password: '',
        accessToken: '',
        phoneNumber: '',
        firstname: '',
        lastname: '',
        role: '',
        createdAt: new Date(),
        lastSeen: new Date(),
        profileImage:''
    }
}

export const staffAtom = atom({
    key: 'init',
    default: staffState  
});

export const useStaffValue = ()=> useRecoilValue(staffAtom);
export const useStaffState = ()=> useRecoilState(staffAtom);
export const useSetStaffState = ()=> useSetRecoilState(staffAtom);