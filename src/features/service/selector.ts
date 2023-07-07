import { selectorFamily, useRecoilValue } from "recoil";
import { GetServicesResponse, IGetServiceDetailsResponse, IGetServiceIndividualsResponse, IGetServiceListByCategoryResponse, getServiceDetails, getServiceIndividuals, getServicesList, getServicesListByCategory } from "./action";
import { serviceInitState } from "./state";

interface IFetchServiceListType {
    list:Pick<GetServicesResponse, 'data'>['data'],
    code:number,
    message:string,
    error:boolean
}

const fetchServicesList = selectorFamily({
    key:'fetch_services_list',
    get: (pageNumber:number) => async () => {
        return await getServicesList(pageNumber)
        .then(({ data }:GetServicesResponse)=> {
            return {
                list: data,
                code: 200,
                message: '',
                error: false
            } satisfies IFetchServiceListType;
        })
        .catch((error)=> {
            return {
                list: {
                    services: serviceInitState.servicesList,
                    currentPage: serviceInitState.currentListPage,
                    totalPages: serviceInitState.totalListPages
                },
                code: error.statusCode,
                message: error.message,
                error: true
            } satisfies IFetchServiceListType;
        })
    }
})
export const useFetchServicesList = (pageNumber:number)=> useRecoilValue(fetchServicesList(pageNumber))

interface IFetchServiceDetailsType {
    service:Pick<IGetServiceDetailsResponse, 'data'>['data']['service'],
    code:number,
    message:string,
    error:boolean
}

const fetchServiceDetails = selectorFamily({
    key:'fetch_service_details',
    get: (serviceId:number) => async ()=> {
        return await getServiceDetails(serviceId)
        .then(({ data }:IGetServiceDetailsResponse)=> {
            return {
                service: data.service,
                code: 200,
                message: '',
                error: false
            } satisfies IFetchServiceDetailsType;
        })
        .catch((error)=> {
            return {
                service: serviceInitState.service,
                code: error.statusCode,
                message: error.message,
                error: false
            } satisfies IFetchServiceDetailsType;
        })
    }
})
export const useFetchServiceDetails = (serviceId:number)=> useRecoilValue(fetchServiceDetails(serviceId))


interface IFetchServiceIndividualsType {
    serviceIndividuals:Pick<IGetServiceIndividualsResponse, 'data'>['data'],
    code:number,
    message:string,
    error:boolean
}

const fetchServiceIndividualsSelector = selectorFamily({
    key:'fetch_service_individual_selector',
    get: ({serviceId, pageNumber}:{serviceId:number, pageNumber:number}) => async ()=> {
        return await getServiceIndividuals(serviceId, pageNumber)
        .then((response)=> {
            return {
                serviceIndividuals: response.data,
                code: 200,
                message: response.message,
                error: false

            } satisfies IFetchServiceIndividualsType;
        })
        .catch((error)=> {
            return {
                serviceIndividuals: serviceInitState.service.individuals,
                code: error.statusCode,
                message: error.message,
                error: false

            } satisfies IFetchServiceIndividualsType;
        })
    }
})
export const useFetchServiceIndividualsSelector = (serviceId:number, pageNumber:number)=>  useRecoilValue(fetchServiceIndividualsSelector({serviceId, pageNumber}))

interface IFetchServiceListByCategoryType {
    services:Pick<IGetServiceListByCategoryResponse, 'data'>['data'];
    message:string;
    error:boolean;
    code:number;
}

const fetchServicesListByCategory = selectorFamily({
    key: 'fetch_services_list',
    get: ({ category, pageNumber }:{ category:string, pageNumber:number })=> async ()=> {
        return getServicesListByCategory(category, pageNumber)
        .then((response)=> {
            return {
                services: response.data,
                message: response.message,
                code: response.code,
                error: false,

            } satisfies IFetchServiceListByCategoryType
        })
        .catch((error)=> {
            return {
                services: {
                    list: [],
                    currentPage:1,
                    totalPages:0
                },
                message: error.message,
                code: error.code,
                error: true,

            } satisfies IFetchServiceListByCategoryType
        })
    }
})
export const useFetchServicesByCategorySelector = (category:string, pageNumber:number)=> useRecoilValue(fetchServicesListByCategory({category, pageNumber}))