import { Outlet } from "react-router-dom"
import styles from "./assessmentsoutlet.module.css"

export default function AssessmentsOutlet() {
    return (
        <div className={styles.assessments}>
            <Outlet />
        </div>
    )
}