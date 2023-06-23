import { getFetch } from "src/lib/fetch"
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