import { getFetch } from "../lib/fetch";

const emailExists = async (email:string)=> {
    return new Promise((resolve, reject)=> {
        getFetch(`/auth/verify-email/${email}`, )
        .then((response:any)=> resolve(response.data))
        .catch((error)=> reject(error))
    });
}

const emailValid = (email:string)=> {
    if(email.split('').includes(' ')) return false;

    const EmailRegEx = /^[-!#$%&'*+0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    if(EmailRegEx.test(email)) return true
    return false;
}

export { emailExists, emailValid }