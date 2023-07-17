import styles from "./taskdetails.module.css"
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import GoBackButton from "src/components/Buttons/GoBackButton";
import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton";
import SizedBox from "src/components/SizedBox";
import { useFetchTaskDetailsSelector } from "src/features/task/selector";
import { useTaskState } from "src/features/task/state";

export default function TaskDetails() {
    
    const params = useParams();

    const [taskState, setTaskState] = useTaskState();

    const taskDetailsResponse = useFetchTaskDetailsSelector(parseInt(params.taskId!))
    
    useEffect(()=> {
        setTaskState(state => ({
            ...state,
            error: taskDetailsResponse.error,
            message: taskDetailsResponse.error ?taskDetailsResponse.message :"",
            taskDetails: taskDetailsResponse.task
        }))

    }, [taskDetailsResponse, setTaskState])
    
    return (
        <div className={styles.task_details}>
            
            <SizedBox height="30px" />

            <GoBackButton path={"/dashboard/tasks"} />

            <SizedBox height="30px" />

            <div className={styles.title}>{ taskState.taskDetails?.service.title }</div>

            <div className={styles.meta}>
                <div className={styles.todo}>Todo</div>
            </div>

            <div className={styles.desc}>
                <div className={styles.medication}>{ taskState.taskDetails.medication?.name }</div>
                
                <div className={styles.info}>
                    <div className={styles.label}>Strength</div>
                    <div className={styles.digit}>{ taskState.taskDetails.medication?.strength }</div>
                </div>

                <div className={styles.info}>
                    <div className={styles.label}>Route</div>
                    <div className={styles.digit}>{ taskState.taskDetails.medication?.route }</div>
                </div>

                <div className={styles.info}>
                    <div className={styles.label}>indications</div>
                    <div className={styles.indications}>
                        {
                            taskState.taskDetails.medication?.indications.map( indication => (
                                <div key={indication} className={styles.item}>{ indication }</div>
                            ))
                        }
                    </div>
                </div>

                <SizedBox height={"100px"} />

                <div className={styles.actions}>
                    <div
                        className={`${styles.green_button} ${styles.button}`}
                        children={"Supervisory medication review"}
                        onClick={()=> ({})}
                    />

                    <div
                        className={`${styles.green_button} ${styles.button}`}
                        children={"Administered"}
                        onClick={()=> ({})}
                    />

                    <div
                        className={`${styles.red_button} ${styles.button}`}
                        children={"Declined"}
                        onClick={()=> ({})}
                    />
                </div>
            </div>
        </div>
    )
}

