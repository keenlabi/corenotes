import { useState } from "react";
import styles from "./uploadphoto.module.css";
import { ReactComponent as IconImageUpload } from "src/assets/icons/icon-image-upload.svg";
import CamFrameModal from "./CamFrameModal/CamFrameModal";
import ImageComponent from "../ImageComponent";

export default function UploadPhoto({ savePhoto }:{ savePhoto:(imageSrc:string)=> void}) {

    const [openCamera, setOpenCamera] = useState(false)

    const [photo, setPhoto] = useState<any>();

    function saveLocalPhoto(imageSrc:string){
        setPhoto(imageSrc);
        savePhoto(imageSrc);
    }

    return (
        <div>
            {
                photo
                ?   <div className={styles.captured_photo}>
                        <div className={styles.retake_button}>Retake</div>
                        <ImageComponent src={photo} />
                    </div>
                :   <div className={styles.upload_photo} onClick={()=> setOpenCamera(true)}>
                        <IconImageUpload className={styles.image_icon} />
                        <div className={styles.text}>Click to take image of medication application</div>
                    </div>
            }

            {
                openCamera
                ?   <CamFrameModal  
                        savePhoto={(imageSrc:string)=> saveLocalPhoto(imageSrc)}
                        closeModal={()=> setOpenCamera(false)} 
                    />
                :   null
            }
        </div>
    )
}
