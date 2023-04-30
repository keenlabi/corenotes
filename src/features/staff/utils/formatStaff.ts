import { IUser } from "../types"

export interface staffDetailsType extends Omit<IUser, '_id'> {
    id: string
}

export default function formatStaffList(staff:IUser):staffDetailsType {
    return {
        ...staff,
        id: staff._id ?? ""
    }
}