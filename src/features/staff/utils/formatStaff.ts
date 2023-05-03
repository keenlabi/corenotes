import { IUser } from "../types"

export interface staffDetailsType extends Omit<IUser, '_id'> {
    id: string
}

export default function formatStaff(staff:IUser):staffDetailsType {
    return {
        ...staff,
        id: staff._id ?? ""
    }
}