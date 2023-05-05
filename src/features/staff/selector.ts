import { selectorFamily, useRecoilValue } from "recoil";
import {fetchStaffAction, fetchStaffDocumentsAction, fetchStaffDocumentsSuccessResponseType, fetchStaffListAction, fetchStaffListSuccessResponseType, fetchStaffSuccessResponseType } from "./actions";
import formatStaffList from "./utils/formatStaffsList";
import formatStaff from "./utils/formatStaff";
import { staffState } from "./state";
import formatStaffDocumentsList from "./utils/formatStaffDocuments";

const fetchStaffsListSelector = selectorFamily({
    key: 'fetch_staffs_list_selector',
    get: (pageNumber:number)=> async ()=> {
        return await fetchStaffListAction({pageNumber})
        .then((response:fetchStaffListSuccessResponseType)=> {
            return {
                staffs: formatStaffList(response.data.staffs),
                code: 200,
                message: '',
                error: false
            }
        })
        .catch((error)=> {
            return {
                code: error.code,
                error: true,
                message: error.message,
                staffs: []
            }
        })
    }
})

export const useFetchStaffListSelector = (pageNumber:number)=> useRecoilValue(fetchStaffsListSelector(pageNumber))

const fetchStaffSelector = selectorFamily({
    key: 'fetch_staff_selector',
    get: (id:string)=> async ()=> {
        return await fetchStaffAction({id})
        .then((response:fetchStaffSuccessResponseType)=> {
            return {
                staff: formatStaff(response.data.staff),
                code: 200,
                message: '',
                error: false
            }
        })
        .catch((error)=> {
            console.log(error)
            return {
                code: 500,
                error: true,
                message: error.response.message,
                staff: staffState.details
            }
        })
    }
})

export const useFetchStaffSelector = (id:string)=> useRecoilValue(fetchStaffSelector(id))

const fetchStaffDocumentsSelector = selectorFamily({
    key: 'fetch_staff_documents_selector',
    get: ({id, pageNumber}:{id:string, pageNumber:number})=> async ()=> {
        return await fetchStaffDocumentsAction(id, pageNumber)
        .then(({ data }:fetchStaffDocumentsSuccessResponseType)=> {
            return {
                documents: formatStaffDocumentsList(data.documents),
                currentPage: data.currentPage,
                totalPages: data.totalPages,
                code: 200,
                message: '',
                error: false
            }
        })
        .catch((error)=> {
            console.log(error)
            return {
                code: 500,
                error: true,
                message: error.response.message,
                documents: [],
                currentPage: 0,
                totalPages: 0,
            }
        })
    }
})

export const useFetchStaffDocumentsSelector = (id:string, pageNumber:number)=> useRecoilValue(fetchStaffDocumentsSelector({id, pageNumber}))