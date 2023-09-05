export interface initStateType {
	status: "IDLE" | "LOADING" | "SUCCESS" | "FAILED";
	signupDetails: object;
	bankVerification: object;
	error: boolean;
	message: string;
}