import { Outlet } from "react-router-dom";
import styles from "./services.module.css";

export default function Services() {
    return (
        <div className={styles.body}>
            <Outlet />
        </div>
    )
}