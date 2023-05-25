import { useIndividualValue } from "src/features/Individual/state";
import styles from "./individualhealthinformation.module.css"

export default function IndividualHealthInformationForm() {
    
    const IndividualState = useIndividualValue();

    return (
        <div className={styles.individual_health_information}>
            <div className={styles.heading}>Health Information</div>

            <div className={styles.info_section}>
                <div className={styles.section}>
                    <div className={styles.sub_heading}>Diet</div>
                    <div className={styles.list}>
                        {
                            IndividualState.profile.healthInformation.diet.map(dietItem => (
                                <div className={styles.diet_item}>{ dietItem  }</div>
                            ))
                        }
                    </div>
                </div>

                <div className={styles.section}>
                    <div className={styles.sub_heading}>Allergies</div>
                    <div className={styles.list_group}>
                        <div className={styles.list}>
                            <div className={styles.allergy_type}>Food</div>
                            <div>
                                {
                                    IndividualState.profile.healthInformation.allergies.food.map(dietItem => (
                                        <div className={styles.diet_item}>{ dietItem  }</div>
                                    ))
                                }
                            </div>
                        </div>

                        <div className={styles.list}>
                            <div className={styles.allergy_type}>Meds</div>
                            <div>
                                {
                                    IndividualState.profile.healthInformation.allergies.meds.map(dietItem => (
                                        <div className={styles.diet_item}>{ dietItem  }</div>
                                    ))
                                }
                            </div>
                        </div>

                        <div className={styles.list}>
                            <div className={styles.allergy_type}>Others</div>
                            <div>
                                {
                                    IndividualState.profile.healthInformation.allergies.others.map(dietItem => (
                                        <div className={styles.diet_item}>{ dietItem  }</div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}