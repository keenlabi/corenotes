import { initStateType } from "../types";

export interface userStateType extends initStateType {
    details:{
        id: string,
        // ACCOUNT INFO
        role: string,
        active: boolean,
        lastSeen: string,
        
        // PERSONAL INFORMATION
        personal: {
            firstname: string,
            lastname: string,
            profileImage: string,
        }
    }
}