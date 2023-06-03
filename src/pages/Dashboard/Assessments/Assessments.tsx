import { Outlet } from "react-router-dom"
import styles from "./assessments.module.css"

export default function Assessments() {
    return (
        <div className={styles.assessments}>
            <Outlet />
        </div>
    )
}