import styles from "./medicationcodescannermodal.module.css";
import { useEffect, useRef, useState } from "react";
import { ReactComponent as IconCancelCircle } from "src/assets/icons/icon-cancel-circle.svg"
import RoundedIconButton from "src/components/Buttons/RoundedIconButton";
import { FaAngleRight } from "react-icons/fa";
import { findMedicationTaskWithCodeAction } from "src/features/task/action";
import { useNavigate } from "react-router-dom";
import FormStateModal from "src/components/FormComponents/FormStateModal/FormStateModal";
import { resetTaskState, useTaskState } from "src/features/task/state";
import QRCodeScanner from "../BarcodeScanner/QRCodeScanner";

export default function MedicationCodeScannerModal({ close, action }:{ close:()=> void, action:(code:any)=> void}) {

    const navigate = useNavigate();

    const [taskState, setTaskState] = useTaskState();

    const cameraSpaceRef = useRef<HTMLDivElement>(null);

    const [screenHeight, setScreenHeight] = useState(window.screen.height);
    
    const [screenWidth, setScreenWidth] = useState(window.screen.width);

    const [extractedCode, setExtractedCode] = useState('');

    useEffect(()=> {
        const cameraSectionDiv = document.getElementById('camera-section')
        setScreenHeight(cameraSectionDiv!.offsetHeight)
        setScreenWidth(cameraSectionDiv!.offsetWidth)
    }, [])

    function extractCode (code:string) {
        setExtractedCode(code)
    }

    function findCode() {
        if(extractedCode) {
            findMedicationTaskWithCodeAction(extractedCode)
            .then((response)=> {
                navigate({ pathname: response.data.task.taskId.toString() })
            })
            .catch((error)=> {
                console.log(error)
                setTaskState(state => ({
                    ...state,
                    status: 'FAILED',
                    error: true,
                    message: error.message,
                }))
            })
        }
    }

    return (
        <div className={styles.modal_container}>
            
            <div className={styles.overlay} onClick={()=> close()}></div>

            <div id="camera-section" className={styles.modal_container_body}>
                <FormStateModal 
                    status={taskState.status} 
                    error={taskState.error} 
                    message={taskState.message}
                    reset={()=> resetTaskState(setTaskState)}
                />

                <div className={styles.camera_space} ref={cameraSpaceRef}>
                    <IconCancelCircle className={styles.close_icon} onClick={()=> close()} />
                    <QRCodeScanner
                        onScanSuccess={(code:string)=> extractCode(code)}
                    />
                    <div className={styles.scan_result}>
                        <div className={styles.text}>{ extractedCode }</div>
                        <RoundedIconButton
                            backgroundColor="var(--blue-accent-100)"
                            color="white"
                            icon={<FaAngleRight />}
                            action={()=> findCode()}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}