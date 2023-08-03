import SizedBox from "src/components/SizedBox";
import IndividualProfileHeader from "../IndividualProfileHeader";
import styles from "./individualmedications.module.css";
import IndividualMedicationsList from "./IndividualMedicationsList";
import AddNewNoBackgroundIconButton from "src/components/Buttons/AddNewNoBackgroundIconButton";
import { Suspense, useState } from "react";
import SelectMedicationModal from "./SelectMedicationModal";

export default function IndividualMedications() {

    const [showSelectMedicationModal, setShowSelectMedicationModal] = useState(false);

    return (
        <div className={styles.individual_medications}>
            <IndividualProfileHeader />
            
            <SizedBox height={"25px"} />

            <div className={styles.button}>
                <AddNewNoBackgroundIconButton 
                    label={"Select new medication"}
                    action={()=> setShowSelectMedicationModal(true)}
                />
            </div>

            <SizedBox height={"25px"} />

            <IndividualMedicationsList />

            {
                showSelectMedicationModal
                ?   <Suspense>
                        <SelectMedicationModal 
                            medType={""}
                            closeModal={()=> setShowSelectMedicationModal(false)} 
                        />
                    </Suspense>
                :   null
            }

        </div>
    )
}