import { useStaffValue } from "src/features/staff/state";
import styles from "./staffprofileheader.module.css";
import UserImage from "src/components/ImageComponent/UserImage";
import IconButton from "src/components/Buttons/IconButton";
import {ReactComponent as IconEditProfile} from "src/assets/icons/icon-edit-profile.svg"
import {ReactComponent as IconUploadDoc} from "src/assets/icons/icon-folder-plus.svg"

export default function StaffProfileHeader({
    actionType, 
    editProfileAction,
    clickAction
}:{ 
    actionType?:'edit-profile'|'upload-doc';
    editProfileAction?: ()=> void;
    clickAction?: ()=> void;
}) {

    const staffState = useStaffValue();
    
    return (
        <div className={styles.section_identity}>
            <div className={styles.user_info}>
                { UserImage(staffState.details.personal.profileImage, staffState.details.personal.firstname, "100px") }
                <div className={styles.info}>
                    <div className={styles.fullname}>{ staffState.details.personal.firstname }, {staffState.details.personal.lastname}</div>
                    <div className={styles.last_update}>Updated: 04/04/2023 01:00pm</div>
                </div>
            </div>

            {
                actionType === 'edit-profile'
                ?   <IconButton
                        extraStyle={styles.edit_profile_button}
                        label="Edit info"
                        suffixIcon={<IconEditProfile />}
                        onClick={()=> editProfileAction?.()}
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