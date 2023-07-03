import { getFetch, postFetch } from "src/lib/fetch"
import { successResponseType } from "src/lib/types"
import { ServicesListItemType } from "./types"

export interface GetServicesResponse extends successResponseType {
    data: {
        services:ServicesListItemType[],
        currentPage:number,
        totalPages:number
    }
}

export function getServicesList(pageNumber:number) {
    return new Promise<GetServicesResponse>((resolve, reject)=> {
        getFetch(`/services/${pageNumber}`)
        .then((response:successResponseType)=> {
            resolve({
                ...response,
                data: { 
                    services: response.data.services,
                    currentPage: response.data.currentListPage,
                    totalPages: response.data.totalListPages
                }
            })
        })
        .catch((error)=> reject(error))
    })
}

export function getAllProvidedServiceAction(pageNumber:number) {
    return new Promise<GetServicesResponse>((resolve, reject)=> {
        getFetch(`/services/provided/${pageNumber}`)
        .then((response)=> {
            resolve({
                ...response,
                data: { 
                    services: response.data.services,
                    currentPage: response.data.currentListPage,
                    totalPages: response.data.totalListPages
                }
            })
        })
        .catch((error)=> reject(error))
    })
}

export interface newServiceData {
    title:string,
    category:string,
    compartments?:Array<string>
}

export function postService(payload:newServiceData) {
    return new Promise<GetServicesResponse>((resolve, reject)=> {
        postFetch(`/services`, payload)
        .then((response)=> {
            resolve({
                ...response,
                data: { 
                    services: response.data.services,
                    currentPage: response.data.currentPage,
                    totalPages: response.data.totalPages
                }
            })
        })
        .catch((error)=> reject(error))
    })
}

export interface IGetServiceDetailsResponse extends successResponseType {
    data: { service:ServicesListItemType }
}

export function getServiceDetails(serviceId:number) {
    return new Promise<IGetServiceDetailsResponse>((resolve, reject)=> {
        getFetch(`/services/details/${serviceId}`)
        .then((response)=> {
            resolve({
                ...response,
                data: { service: response.data.service }
            })
        })
        .catch((error)=> reject(error))
    })
}