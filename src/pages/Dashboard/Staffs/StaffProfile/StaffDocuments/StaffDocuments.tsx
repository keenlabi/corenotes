import { useEffect, useState } from "react";
import StaffProfileHeader from "../StaffProfileHeader";
import styles from "./staffdocuments.module.css";
import UploadDocModal from "./UploadDocModal";
import StaffDocumentsTable from "./StaffDocumentsTable";
import { useFetchStaffDocumentsSelector } from "src/features/staff/selector";
import { useParams } from "react-router-dom";
import { useStaffState } from "src/features/staff/state";
import { staffsDocumentsListType } from "src/features/staff/utils/formatStaffDocuments";

export default function StaffDocuments() {

    const { id } = useParams();

    const [staffState, setStaffState] = useStaffState();
    const staffDocumentsRespose:{
        documents: staffsDocumentsListType[],
        currentPage: number,
        totalPages: number,
        code: number,
        message: string,
        error: boolean
        
    } = useFetchStaffDocumentsSelector(id!, staffState.currentDocumentsPage)

    useEffect(()=> {
        if(!staffDocumentsRespose.error) {
            setStaffState(state => {
                return {
                    ...state,
                    details: {
                        ...state.details,
                        documents:  staffDocumentsRespose.documents.map(document => document)
                    },
                    status: 'SUCCESS',
                    error: false,
                    message: staffDocumentsRespose.message,
                    currentDocumentsPage: staffDocumentsRespose.currentPage,
                    totalDocumentsPage: staffDocumentsRespose.totalPages,
                }
            })

        } else {
            setStaffState(state => {
                return {
                    ...state,
                    status: 'FAILED',
                    error: true,
                    message: staffDocumentsRespose.message,
                    details: {
                        ...state.details,
                        documents:  {...staffDocumentsRespose.documents}
                    }
                }
            })
        }
    }, [staffState.details, staffDocumentsRespose, setStaffState, staffState.currentDocumentsPage])

    const [isUploadDocModalVisible, setIsUploadDocModalVisible] = useState(false)

    return (
        <div className={styles.staff_documents}>
            <StaffProfileHeader 
                actionType='upload-doc'
                clickAction={()=> setIsUploadDocModalVisible(true)}
            />

            <StaffDocumentsTable
                documents={staffState.details.documents?.length ?staffState.details.documents :staffDocumentsRespose.documents }
                currentPage={staffState.currentDocumentsPage}
                totalPages={staffState.totalDocumentsPage}
                errorMessage={staffState.message} 
                goToPage={(pageNumber:number)=> console.log(pageNumber)}
            />

            {
                isUploadDocModalVisible
                ?   <UploadDocModal 
                        closeModal={()=> setIsUploadDocModalVisible(false)} 
                    />
                :   null
            }
        </div>
    );
}