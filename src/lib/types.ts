export interface successResponseType {
    code:number,
    status:"SUCCESS"|"ERROR",
    message:string,
    data:{
        [key: string]: [value:unknown]
    }
}