import { useState } from "react";
import checkFileSize from "src/utils/validateImageFile";
import {ReactComponent as Icontrash} from "src/assets/icons/icon-trash.svg"
import {ReactComponent as IconFileUploader} from "src/assets/icons/upload-files.svg"
import styles from "./imageuploader.module.css";

export interface ImageUploaderFormType {
    label:string,
    name:string,
    image?:Blob|MediaSource,
    images?:Array<Blob|MediaSource>,
    error:string, 
    validated:boolean
}

export interface setImageUploaderFormType extends React.Dispatch<React.SetStateAction<ImageUploaderFormType>> {}

export interface ImageUploaderProps {
    extraStyle:string,
    position:string,
    label: string,
    children?: JSX.Element, 
    defaultImageLink?: string,
    error:string,
    saveImage:(imageFile:File)=> void
    deleteImage:()=> void
}

export default function ImageUploader({
    extraStyle,
    position,
    label,
    children,
    defaultImageLink,
    error,
    saveImage,
    deleteImage
}:ImageUploaderProps) {

    const [selectedImages, setSelectedImages] = useState<Blob|MediaSource>();

    const saveAndPreviewFile = (event:any)=> {
        const uploadedFile = event.target.files[0];
        
        // Check file size
        checkFileSize(uploadedFile)
        
        if(uploadedFile) {
            setSelectedImages(()=> event.target.files[0]);
            saveImage(event.target.files[0])
        }
    }

    return (
        <div className={`${styles.container} ${extraStyle}`}>
            <div className={styles.label}>{ label }</div>
            {
                (selectedImages)
                ?   <Icontrash
                        className={styles.icon_trash} 
                        onClick={()=> {
                            deleteImage();
                            setSelectedImages(()=> undefined)
                        }} 
                    /> 
                :null
            }

            

            <div className={styles.child_wrapper}>
                <label htmlFor={`profile_picture${position}`}>
                    {
                        (selectedImages)
                        ?   <img
                                src={URL.createObjectURL(selectedImages!)} 
                                alt="" 
                                className={styles.image}
                            /> 
                        :   children
                            ?   children
                            :   defaultImageLink
                                ?   <img src={defaultImageLink} alt="" className={styles.default_image_link}/>
                                :   <div className={styles.placeholder_wrapper}>
                                        <IconFileUploader className={styles.upload_file_svg} />
                                        <div className={styles.prompt}>Click to upload image</div>
                                    </div> 
                    }
                </label>
            </div>
            <input 
                type="file"
                id={`profile_picture${position}`}
                accept="image/*"
                onChange={(e)=> saveAndPreviewFile(e)}
                hidden
            />

            <div className={styles.error}> { error } </div>
        </div>
    );
}