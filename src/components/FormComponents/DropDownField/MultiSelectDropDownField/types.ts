export interface MultiSelectDropDownProps {
    width?:string,
    height?:string,
    relative?:boolean,
    error:string,
    label:string,
    placeholder?:string,
    // options:MultiSelectDropDownOption[],
    options:Array<string>,
    onSelect: (selections:Array<string>)=> void
}

export interface MultiSelectDropDownOption {
    id:string,
    label:string,
    value:string,
    selected:boolean
}

export interface MultiSelectDropDownFormData {
    label?:string,
    placeholder?:string,
    relative?:boolean,
    error:string,
    // options:MultiSelectDropDownOption[],
    options:Array<string>
    value:Array<string>
}