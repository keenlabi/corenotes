import capitalize from "src/utils/capitalize"
import { staffListType } from "../actions"

export interface staffsListType {
    id:string,
    profileImage: string,
    fullname: string,
    role: string,
    phoneNumber: string,
    compartment: string
}

export default function formatStaffList(staffs:staffListType[]):staffsListType[] {
    if(!staffs.length) return []

    return staffs.map((staff:staffListType)=> {
        return {
            id: staff.id,
            profileImage:staff.profileImage,
            fullname: `${capitalize(staff.firstname)}, ${staff.lastname.toUpperCase()}`,
            role: staff.role,
            phoneNumber: staff.phoneNumber,
            compartment: 'Test compartment'
        }
    })
}