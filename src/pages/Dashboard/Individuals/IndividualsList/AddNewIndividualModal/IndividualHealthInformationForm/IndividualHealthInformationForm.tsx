import { Suspense } from "react";
import styles from "./individualhealthinformation.module.css"
import IndividualAllergiesInformationForm from "./IndividualAllergiesInformation/IndividualAllergiesInformation";
import IndividualDietInformationForm from "./IndividualDietInformationForm/IndividualDietInformation";
import IndividualRequestedServicesForm from "./IndividualRequestedServicesForm/IndividualRequestedServicesform";
import IndividualCompartmentForm from "./IndividualCompartmentForm";
import ComponentLoader from "src/components/Loaders/ComponentLoader";

export default function IndividualHealthInformationForm() {
	return (
		<div className={styles.health_information}>
			<IndividualCompartmentForm removeLabel={false} />
			<Suspense fallback={<ComponentLoader />}>
				<IndividualRequestedServicesForm />
			</Suspense>
			<IndividualDietInformationForm />
			<IndividualAllergiesInformationForm />
		</div>
	);
}