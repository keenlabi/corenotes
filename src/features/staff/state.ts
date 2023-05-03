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
        id: '',
        // ACCOUNT INFO
        role: '',
        lastSeen: '',
        
        // PERSONAL INFORMATION
        firstname: '',
        lastname: '',
        nickname: '',
        initials: '',
        dob:'',
        gender: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        phoneNumber: {
            work: '',
            cell: '',
            other: ''
        },
        emergencyContact: {
            name: '',
            relationship: '',
            phoneNumber: ''
        },
        email: '',
        profileImage: '',
        
        // WORK INFORMATION
        compartment: '',
        title: '',
        providerRole: '',
        hiredAt: '',
        username: '',
        employeeId: '',
        jobSchedule: ''
    },
    newStaff: {
        // PERSONAL INFORMATION
        firstname: '',
        lastname: '',
        nickname: '',
        initials: '',
        dob:'',
        gender: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        phoneNumber: {
            work: '',
            cell: '',
            other: ''
        },
        emergencyContact: {
            name: '',
            relationship: '',
            phoneNumber: ''
        },
        email: '',
        
        // WORK INFORMATION
        compartment: '',
        title: '',
        providerRole: '',
        hiredAt: '',
        username: '',
        employeeId: '',
        jobSchedule: '',
        password:''
    }
}

export const staffAtom = atom({
    key: 'init',
    default: staffState  
});

export const useStaffValue = ()=> useRecoilValue(staffAtom);
export const useStaffState = ()=> useRecoilState(staffAtom);
export const useSetStaffState = ()=> useSetRecoilState(staffAtom);