import IndividualProfileHeader from "../IndividualProfileHeader";
import IndividualHealthInformation from "./IndividualHealthInformation";
import IndividualPersonalInformation from "./IndividualPersonalInformation";
import styles from "./individualprofileinformation.module.css";
import SizedBox from "src/components/SizedBox";

export default function InformationProfileInformation() {
    return (
        <div className={styles.staff_profile_information}>
            
            <IndividualProfileHeader actionType='edit-profile' />

            <IndividualPersonalInformation />

            <SizedBox height={"30px"} />

            <IndividualHealthInformation />

        </div>
    )
}