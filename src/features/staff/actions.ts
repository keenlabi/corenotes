import { getFetch, patchFetch, postFetch } from "src/lib/fetch"
import { successResponseType } from "src/lib/types"
import { IActivity, IStaffDetails, IStaffDocument, IStaffRole, IStaffRoleDetails, IStaffUser } from "./types"

export interface staffListType {
    id:string;
    staffId:number;
    profileImage:string;
    firstname:string;
    lastname:string;
    role:string;
    phoneNumber:string;
    lastSeen:string;
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
        staff:IStaffDetails
    }
}

export function fetchStaffAction(staffId:string) {
    return new Promise<fetchStaffSuccessResponseType>((resolve, reject)=> {
        getFetch(`/staffs/profile/${staffId}`)
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
        list:Array<IStaffDocument>
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
                    list: response.data.documents
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
                list: response.data.documents
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

export interface fetchStaffRolesSuccessResponseType extends Omit<successResponseType, 'data'> {
    data: {
        currentPage:number,
        totalPages:number,
        staffRoles:IStaffRole[]
    }
}

export interface IAddStaffRoleRequest {
    title:string,
    privileges:{unknown:any}
}

export function addStaffRoleAction(payload:IAddStaffRoleRequest) {
    return new Promise<fetchStaffRolesSuccessResponseType>((resolve, reject)=> {
        postFetch(`/staffs/roles/`, payload)
        .then((response:successResponseType)=> {
            resolve({
                ...response,
                data: {
                    currentPage:response.data.currentPage,
                    totalPages:response.data.totalPages,
                    staffRoles: response.data.staffRoles
                }
            })
        })
        .catch((error)=> reject(error))
    })
}

export function fetchStaffRolesAction(pageNumber:number) {
    return new Promise<fetchStaffRolesSuccessResponseType>((resolve, reject)=> {
        getFetch(`/staffs/roles/${pageNumber}`)
        .then((response:successResponseType)=> {
            resolve({
                ...response,
                data: {
                    currentPage:response.data.currentPage,
                    totalPages:response.data.totalPages,
                    staffRoles: response.data.staffRoles
                }
            })
        })
        .catch((error)=> reject(error))
    })
}

export interface fetchStaffRolesDetailsSuccessResponseType extends Omit<successResponseType, 'data'> {
    data: {
        staffRoleDetails:IStaffRoleDetails
    }
}

export function fetchStaffRoleDetailsAction(roleId:string) {
    return new Promise<fetchStaffRolesDetailsSuccessResponseType>((resolve, reject)=> {
        getFetch(`/staffs/roles/details/${roleId}`)
        .then((response:successResponseType)=> {
            resolve({
                ...response,
                data: {
                    staffRoleDetails: response.data.staffRoleDetails
                }
            })
        })
        .catch((error)=> reject(error))
    })
}

export function updateStaffProfileAction(payload:{ staffId:string, providerRole:string }) {
    return new Promise<fetchStaffSuccessResponseType>((resolve, reject)=> {
        patchFetch('/staffs/update', payload)
        .then((response)=> {
            resolve({
                ...response,
                data: { 
                    staff: response.data.staff,
                }
            })
        })
        .catch((error)=> reject(error))
    })
}