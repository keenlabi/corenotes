import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { initStateType } from "./types";

export const InitState:initStateType = {
    status: 'IDLE',
    error: false,
    message: ''
}

export const InitAtom = atom({
    key: 'init',
    default: InitState  
});

export const useInitValue = ()=> useRecoilValue(InitAtom);
export const useInitState = ()=> useRecoilState(InitAtom);
export const useSetInitState = ()=> useSetRecoilState(InitAtom);