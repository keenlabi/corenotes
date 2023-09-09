import styles from "./setnewpasswordsuccess.module.css";
import { useNavigate } from "react-router-dom";
import PrimaryTextButton from "../../../../../components/Buttons/PrimaryTextButton";

export default function SetNewPassword() {

    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            
            <div className={styles.title}>Password reset success</div>
            <div className={styles.sub_title}>Your password has been reset successfully.</div>

            <PrimaryTextButton 
                label="Login"
                disabled={false}
                isLoading={false}
                action={()=> navigate({ pathname: "/login" })}
            />
        </div>
    );
}