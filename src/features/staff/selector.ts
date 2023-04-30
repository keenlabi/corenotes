import { selectorFamily, useRecoilValue } from "recoil";
import fetchStaffListAction, { fetchStaffListSuccessResponseType } from "./actions";
import formatStaffList from "./utils/formatStaffsList";

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
            console.log(error)
            return {
                code: error.response.code,
                error: true,
                message: error.response.message,
                staffs: []
            }
        })
    }
})

export const useFetchStaffListSelector = (pageNumber:number)=> useRecoilValue(fetchStaffsListSelector(pageNumber))