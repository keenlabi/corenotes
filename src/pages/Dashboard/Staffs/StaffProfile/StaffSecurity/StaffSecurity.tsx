import StaffProfileHeader from "../StaffProfileHeader";
import AccountReset from "./AccountReset/AccountReset";
import DeactivateStaff from "./DeactivateStaff/DeactivateStaff";
import styles from "./staffsecurity.module.css";

export default function StaffSecurity () {
    

    return (
        <div className={styles.staff_security}>
            <StaffProfileHeader />

            <AccountReset />

            <DeactivateStaff />
        </div>
    )
}