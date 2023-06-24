import styles from "./individualhealthinformation.module.css"
import IndividualAllergiesInformationForm from "./IndividualAllergiesInformation/IndividualAllergiesInformation";
import IndividualDietInformationForm from "./IndividualDietInformationForm/IndividualDietInformation";
import IndividualRequestedServicesForm from "./IndividualRequestedServicesForm/IndividualRequestedServicesform";
import IndividualCompartmentForm from "./IndividualCompartmentForm";

export default function IndividualHealthInformationForm() {

    return (
        <div className={styles.health_information}>
            <IndividualCompartmentForm />
            <IndividualRequestedServicesForm />
            <IndividualDietInformationForm />
            <IndividualAllergiesInformationForm />
        </div>
    )
}