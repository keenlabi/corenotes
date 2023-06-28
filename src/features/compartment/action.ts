import { getFetch, postFetch } from "src/lib/fetch"
import { successResponseType } from "src/lib/types"
import { CompartmentListItem } from "./types"

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
    data: { compartment:CompartmentListItem }
}

export function getCompartmentDetails(compartmentId:number) {
    return new Promise<IGetCompartmentDetailsResponse>((resolve, reject)=> {
        getFetch(`/compartment/details/${compartmentId}`)
        .then((response)=> {
            resolve({
                ...response,
                data: { compartment: response.data.compartment }
            })
        })
        .catch((error)=> reject(error))
    })
}