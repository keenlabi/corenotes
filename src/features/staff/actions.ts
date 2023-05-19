import { getFetch, postFetch } from "src/lib/fetch"
import { successResponseType } from "src/lib/types"
import { IActivity, IUser } from "./types"
import { staffActivityType } from "./utils/formatStaffActivities"

export interface staffListType {
    id: string,
    lastname: string,
    firstname: string,
    compartment: string,
    role: string,
    profileImage: string,
    phoneNumber: string
}

export interface fetchStaffListSuccessResponseType extends Omit<successResponseType, 'data'> {
    data: {
        currentPage:number,
        totalPages:number,
        staffs: staffListType[]
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
        .catch((error)=> {
            reject(error)
        })
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

export interface fetchStaffDocumentsSuccessResponseType extends Omit<successResponseType, 'data'> {
    data: {
        currentPage:number,
        totalPages:number,
        documents: IUser['documents']
    }
}

export function fetchStaffDocumentsAction(staffId:string, pageNumber:number) {
    return new Promise<fetchStaffDocumentsSuccessResponseType>((resolve, reject)=> {
        getFetch(`/staffs/${staffId}/documents/${pageNumber}`)
        .then((response:successResponseType)=> {
            resolve({
                ...response,
                data: {
                    currentPage:response.data.currentPage,
                    totalPages:response.data.totalPages,
                    documents: response.data.documents
                }
            })
        })
        .catch((error)=> reject(error))
    })
}

export function uploadStaffDocumentAction(staffId:string, payload:FormData) {
    return new Promise<fetchStaffDocumentsSuccessResponseType>((resolve, reject)=> {
        postFetch(`/staffs/${staffId}/documents`, payload)
        .then((response:successResponseType)=> resolve({
            ...response,
            data: {
                currentPage:response.data.currentPage,
                totalPages:response.data.totalPages,
                documents: response.data.documents
            }
        }))
        .catch((error)=> reject(error))
    })
}

export function updateStaffPasswordAction(staffId:string, payload:{newPassword:string}) {
    return new Promise<successResponseType>((resolve, reject)=> {
        postFetch(`/staffs/${staffId}/password-reset`, payload)
        .then((response:successResponseType)=> resolve(response))
        .catch((error)=> reject(error))
    })
}

export function deactivateStaffPasswordAction(staffId:string, payload:{password:string}) {
    return new Promise<fetchStaffSuccessResponseType>((resolve, reject)=> {
        postFetch(`/staffs/${staffId}/deactivate`, payload)
        .then((response:successResponseType)=> {
            resolve({
                ...response,
                data: {
                    staff: response.data.staff
                }
            })
        })
        .catch((error)=> reject(error))
    })
}

export function activateStaffPasswordAction(staffId:string, payload:{password:string}) {
    return new Promise<fetchStaffSuccessResponseType>((resolve, reject)=> {
        postFetch(`/staffs/${staffId}/activate`, payload)
        .then((response:successResponseType)=> {
            resolve({
                ...response,
                data: {
                    staff: response.data.staff
                }
            })
        })
        .catch((error)=> reject(error))
    })
}

export interface fetchStaffActivitiesSuccessResponseType extends Omit<successResponseType, 'data'> {
    data: {
        currentPage:number,
        totalPages:number,
        activities: IActivity[]
    }
}

export function fetchStaffActivitiesAction(staffId:string, pageNumber:number, activityType: string) {
    return new Promise<fetchStaffActivitiesSuccessResponseType>((resolve, reject)=> {
        postFetch(`/staffs/${staffId}/activities/${pageNumber}`, {activityType: activityType})
        .then((response:successResponseType)=> {
            resolve({
                ...response,
                data: {
                    currentPage:response.data.currentPage,
                    totalPages:response.data.totalPages,
                    activities: response.data.activities
                }
            })
        })
        .catch((error)=> reject(error))
    })
}