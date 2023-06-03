import IndividualAllergiesInformationForm from "./IndividualAllergiesInformation/IndividualAllergiesInformation";
import IndividualDietInformationForm from "./IndividualDietInformationForm/IndividualDietInformation";
import IndividualRequestedServicesForm from "./IndividualRequestedServicesForm/IndividualRequestedServicesform";

export default function IndividualHealthInformationForm() {

    return (
        <div>
            <IndividualRequestedServicesForm />
            <IndividualDietInformationForm />
            <IndividualAllergiesInformationForm />
        </div>
    )
}