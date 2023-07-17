import styles from "./taskslistheader.module.css"
import { useTaskStateValue } from "src/features/task/state";

export default function TasksListHeader() {

    const taskStateValue = useTaskStateValue();

    return (
        <div className={styles.tasks_list_header}>
            <div className={styles.heading}>
                <div className={styles.number_of_tasks}>{ taskStateValue.tasks.list?.length }</div>
                <div className={styles.title}>tasks</div>
            </div>
        </div> 
    )
}