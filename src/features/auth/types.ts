import { initStateType } from "../types"

export interface authStateType extends initStateType {
    isSignedIn:boolean
}

export interface actionError {
    code:number,
    message:string
}