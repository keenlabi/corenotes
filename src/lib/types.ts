export interface successResponseType {
    code:number,
    statusCode?:number,
    status:"SUCCESS"|"ERROR",
    message:string,
    data:{
        [key: string]: any
    }
}