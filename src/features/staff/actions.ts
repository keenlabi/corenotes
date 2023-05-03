import { getFetch, postFetch } from "src/lib/fetch"
import { successResponseType } from "src/lib/types"
import { IUser } from "./types"

export interface fetchStaffListSuccessResponseType extends Omit<successResponseType, 'data'> {
    data: {
        currentPage:number,
        totalPages:number,
        staffs: IUser[]
    }
}

export function fetchStaffListAction(payload:{pageNumber:number}) {
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

export interface fetchStaffSuccessResponseType extends Omit<successResponseType, 'data'> {
    data: {
        staff: IUser
    }
}

export function fetchStaffAction(payload:{id:string}) {
    return new Promise<fetchStaffSuccessResponseType>((resolve, reject)=> {
        getFetch(`/staffs/profile/${payload.id}`)
        .then((response:successResponseType)=> {
            resolve({
            ...response, 
            data: { 
                staff: response.data.staff
            }
        })})
        .catch((error)=> reject(error))
    })
}

export function registerStaffAction(payload:FormData) {
    return new Promise<fetchStaffListSuccessResponseType>((resolve, reject)=> {
        postFetch(`/staffs/register`, payload)
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