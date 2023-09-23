export interface IGlobalEventFeedbackState {
	status:string; // "SUCCESS"|"ERROR";
	message: string;
}

export interface ISetGlobalEventFeedbackState extends React.Dispatch<React.SetStateAction<IGlobalEventFeedbackState[]>> {

}