import { selectorFamily, useRecoilValue } from "recoil";
import { GetCompartmentsResponse, getCompartmentList } from "./action";
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