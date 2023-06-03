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

export interface SetRadioButtonFormFieldType extends React.Dispatch<React.SetStateAction<RadioButtonFormFieldType>> {

}