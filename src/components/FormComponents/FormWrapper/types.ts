export interface formFieldType {
    type:"text" | "number" | "password" | "date",
    label?: string,
    placeholder?: string,
    value?: string,
    error: string,
    validated: boolean,
    prefixIcon?: JSX.Element,
    suffixIcon?: JSX.Element,
    suffixIconAlt?: JSX.Element
}

export interface setFormFieldType extends React.Dispatch<React.SetStateAction<formFieldType>> {}

export interface formStateType {
    error: string,
    validated: boolean
}

export interface setFormStateType extends React.Dispatch<React.SetStateAction<formStateType>> {}

