import { initStateType } from "../types"

export interface authStateType extends initStateType {
    isSignedIn:boolean
    signupDetails: {
        email:string,
        fullname:string,
        password:string,
        phoneNumber:string,
        bank: {
            name:string,
            accountNumber:string,
            accountName:string
        }
    },
    bankVerification: {
        verified: false,
        bankCode: string,
        bankName:string,
        accountNumber:string,
        accountName:string
    },
}

export interface actionError {
    code:number,
    message:string
}