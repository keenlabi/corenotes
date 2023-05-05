import { IUser } from "../types"
import { staffsDocumentsListType } from "./formatStaffDocuments"

export interface staffDetailsType {
    id: string,
    // ACCOUNT INFO
    role: string,
    lastSeen: string,
    
    // PERSONAL INFORMATION
    personal: {
        firstname: string,
        lastname: string,
        nickname: string,
        initials: string,
        dob:string,
        gender: string,
        address: string,
        city: string,
        state: string,
        zipCode: string,
        phoneNumber: {
            work: string,
            cell: string,
            other: string
        },
        emergencyContact: {
            name: string,
            relationship: string,
            phoneNumber: string
        },
        email: string,
        profileImage: string,
    },
    
    work: {
        // WORK INFORMATION
        compartment: string,
        title: string,
        providerRole: string,
        hiredAt: string,
        username: string,
        employeeId: string,
        jobSchedule: string
    },

    documents?: Array<staffsDocumentsListType>|[]
}

export default function formatStaff(staff:IUser):staffDetailsType {
    return {
        ...staff,
        id: staff.id ?? "",
        role: staff.role,
        lastSeen: staff.lastSeen,
        // PERSONAL INFORMATION
        personal: {
            firstname: staff.firstname,
            lastname: staff.lastname,
            nickname: staff.nickname,
            initials: staff.initials,
            dob:staff.dob,
            gender: staff.gender,
            address: staff.address,
            city: staff.city,
            state: staff.state,
            zipCode: staff.zipCode,
            phoneNumber: {
                work: staff.phoneNumber.work,
                cell: staff.phoneNumber.cell,
                other: staff.phoneNumber.other
            },
            emergencyContact: {
                name: staff.emergencyContact.name,
                relationship: staff.emergencyContact.relationship,
                phoneNumber: staff.emergencyContact.phoneNumber
            },
            email: staff.email,
            profileImage: staff.profileImage,
        },
        work: {
            // WORK INFORMATION
            compartment: staff.compartment,
            title: staff.title,
            providerRole: staff.providerRole,
            hiredAt: staff.hiredAt,
            username: staff.username,
            employeeId: staff.employeeId,
            jobSchedule: staff.jobSchedule        
        },
        documents: []
    }
}