import { Outlet } from "react-router-dom";
import styles from "./compartments.module.css"

export default function Compartments() {
    return (
        <div className={styles.body}>
            <Outlet />
        </div>
    )
}