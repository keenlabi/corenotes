import styles from "./individualmedicationbarcode.module.css";
import { useReactToPrint } from "react-to-print";
import DataLoadingError from "src/components/DataLoadingError";
import { useRef } from "react";
import QRCode from "react-qr-code";
import SizedBox from "src/components/SizedBox";
import PrintTextButton from "src/components/Buttons/PrintTextButton";

export default function IndividualMedicationBarcode({barcode}:{barcode:string}) {

    const printRef = useRef(null);

    const handlePrint = useReactToPrint({
        content: () => printRef.current,
    });

    return (
        <div className={styles.medication_barcode}>
            {
                barcode
                ?   <div className={styles.barcode_section}>
                    
                        <PrintTextButton action={handlePrint} />
                        
                        <SizedBox height="10px" />

                        <div className={styles.barcode_container} ref={printRef}>
                            <QRCode
                                value={barcode?.toString()}
                                size={150}
                            />
                            {/* <Barcode 
                                value={barcode?.toString()} 
                                width={1} 
                            /> */}
                        </div>
                    </div>
                :   <DataLoadingError message={"Error loading barcode"} />
            }
        </div>
    )
}