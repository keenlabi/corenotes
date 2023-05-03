import capitalize from "src/utils/capitalize"
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
            id: staff.id,
            profileImage:staff.profileImage,
            fullname: `${capitalize(staff.firstname)}, ${staff.lastname.toUpperCase()}`,
            role: staff.role,
            phoneNumber: staff.phoneNumber,
            compartment: 'Test compartment',
            createdAt: staff.createdAt
        }
    })
}