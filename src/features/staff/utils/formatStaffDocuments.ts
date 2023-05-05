import { IUser } from "../types"

export interface staffsDocumentsListType {
    id:string,
    docDate: string,
    docTitle: string,
    docType: string,
    docFileLink: string,
    docFileName: string,
    createdAt: string
}

export default function formatStaffDocumentsList(documents:IUser['documents']):staffsDocumentsListType[] {
    if(!documents.length) return []

    return documents.map(document => {
        return {
            id: document._id,
            docTitle: document.docTitle,
            docType: document.docType,
            docFileName: document.docFileName,
            docDate: document.docDate,
            docFileLink: document.docFileLink,
            createdAt: document.createdAt
        }
    })
}