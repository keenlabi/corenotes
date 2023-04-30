import IconButton from "src/components/Buttons/IconButton";
import styles from "./staffprofileinformation.module.css";
import {ReactComponent as IconEditProfile} from "src/assets/icons/icon-edit-profile.svg"
import StaffPersonalInformation from "./StaffPersonalInformation";
import StaffWorkInformation from "./StaffWorkInformation";
import SizedBox from "src/components/SizedBox";

export default function StaffProfileInformation() {

    function editProfile () {
        console.log("EDIT")
    }

    return (
        <div className={styles.staff_profile_information}>
            <div className={styles.section_identity}>
                <div className={styles.user_info}>
                    <div className={styles.user_image}></div>
                    <div className={styles.info}>
                        <div className={styles.fullname}>Williams, Augusta</div>
                        <div className={styles.last_update}>Updated: 04/04/2023 01:00pm</div>
                    </div>
                </div>

                <IconButton
                    extraStyle={styles.edit_profile_button}
                    label="Edit info"
                    suffixIcon={<IconEditProfile />}
                    onClick={()=> editProfile()}
                />
            </div>

            <StaffPersonalInformation />

            <SizedBox height={"100px"} />

            <StaffWorkInformation />
        </div>
    )
}