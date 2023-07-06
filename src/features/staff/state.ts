import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { staffStateType } from "./types";

export const staffInitState:staffStateType = {
    status: 'IDLE',
    error: false,
    message: '',
    list:[],
    currentPage:1,
    totalPages:1,
    details: {
        // ACCOUNT INFO
        id: '',
        active: true,
        role: '',
        lastSeen: '',
        // PERSONAL INFORMATION
        personal: {
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
        },
        // WORK INFORMATION
        work: {
            compartment: '',
            title: '',
            providerRole: '',
            hiredAt: '',
            username: '',
            employeeId: '',
            jobSchedule: '',
        },
    },
    documents: {
        list:[],
        currentPage:1,
        totalPages:1
    },
    currentActivitiesPage: 1,
    totalActivitiesPage: 1,
    activities: [],
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
    },
    roles: {
        list:[],
        currentPage:1,
        totalPages:1,
    },
    roleDetails:{
        id: "",
        title: "",
        privileges:{}
    }
}

export const staffAtom = atom({
    key: 'staffState',
    default: staffInitState  
});

export const useStaffValue = ()=> useRecoilValue(staffAtom);
export const useStaffState = ()=> useRecoilState(staffAtom);
export const useSetStaffState = ()=> useSetRecoilState(staffAtom);