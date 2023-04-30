import { initStateType } from "../types";
import { staffsListType } from "./utils/formatStaffsList";

export interface IUser {
    _id:string,
    email: string,
    username: string,
    password: string,
    accessToken: string,
    phoneNumber: string,
    firstname: string,
    lastname: string,
    role: string,
    createdAt: Date,
    lastSeen: Date,
    profileImage:string
}

export interface staffStateType extends initStateType {
    currentPage:number,
    totalPages:number,
    list:staffsListType[]
}