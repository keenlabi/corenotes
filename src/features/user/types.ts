import { initStateType } from "../types";

export interface userStateType extends initStateType {
    details:{
        id: string,
        // ACCOUNT INFO
        role:{
            title:string,
            privileges:{
                staff_profile_view:boolean;
                staff_registration:boolean;
                staff_document_upload:boolean;
            }
        },
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