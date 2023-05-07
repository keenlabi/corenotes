import { staffDetailsType } from "../staff/utils/formatStaff";
import { initStateType } from "../types";

export interface userStateType extends initStateType {
    details: staffDetailsType,
}