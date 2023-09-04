import { getFetch, patchFetch, postFetch } from "src/lib/fetch"
import { successResponseType } from "src/lib/types"
import { IMedication, IMedicationDetails, IMedicationType, INewMedication } from "./types";
import { IndividualListItemType } from "../Individual/types";

export interface IFetchMedicationListResponse extends Omit<successResponseType, 'data'> {
    data:{
        currentPage:number;
        totalPages:number;
        list:Array<IMedication>
    }
}

export function fetchMedicationsListAction(medType:IMedicationType, pageNumber:number) {
    return new Promise<IFetchMedicationListResponse>((resolve, reject)=> {
        getFetch(`/medications/?pageNumber=${pageNumber}&medType=${medType}`)
        .then((response)=> {
            resolve({
                ...response,
                data: {
                    currentPage: response.data.currentPage,
                    totalPages: response.data.totalPages,
                    list: response.data.medications,
                }
            })
        })
        .catch((error)=> reject(error))
    })
}

export function createMedicationAction(payload:INewMedication) {
    return new Promise<IFetchMedicationListResponse>((resolve, reject)=> {
        postFetch('/medications/', payload)
        .then((response)=> {
            resolve({
                ...response,
                data: {
                    currentPage: response.data.currentPage,
                    totalPages: response.data.totalPages,
                    list: response.data.medications,
                }
            })
        })
        .catch((error)=> reject(error))
    })
}

export interface IFetchMedicationDetailsResponse extends Omit<successResponseType, 'data'> {
    data:{
        medication:IMedicationDetails
    }
}

export function fetchMedicationDetailsAction(medicationId:number) {
    return new Promise<IFetchMedicationDetailsResponse>((resolve, reject)=> {
        getFetch(`/medications/details/${medicationId}`)
        .then((response)=> {
            resolve({
                ...response,
                data: {
                    medication: response.data.medication,
                }
            })
        })
        .catch((error)=> reject(error))
    })
}

export interface IAddMedicationToService {
    medicationId:number;
    serviceId:string;
}

export function addMedicationToServiceAction(payload:IAddMedicationToService) {
    return new Promise<IFetchMedicationDetailsResponse>((resolve, reject)=> {
        patchFetch(`/medications/${payload.medicationId}/services`, { serviceId: payload.serviceId })
        .then((response)=> {
            resolve({
                ...response,
                data: {
                    medication: response.data.medication
                }
            })
        })
        .catch((error)=> reject(error))
    })
}

export interface IFetchMedicationIndividualsResponse extends Omit<successResponseType, 'data'> {
    data:{
        individuals:Array<IndividualListItemType>
    }
}

export function fetchMedicationServicesIndividualsAction(medicationId:number, serviceId:number) {

    return new Promise<IFetchMedicationIndividualsResponse>((resolve, reject)=> {
        getFetch(`/medications/${medicationId}/individuals`, { serviceId })
        .then((response)=> {
            resolve({
                ...response,
                data: { individuals: response.data.individuals }
            })
        })
        .catch((error)=> reject(error))
    })
}