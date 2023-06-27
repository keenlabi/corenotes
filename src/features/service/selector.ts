import { selectorFamily, useRecoilValue } from "recoil";
import { GetServicesResponse, getServicesList } from "./action";
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