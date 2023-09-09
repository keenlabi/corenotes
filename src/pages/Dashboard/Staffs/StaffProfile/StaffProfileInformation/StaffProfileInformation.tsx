import styles from "./staffprofileinformation.module.css";
import StaffWorkInformation from "./StaffWorkInformation";
import SizedBox from "src/components/SizedBox";
import StaffProfileHeader from "../StaffProfileHeader";
import StaffPersonalInformation from "./StaffPersonalInformation";
import { useState } from "react";
import EditStaffProfileModal from "./EditStaffProfile";
import { useStaffValue } from "src/features/staff/state";

export default function StaffProfileInformation() {
	
	const [showEditProfileModal, setShowEditProfileModal] = useState(false);
	const staffState = useStaffValue();

	return (
		<div className={styles.staff_profile_information}>
			<StaffProfileHeader
				actionType="edit-profile"
				editProfileAction={() => setShowEditProfileModal(true)}
			/>

			<StaffPersonalInformation />

			<SizedBox height={"100px"} />

			<StaffWorkInformation />

			{showEditProfileModal ? (
				<EditStaffProfileModal
					closeModal={() => setShowEditProfileModal(false)}
					staffState={staffState}
				/>
			) : null}
		</div>
	);
}