import styles from "./staffprofileinformation.module.css";
import StaffWorkInformation from "./StaffWorkInformation";
import SizedBox from "src/components/SizedBox";
import StaffProfileHeader from "../StaffProfileHeader";
import StaffPersonalInformation from "./StaffPersonalInformation";

export default function StaffProfileInformation() {
    return (
        <div className={styles.staff_profile_information}>
            
            <StaffProfileHeader actionType='edit-profile' />

            <StaffPersonalInformation />

            <SizedBox height={"100px"} />

            <StaffWorkInformation />
        </div>
    )
}