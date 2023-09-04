export interface ITagsInputFormData {
    name:string;
    label?:string;
    placeholder?:string;
    value:Array<string>;
    error:string;
    validated:boolean;
}

export interface ISetTagsInputFormData extends React.Dispatch<React.SetStateAction<ITagsInputFormData>> {}

export function saveTagInput(value:string, model:ITagsInputFormData, setModel:ISetTagsInputFormData) {
    model.value.unshift(value);
    setModel(model);
}