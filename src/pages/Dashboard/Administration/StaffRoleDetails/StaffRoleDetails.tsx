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
            <FaAngleLeft 
                className={styles.back_btn} 
                onClick={()=> navigate({ pathname: '/dashboard/administration' }) }
            />

            <div className={styles.title}>{staffState.roleDetails?.title}</div>

            <div className={styles.priviledges}>
                <div>Privileges</div>

                <div className="group">
                    <div className={styles.heading}>Staff management</div>
                    {
                        staffState.roleDetails.privileges.staff_profile_view
                        ?   <div className={styles.label}>Staff Profile: View</div>
                        :   null
                    }
                    {
                        staffState.roleDetails.privileges.staff_registration
                        ?   <div className={styles.label}>Staff Registration</div>
                        :   null
                    }
                    {
                        staffState.roleDetails.privileges.staff_document_upload
                        ?   <div className={styles.label}>Staff Document: Upload</div>
                        :   null
                    }
                </div>
               
            </div>
        </div>
    )
}