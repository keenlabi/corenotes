import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userStateType } from "./types";

export const userInitState:userStateType = {
    status: 'IDLE',
    error: false,
    message: '',
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
        documents: []
    },
}


export const userAtom = atom({
    key: 'userState',
    default: userInitState  
});

export const useUserStateValue = ()=> useRecoilValue(userAtom);
export const useUserState = ()=> useRecoilState(userAtom);
export const useSetUserState = ()=> useSetRecoilState(userAtom);