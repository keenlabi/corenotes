import ImageComponent from "src/components/ImageComponent";
import styles from "./userprofilecard.module.css";
import profilePicture from "src/assets/images/user-dp.png"
import { ReactComponent as IconAngleDown } from "src/assets/icons/icon-angle-down.svg"

export default function UserProfileCard({extraStyles}:{extraStyles:string}) {
    return (
        <div className={`${styles.user_profile_card} ${extraStyles}`}>
            <ImageComponent 
                src={profilePicture}
                extraStyles={styles.profile_picture}
            />

            <div className={styles.info}>
                <div className={styles.name}>Williams, Augusta</div>
                <div className={styles.role}>Super Admin</div>
            </div>

            <IconAngleDown className={styles.arrow} />
        </div>
    )
}