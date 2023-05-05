export interface DropDownProps {
    label:string,
    options: DropDownOption[],
    value?:{
        id:string,
        label:string,
        value?:string
    },
    error:string
    selected:boolean,
    selectedOptionIndex:number,
    onSelect?:(selectedOptionIndex:number)=> void,
    action?:(inputValue:string)=>  void,
    relative?: boolean,
    extraStyle?: string
}

export interface DropDownOption {
    id:string, 
    label:string, 
    name?:string, 
    value?:string,
    type?:'action-option'|'option',
    actionIcon?:JSX.Element
}

export interface DropDownFormData extends DropDownProps {
    name:string
}

export interface setDropDownFormData extends React.Dispatch<React.SetStateAction<DropDownFormData>> {

}