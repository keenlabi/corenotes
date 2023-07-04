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
            profileImage: ''
        }
    },
}


export const userAtom = atom({
    key: 'userState',
    default: userInitState  
});

export const useUserStateValue = ()=> useRecoilValue(userAtom);
export const useUserState = ()=> useRecoilState(userAtom);
export const useSetUserState = ()=> useSetRecoilState(userAtom);