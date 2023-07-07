import ImageComponent from "src/components/ImageComponent";
import styles from "./userprofilecard.module.css";
import profilePicture from "src/assets/images/user-dp.png"
import { ReactComponent as IconAngleDown } from "src/assets/icons/icon-angle-down.svg"
import capitalize from "src/utils/capitalize";
import { useUserStateValue } from "src/features/user/state";

export default function UserProfileCard({extraStyles}:{extraStyles:string}) {

    const userState = useUserStateValue()

    return (
        <div className={`${styles.user_profile_card} ${extraStyles}`}>
            <ImageComponent 
                src={userState.details.personal.profileImage ?? profilePicture}
                extraStyles={styles.profile_picture}
            />

            <div className={styles.info}>
                <div className={styles.name}>{capitalize(userState.details.personal.firstname)}, {capitalize(userState.details.personal.lastname)}</div>
                <div className={styles.role}>{ capitalize(userState.details.role.title) }</div>
            </div>

            <IconAngleDown className={styles.arrow} />
        </div>
    )
}