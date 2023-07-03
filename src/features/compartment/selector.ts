import { selectorFamily, useRecoilValue } from "recoil";
import { GetCompartmentsResponse, IGetCompartmentDetailsResponse, getCompartmentDetails, getCompartmentList } from "./action";
import { compartmentInitState } from "./state";

interface IFetchCompartmentListType {
    list:Pick<GetCompartmentsResponse, 'data'>['data'],
    code:number,
    message:string,
    error:boolean
}

const fetchCompartmentList = selectorFamily({
    key:'fetch_compartment_list',
    get: (pageNumber:number) => async () => {
        return await getCompartmentList(pageNumber)
        .then(({ data }:GetCompartmentsResponse)=> {
            return {
                list: data,
                code: 200,
                message: '',
                error: false
            } satisfies IFetchCompartmentListType;
        })
        .catch((error)=> {
            return {
                list: {
                    compartments: compartmentInitState.compartmentsList,
                    currentListPage: compartmentInitState.currentListPage,
                    totalListPages: compartmentInitState.totalListPages
                },
                code: error.code,
                message: error.message,
                error: true
            } satisfies IFetchCompartmentListType;
        })
    }
})

export const useFetchCompartmentList = (pageNumber:number)=> useRecoilValue(fetchCompartmentList(pageNumber))


interface IFetchCompartmentDetailsType {
    compartment:Pick<IGetCompartmentDetailsResponse, 'data'>['data']['compartment'],
    code:number,
    message:string,
    error:boolean
}

const fetchCompartmentDetails = selectorFamily({
    key:'fetch_compartment_details',
    get: (compartmentId:number) => async ()=> {
        return await getCompartmentDetails(compartmentId)
        .then(({ data }:IGetCompartmentDetailsResponse)=> {
            return {
                compartment: data.compartment,
                code: 200,
                message: '',
                error: false
            } satisfies IFetchCompartmentDetailsType;
        })
        .catch((error)=> {
            return {
                compartment: compartmentInitState.compartment,
                code: error.statusCode,
                message: error.message,
                error: false
            } satisfies IFetchCompartmentDetailsType;
        })
    }
})
export const useFetchCompartmentDetails = (compartmentId:number)=> useRecoilValue(fetchCompartmentDetails(compartmentId))

// const fetchCompartmentServiceDetails = selectorFamily({
//     key:'fetch_compartment_service_details',
//     get:(serviceId:number)=> async ()=> {
        
//     }
// })