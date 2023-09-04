import { selectorFamily, useRecoilValue } from "recoil"
import { IFetchMedicationDetailsResponse, IFetchMedicationListResponse, fetchMedicationDetailsAction, fetchMedicationsListAction } from "./action";
import { medicationInitState } from "./state";
import { IMedicationType } from "./types";

interface IFetchMedicationList {
    medications: Pick<IFetchMedicationListResponse, 'data'>['data'];
    code:number;
    message:string;
    error:boolean;
}

const fetchMedicationsListSelector = selectorFamily({
    key: 'fetch_medications_list_selector',
    get: ({medType, pageNumber}:{medType:IMedicationType, pageNumber:number})=> async ()=> {
        return await fetchMedicationsListAction(medType, pageNumber)
        .then((response)=> {
            return {
                medications: response.data,
                code: response.code,
                message: response.message,
                error: false

            } satisfies IFetchMedicationList
        })
        .catch((error)=> {
            return {
                code: error.code,
                error: true,
                message: error.message,
                medications: medicationInitState.medications

            } satisfies IFetchMedicationList
        })
    }
})
export const useFetchMedicationsListSelector = (medType:IMedicationType, pageNumber:number)=> useRecoilValue(fetchMedicationsListSelector({medType, pageNumber}))

interface IFetchMedicationDetails {
    medication: Pick<IFetchMedicationDetailsResponse, 'data'>['data']['medication'];
    code:number;
    message:string;
    error:boolean;
}

const fetchMedicationDetailsSelector = selectorFamily({
    key: 'fetch_medication_details_selector',
    get: (medicationId:number)=> async ()=> {
        return await fetchMedicationDetailsAction(medicationId)
        .then((response)=> {
            return {
                medication: response.data.medication,
                code: response.code,
                message: response.message,
                error: false

            } satisfies IFetchMedicationDetails
        })
        .catch((error)=> {
            return {
                code: error.code,
                error: true,
                message: error.message,
                medication: medicationInitState.medicationDetails

            } satisfies IFetchMedicationDetails
        })
    }
})
export const useFetchMedicationDetailsSelector = (medicationId:number)=> useRecoilValue(fetchMedicationDetailsSelector(medicationId))