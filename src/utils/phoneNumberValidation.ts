
const phoneNumberValid = (phoneNumber:string) => {
    if(phoneNumber.length !== 10) return false;
    return true
};

export { phoneNumberValid };
