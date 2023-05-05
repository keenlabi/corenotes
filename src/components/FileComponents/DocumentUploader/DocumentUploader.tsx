import { FaTimes } from "react-icons/fa";
import styles from "./documentuploader.module.css";
import { useState } from "react";
import validateImageFile from "src/utils/validateImageFile";
import IllPDF from "src/assets/icons/icon-pdf.png";
import IllDOCX from "src/assets/icons/icon-docx-file.png";
import ImageComponent from "src/components/ImageComponent";

export default function DocumentUploader({
    id, 
    fileType,
    saveDoc
}:{
    id:string, 
    fileType?: string,
    saveDoc:({uploadedFile, fileName}:{uploadedFile:File, fileName:string})=> void
}) {

    const [selectedDoc, setSelectedDoc] = useState<File>();
    const [docName, setDocName] = useState('')

    const saveAndPreviewFile = (event:any)=> {
        const uploadedFile = event.target.files[0];

        // Check file size
        validateImageFile(uploadedFile)
        
        if(uploadedFile) {
            setSelectedDoc(uploadedFile);
            const filePublicId = uploadedFile.name.substring(0, uploadedFile.name.lastIndexOf('.')).replaceAll(' ', '_') + 
                                uploadedFile.name.substring(uploadedFile.name.lastIndexOf('.'), uploadedFile.name.length)

            setDocName(filePublicId)
            saveDoc({
                uploadedFile,
                fileName: filePublicId
            })
        }
    }

    return (
        <div className={styles.document_uploader}>
            {
                selectedDoc
                ?   <div className={styles.file_preview}>
                        <ImageComponent 
                            src={selectedDoc.type.split('/')[1] === 'pdf' ?IllPDF :IllDOCX}
                            extraStyles={styles.ill_pdf}
                        />
                        <div className={styles.file_details}>
                            <div className={styles.name}>{ docName || selectedDoc.name }</div>
                            <div className={styles.size}>{ parseFloat((selectedDoc.size * 0.000001).toString()).toFixed(2) }mb</div>
                        </div>
                        <FaTimes className={styles.cancel} onClick={()=> setSelectedDoc(undefined)} />
                    </div>
                :   <label htmlFor={`file_uploader_${id}`}>
                        <div className={styles.doc_upload_frame}>
                            <div className={styles.text_placeholder}>Click to browse files</div>
                        </div>
                    </label>
            }

            <input 
                type="file"
                id={`file_uploader_${id}`}
                accept={fileType}
                onChange={(e)=> saveAndPreviewFile(e)}
                hidden
            />
        </div>
    )
}

