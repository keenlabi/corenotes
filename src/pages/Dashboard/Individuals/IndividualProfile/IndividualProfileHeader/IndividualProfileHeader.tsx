import styles from "./individualprofileheader.module.css";
import UserImage from "src/components/ImageComponent/UserImage";
import IconButton from "src/components/Buttons/IconButton";
import {ReactComponent as IconEditProfile} from "src/assets/icons/icon-edit-profile.svg"
import {ReactComponent as IconUploadDoc} from "src/assets/icons/icon-folder-plus.svg"
import { useIndividualValue } from "src/features/Individual/state";

export default function IndividualProfileHeader({
    actionType, 
    clickAction
}:{ actionType?:'edit-profile'|'upload-doc', clickAction?: ()=> void }) {

    const individualState = useIndividualValue();
    
    return (
        <div className={styles.section_identity}>
            <div className={styles.user_info}>
                { UserImage(individualState.profile.personalInformation.profileImage, individualState.profile.personalInformation.profileImage, "100px") }
                <div className={styles.info}>
                    <div className={styles.fullname}>{ individualState.profile.personalInformation.firstName }, {individualState.profile.personalInformation.lastName}</div>
                    <div className={styles.last_update}>Updated: 04/04/2023 01:00pm</div>
                </div>
            </div>

            {
                actionType === 'edit-profile'
                ?   <IconButton
                        extraStyle={styles.edit_profile_button}
                        label="Edit info"
                        suffixIcon={<IconEditProfile />}
                        onClick={()=> clickAction?.()}
                    />
                :   actionType === 'upload-doc'
                    ?   <IconButton
                            extraStyle={styles.upload_document_button}
                            label="Upload new document"
                            prefixIcon={<IconUploadDoc />}
                            onClick={()=> clickAction?.()}
                        />
                    :   null
            }
        </div>
    )
}