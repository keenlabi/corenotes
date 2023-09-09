import { useState } from "react";
import IndividualProfileHeader from "../IndividualProfileHeader";
import IndividualHealthInformation from "./IndividualHealthInformation";
import IndividualPersonalInformation from "./IndividualPersonalInformation";
import styles from "./individualprofileinformation.module.css";
import SizedBox from "src/components/SizedBox";
import EditIndividualProfileModal from "./EditIndividualProfile/EditIndividualProfileModal";

export default function InformationProfileInformation() {
	const [showEditProfileModal, setShowEditProfileModal] = useState(false);
	return (
		<div className={styles.staff_profile_information}>
			<IndividualProfileHeader
				actionType="edit-profile"
				editProfileAction={() => setShowEditProfileModal(true)}
			/>

			<IndividualPersonalInformation />

			<SizedBox height={"30px"} />

			<IndividualHealthInformation />

			{showEditProfileModal ? (
				<EditIndividualProfileModal
					closeModal={() => setShowEditProfileModal(false)}
					// staffState={staffState}
					// onSetStaff={function (): void {
					// 	throw new Error("Function not implemented.");
					// }}
				/>
			) : null}
		</div>
	);
}
