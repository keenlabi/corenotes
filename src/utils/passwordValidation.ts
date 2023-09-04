const is8CharLong = (pwd:string)=> {
    return pwd.length >= 8;
}

const containsDigit = (pwd:string)=> {
    return /^(?=.*?[0-9])/.test(pwd);
}

const containsLowerCaseLetter = (pwd:string)=> {
    return /^(?=.*?[a-z])/.test(pwd);
}

const containsUpperCaseLetter = (pwd:string)=> {
    return /^(?=.*?[A-Z])/.test(pwd);
}

const containsSpecialChar = (pwd:string)=> {
    return /^(?=.*?[#?!@$%^&*-])/.test(pwd);
}

export { is8CharLong, containsDigit, containsLowerCaseLetter, containsUpperCaseLetter, containsSpecialChar }