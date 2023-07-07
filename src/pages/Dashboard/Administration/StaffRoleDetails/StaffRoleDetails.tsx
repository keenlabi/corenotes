import { FaAngleLeft } from "react-icons/fa"
import styles from "./staffroledetails.module.css"
import { useNavigate, useParams } from "react-router-dom"
import { staffInitState, useStaffState } from "src/features/staff/state";
import { useEffect } from "react";
import { fetchStaffRoleDetailsAction } from "src/features/staff/actions";

export default function StaffRoleDetails() {

    const params = useParams();

    const navigate = useNavigate();

    const [staffState, setStaffState] = useStaffState();
    
    useEffect(()=> {
        fetchStaffRoleDetailsAction(params.roleId!)
        .then((response)=> {
            setStaffState(state => ({
                ...state,
                roleDetails: response.data.staffRoleDetails,
            }))
        })
        .catch((error)=> {
            console.log(error)
            setStaffState(state => ({
                ...state,
                roleDetails: staffInitState.roleDetails
            }))
        })

    }, [params.roleId, setStaffState])

    return (
        <div className={styles.staff_role_details}>
            <div className={styles.header}>
                <FaAngleLeft
                    className={styles.back_btn} 
                    onClick={()=> navigate({ pathname: '/dashboard/administration' }) }
                />

                <div className={styles.heading}>{staffState.roleDetails?.title}</div>
            </div>

            <div className={styles.priviledges}>
                <div className={styles.section_title}>Privileges</div>

                <div className={styles.group}>
                    <div className={styles.group_title}>Staff management</div>
                    {
                        staffState.roleDetails.privileges.staff_profile_view
                        ?   <div className={styles.privilege}>Staff Profile: View</div>
                        :   null
                    }
                    {
                        staffState.roleDetails.privileges.staff_registration
                        ?   <div className={styles.privilege}>Staff Registration</div>
                        :   null
                    }
                    {
                        staffState.roleDetails.privileges.staff_document_upload
                        ?   <div className={styles.privilege}>Staff Document: Upload</div>
                        :   null
                    }
                </div>
               
            </div>
        </div>
    )
}