import { getFetch } from "src/lib/fetch"
import { successResponseType } from "src/lib/types"
import { IUser } from "./types"

export interface fetchStaffListSuccessResponseType extends Omit<successResponseType, 'data'> {
    data: {
        currentPage:number,
        totalPages:number,
        staffs: IUser[]
    }
}

export default function fetchStaffListAction(payload:{pageNumber:number}) {
    return new Promise<fetchStaffListSuccessResponseType>((resolve, reject)=> {
        getFetch(`/staffs/${payload.pageNumber}`)
        .then((response:successResponseType)=> resolve({
            ...response, 
            data: { 
                currentPage: response.data.currentPage,
                totalPages: response.data.currentPage,
                staffs: response.data.staffs
            }
        }))
        .catch((error)=> reject(error))
    })
}