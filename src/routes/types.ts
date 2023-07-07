export interface routerType {
    title?:string,
    path:string,
    element: JSX.Element,
    children?: routerType[],
    protected?: boolean,
    allowedRoles?:Array<string>
}