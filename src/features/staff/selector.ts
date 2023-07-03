import { selectorFamily, useRecoilValue } from "recoil";
import {fetchStaffAction, fetchStaffActivitiesAction, fetchStaffActivitiesSuccessResponseType, fetchStaffDocumentsAction, fetchStaffDocumentsSuccessResponseType, fetchStaffListAction, fetchStaffRolesAction, fetchStaffSuccessResponseType } from "./actions";
import formatStaffList from "./utils/formatStaffsList";
import formatStaff from "./utils/formatStaff";
import { staffInitState } from "./state";
import formatStaffDocumentsList from "./utils/formatStaffDocuments";
import formatStaffActivitiesList from "./utils/formatStaffActivities";
import { IStaffRole } from "./types";

const fetchStaffsListSelector = selectorFamily({
    key: 'fetch_staffs_list_selector',
    get: (pageNumber:number)=> async ()=> {
        return await fetchStaffListAction({pageNumber})
        .then(({data})=> {
            return {
                staffs: formatStaffList(data.staffs),
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
                staff: staffInitState.details
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
                message: error.message,
                documents: [],
                currentPage: 0,
                totalPages: 0,
            }
        })
    }
})
export const useFetchStaffDocumentsSelector = (id:string, pageNumber:number)=> useRecoilValue(fetchStaffDocumentsSelector({id, pageNumber}))

const fetchStaffActivities = selectorFamily({
    key:'fetch_staff_activities',
    get: ({id, pageNumber, activityType}:{id:string, pageNumber:number, activityType:string})=> async ()=> {
        return fetchStaffActivitiesAction(id, pageNumber, activityType)
        .then(({data}:fetchStaffActivitiesSuccessResponseType)=> {
            return {
                code: 200,
                error: false,
                message: '',
                activities: formatStaffActivitiesList(data.activities),
                currentPage: data.currentPage,
                totalPages: data.totalPages,
            }
        })
        .catch((error)=> {
            return {
                code: 500,
                error: true,
                message: error.message,
                activities: [],
                currentPage: 0,
                totalPages: 0,
            }
        })
    }
})

export const useFetchStaffActivities = (data:{id:string, pageNumber:number, activityType:string})=> useRecoilValue(fetchStaffActivities(data));

interface IFetchStaffRolesList {
    message:string;
    code:number;
    error:boolean;
    data: {
        currentPage:number;
        totalPages:number;
        staffRoles:Array<IStaffRole>;
    };
}

const fetchStaffRolesSelector = selectorFamily({
    key:'fetch_staff_roles_selector',
    get: (pageNumber:number)=> async ()=> {
        return await fetchStaffRolesAction(pageNumber)
        .then((response)=> {
            return {
                message: response.message,
                code: response.code,
                error: false,
                data: response.data

            } satisfies IFetchStaffRolesList
        })
        .catch((error)=> {
            console.log(error)
            return {
                code: error.statusCode,
                message: error.message,
                error: false,
                data: {
                    ...staffInitState.roles,
                    staffRoles: staffInitState.roles.list
                }
                
            } satisfies IFetchStaffRolesList
        })
    }
})

export const useFetchStaffRoleSelector = (pageNumber:number) => useRecoilValue(fetchStaffRolesSelector(pageNumber))