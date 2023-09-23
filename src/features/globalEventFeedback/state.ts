import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { IGlobalEventFeedbackState, ISetGlobalEventFeedbackState } from "./types";

export const GlobalEventFeedbackInitState:IGlobalEventFeedbackState[] = [];

const GlobalEventFeedbackAtom = atom({
	key: "globalEventFeedbackInitState",
	default: GlobalEventFeedbackInitState
});

export const useGlobalEventFeedbackState = ()=> useRecoilState(GlobalEventFeedbackAtom);
export const useGlobalEventFeedbackStateValue = ()=> useRecoilValue(GlobalEventFeedbackAtom);
export const useSetGlobalEventFeedbackState = ()=> useSetRecoilState(GlobalEventFeedbackAtom);

export function removeEventFeedbackItem (itemIndex:number, items:IGlobalEventFeedbackState[], setItems:ISetGlobalEventFeedbackState) {
	setItems(items.filter((_, index)=> index !== itemIndex));                                                                                                                                                
}

export function addEventFeedbackItem(newItem:IGlobalEventFeedbackState, items:IGlobalEventFeedbackState[], setItems:ISetGlobalEventFeedbackState) {
	items.unshift(newItem);
	setItems([...items]);
}
