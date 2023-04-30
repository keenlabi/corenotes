import IconButton from "src/components/Buttons/IconButton";
import styles from "./staffprofileinformation.module.css";
import {ReactComponent as IconEditProfile} from "src/assets/icons/icon-edit-profile.svg"
import StaffPersonalInformation from "./StaffPersonalInformation";
import StaffWorkInformation from "./StaffWorkInformation";
import SizedBox from "src/components/SizedBox";
import { useFetchStaffSelector } from "src/features/staff/selector";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useStaffState } from "src/features/staff/state";
import { staffDetailsType } from "src/features/staff/utils/formatStaff";
import UserImage from "src/components/ImageComponent/UserImage";

export default function StaffProfileInformation() {

    const { id } = useParams();

    const [staffState, setStaffState] = useStaffState();

    const staffDetailsResponse:{
        code:number,
        message:string,
        error: boolean,
        staff:staffDetailsType

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = useFetchStaffSelector(id!)

    useEffect(()=> {
        if(!staffDetailsResponse.error) {
            setStaffState((state)=> {
                return {
                    ...state,
                    status: 'SUCCESS',
                    details: staffDetailsResponse.staff
                }
            })
        } else {
            setStaffState((state)=> {
                return {
                    ...state,
                    status: 'FAILED',
                    details: staffDetailsResponse.staff
                }
            })
        }
    }, [setStaffState, staffDetailsResponse, staffState.details])

    function editProfile () {
        console.log("EDIT")
    }

    return (
        <div className={styles.staff_profile_information}>
            <div className={styles.section_identity}>
                <div className={styles.user_info}>
                    { UserImage(staffState.details.profileImage, staffState.details.firstname, "100px") }
                    <div className={styles.info}>
                        <div className={styles.fullname}>{ staffState.details.firstname }, {staffState.details.lastname}</div>
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