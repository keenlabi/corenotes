import { Outlet } from "react-router-dom";
import styles from "./individuals.module.css"

export default function Individuals() {
    return (
        <div className={styles.body}>
            <Outlet />
        </div>
    )
}