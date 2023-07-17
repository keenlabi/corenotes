import { Outlet } from "react-router-dom";
import styles from "./tasksoutlet.module.css"

export default function TasksOutlet() {
    return  <div className={styles.tasks_outlet}>
                <Outlet />
            </div>
}