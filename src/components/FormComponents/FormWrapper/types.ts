export interface formFieldType {
    type:"text" | "number" | "password",
    label?: string,
    placeholder?: string,
    error: string,
    prefixIcon: JSX.Element,
    suffixIcon: JSX.Element,
    suffixIconAlt: JSX.Element
}