import { useStaffState } from "src/features/staff/state"
import styles from "./staffroleslist.module.css"
import GridList from "src/components/GridList/GridList";
import StaffRoleCard from "./StaffRoleCard";
import { useEffect } from "react";
import { useFetchStaffRoleSelector } from "src/features/staff/selector";

export default function StaffRolesList() {

    const [staffState, setStaffState] = useStaffState();

    const staffStateResponse = useFetchStaffRoleSelector(staffState.roles.currentPage)

    useEffect(()=> {
        setStaffState(state => ({
            ...state,
            error: staffStateResponse.error,
            message: staffStateResponse.message,
            roles: {
                list: staffStateResponse.data.staffRoles,
                currentPage: staffStateResponse.data.currentPage,
                totalPages: staffStateResponse.data.totalPages,
            }
        }))

    }, [setStaffState, staffStateResponse])

    return (
        <div className={styles.requested_services_list}>
            <GridList columnCount={3}>
                {
                    staffState.roles.list?.map((role)=> {
                        return  <StaffRoleCard
                                    key={role.id}
                                    id={role.id} 
                                    title={role.title}
                                />
                    })
                }
            </GridList>
        </div>
    )
}