import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { authStateType } from "./types";

<<<<<<< HEAD
export const authInitState:authStateType = {
    isSignedIn: (localStorage.getItem('sid.set')) ?true :false,
    signupDetails: {
        email:'',
        fullname:'',
        password:'',
        phoneNumber:'',
        bank: {
            name:'',
            accountNumber:'',
            accountName:''
        }
    },
    bankVerification: {
        verified: false,
        bankCode: '',
        bankName: '',
        accountNumber:'',
        accountName:''
    },
    status: 'IDLE',
    error: false,
    message:''
}
=======
export const authInitState: authStateType = {
	isSignedIn: localStorage.getItem("sid.set") ? true : false,
	signupDetails: {
		email: "",
		fullname: "",
		password: "",
		phoneNumber: "",
		bank: {
			name: "",
			accountNumber: "",
			accountName: "",
		},
	},
	bankVerification: {
		verified: false,
		bankCode: "",
		bankName: "",
		accountNumber: "",
		accountName: "",
	},
	status: "IDLE",
	error: false,
	message: "",
};
>>>>>>> 5e674091b630b2742e58669299313062f3c2b15e

const AuthAtom = atom({
    key: 'authState',
    default: authInitState
})

export const useAuthState = ()=> useRecoilState(AuthAtom);
export const useAuthStateValue = ()=> useRecoilValue(AuthAtom);
export const useSetAuthState = ()=> useSetRecoilState(AuthAtom);
