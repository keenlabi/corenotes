import { initStateType } from "../types";
import { staffDetailsType } from "./utils/formatStaff";
import { staffsListType } from "./utils/formatStaffsList";

export interface IUser {
    id:string,
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

export interface NewStaffType {
    // PERSONAL INFORMATION
    firstname: string,
    lastname: string,
    nickname: string,
    initials: string,
    dob:string,
    gender: string,
    address: string,
    city: string,
    state: string,
    zipCode: string,
    phoneNumber: {
        work: string,
        cell: string,
        other: string
    },
    emergencyContact: {
        name: string,
        relationship: string,
        phoneNumber: string
    },
    email: string,
    profileImage?:Blob|MediaSource,
    
    // WORK INFORMATION
    compartment: string,
    title: string,
    providerRole: string,
    hiredAt: string,
    username: string,
    employeeId: string,
    jobSchedule: string,
    password: string
}

export interface staffStateType extends initStateType {
    currentPage:number,
    totalPages:number,
    list:staffsListType[],
    details: staffDetailsType,
    newStaff: NewStaffType
}