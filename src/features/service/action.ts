import { getFetch, postFetch } from "src/lib/fetch"
import { successResponseType } from "src/lib/types"
import { ServicesListItemType } from "./types"

export interface GetServicesResponse extends successResponseType {
    data: {
        services:ServicesListItemType[],
        currentListPage:number,
        totalListPages:number
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
                    currentListPage: response.data.currentListPage,
                    totalListPages: response.data.totalListPages
                }
            })
        })
        .catch((error)=> reject(error))
    })
}

export interface newServiceData {
    title:string
}

export function postService(payload:newServiceData) {
    return new Promise<GetServicesResponse>((resolve, reject)=> {
        postFetch(`/service`, payload)
        .then((response)=> {
            resolve({
                ...response,
                data: { 
                    services: response.data.compartments,
                    currentListPage: response.data.currentListPage,
                    totalListPages: response.data.totalListPages
                }
            })
        })
        .catch((error)=> reject(error))
    })
}