import { postFetch } from "src/lib/fetch"

export default function LoginAction(payload:{username:string, password:string}) {
    return new Promise((resolve, reject)=> {
        console.log(payload)
        
        postFetch(`/auth/login`, payload)
        .then((response)=> {
            resolve(response)
        })
        .catch((error)=> {
            reject(error)
        })
    })
}