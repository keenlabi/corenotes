export interface RadioButtonFormFieldType {
    label: string,
    options: {
        label:string,
        value:string
    }[],
    value:string,
    selected:boolean,
    selectedIndex:number,
    error: string
}