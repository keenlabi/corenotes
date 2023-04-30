import { IUser } from "../types"

export interface staffsListType {
    id:string,
    profileImage: string,
    fullname: string,
    role: string,
    phoneNumber: string,
    compartment: string,
    createdAt: Date
}

export default function formatStaffList(staffs:IUser[]):staffsListType[] {
    if(!staffs.length) return []

    return staffs.map((staff:IUser)=> {
        return {
            id: staff._id,
            profileImage:staff.profileImage,
            fullname: `${staff.firstname}, ${staff.lastname}`,
            role: staff.role,
            phoneNumber: staff.phoneNumber,
            compartment: 'Test compartment',
            createdAt: staff.createdAt
        }
    })
}