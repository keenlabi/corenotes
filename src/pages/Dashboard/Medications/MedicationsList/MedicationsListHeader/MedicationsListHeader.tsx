import AddNewNoBackgroundIconButton from "src/components/Buttons/AddNewNoBackgroundIconButton"
import styles from "./medicationslistheader.module.css"
import { useMedicationStateValue } from "src/features/medication/state"

export default function MedicationListHeader({
    addMedication
}:{ addMedication:()=> void }) {

    const medicationStateValue = useMedicationStateValue();

    return (
        <div className={styles.medications_list_header}>
            <div className={styles.heading}>
                <div className={styles.number_of_medications}>{ medicationStateValue.medications.list?.length }</div>
                <div className={styles.title}>medications</div>
            </div>

            <div className={styles.actions}>
                <AddNewNoBackgroundIconButton 
                    label={"Add Medication"}
                    action={() => addMedication()}
                />
            </div>
        </div>
    )
}