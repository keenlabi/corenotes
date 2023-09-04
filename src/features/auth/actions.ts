import { postFetch } from "src/lib/fetch"
import { successResponseType } from "src/lib/types"

export function LoginAction(payload:{username:string, password:string}) {
    return new Promise<successResponseType>((resolve, reject)=> {
        postFetch(`/auth/login`, payload)
        .then((response:successResponseType)=> resolve(response))
        .catch((error)=> reject(error))
    })
}


export  function LogOutAction() {
    return new Promise<successResponseType>((resolve, reject)=> {
        postFetch(`/auth/logout`, '')
        .then((response:successResponseType)=> resolve(response))
        .catch((error)=> reject(error))
    })
}
