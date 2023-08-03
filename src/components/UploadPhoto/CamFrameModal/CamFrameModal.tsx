import { useRef } from "react";
import styles from "./camframemodal.module.css"
import Webcam from "react-webcam";
import { ReactComponent as IconCancelCircle } from "src/assets/icons/icon-cancel-circle.svg"

export default function CamFrameModal({ savePhoto, closeModal }:{ savePhoto:(imageSrc:string)=> void, closeModal:()=> void }) {

    const webcamRef:any = useRef(null);

    function takePhoto() {
        const imageSrc = webcamRef.current!.getScreenshot();
        savePhoto(imageSrc)
    }

    function closeCam() {
        closeModal();
    }

    return (
        <div className={styles.modal_container}>
            <div className={styles.overlay} onClick={()=> closeCam()}></div>
                <div className={styles.camera_space}>
                    <IconCancelCircle className={styles.close_icon} onClick={()=> closeCam()} />
                    <Webcam 
                        videoConstraints={{
                            facingMode: "FACING_MODE_ENVIRONMENT"
                        }}
                        className={styles.camera}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        screenshotQuality={1}
                    />
                    <div className={styles.capture_button} onClick={()=> takePhoto()}></div>
                </div>
        </div>
    )
}