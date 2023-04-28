import { Outlet } from "react-router-dom";
import styles from "./staffs.module.css";

export default function Staffs() {
    return (
        <div className={styles.staffs}>
            <Outlet />
        </div>
    )
}