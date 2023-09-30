import { getFetch, patchFetch, postFetch } from "src/lib/fetch"
import { successResponseType } from "src/lib/types"
import { CompartmentDetails, CompartmentListItem, ICompartmentServices } from "./types"

export interface GetCompartmentsResponse extends successResponseType {
    data: {
        compartments:CompartmentListItem[],
        currentListPage:number,
        totalListPages:number
    }
}

export function getCompartmentList(pageNumber:number) {
    return new Promise<GetCompartmentsResponse>((resolve, reject)=> {
        getFetch(`/compartments/${pageNumber}`)
        .then((response:successResponseType)=> {
            resolve({
                ...response,
                data: { 
                    compartments: response.data.compartments,
                    currentListPage: response.data.currentListPage,
                    totalListPages: response.data.totalListPages
                }
            })
        })
        .catch((error)=> reject(error))
    })
}

export interface newCompartmentData {
    title:string,
    compartmentImage:Blob|MediaSource|undefined
    bgColor?:string,
    loaderColor?:string
}

export function postCompartment(payload:FormData) {
    return new Promise<GetCompartmentsResponse>((resolve, reject)=> {
        postFetch(`/compartments`, payload)
        .then((response)=> {
            resolve({
                ...response,
                data: { 
                    compartments: response.data.compartments,
                    currentListPage: response.data.currentListPage,
                    totalListPages: response.data.totalListPages
                }
            })
        })
        .catch((error)=> reject(error))
    })
}

export interface IGetCompartmentDetailsResponse extends successResponseType {
    data: { compartment:CompartmentDetails }
}

export function getCompartmentDetails(compartmentId:number) {
    return new Promise<IGetCompartmentDetailsResponse>((resolve, reject)=> {
        getFetch(`/compartments/details/${compartmentId}`)
        .then((response)=> {
            resolve({
                ...response,
                data: { compartment: response.data.compartment }
            })
        })
        .catch((error)=> reject(error))
    })
}

interface IPostNewSubcompartment {
    title:string;
}

export function postNewSubcompartment(compartmentId:number, payload:IPostNewSubcompartment) {
    return new Promise<IGetCompartmentDetailsResponse>((resolve, reject)=> {
        postFetch(`/compartments/${compartmentId}`, payload)
        .then((response)=> {
            resolve({
                ...response,
                data: { compartment: response.data.compartment }
            })
        })
        .catch((error)=> reject(error))
    })
}

export interface IGetCompartmentServicesResponse extends successResponseType {
    data: { compartmentServices:Array<ICompartmentServices> }
}

export function getCompartmentServices(compartmentId:number) {
    return new Promise<IGetCompartmentServicesResponse>((resolve, reject)=> {
        getFetch(`/compartments/${compartmentId}/services`)
        .then((response)=> {
            resolve({
                ...response,
                data: { compartmentServices: response.data.compartmentServices }
            })
        })
        .catch((error)=> reject(error))
    })
}

export function patchCompartmentServiceDetails(compartmentId:number, payload:{serviceId:string}) {
    return new Promise<IGetCompartmentServicesResponse>((resolve, reject)=> {
        patchFetch(`/compartments/${compartmentId}/services`, payload)
        .then((response)=> {
            resolve({
                ...response,
                data: { compartmentServices: response.data.compartmentServices }
            })
        })
        .catch((error)=> reject(error))
    })
}

// export function getSubCompartmentsAction(compartmentId:number) {
//     return new Promise<IGetCompartmentServicesResponse>((resolve, reject)=> {
//         getFetch(`/compartments/${compartmentId}/subcompartments`)
//         .then((response)=> {
//             resolve({
//                 ...response,
//                 data: { compartmentServices: response.data.compartmentServices }
//             })
//         })
//         .catch((error)=> reject(error))
//     })
// }
