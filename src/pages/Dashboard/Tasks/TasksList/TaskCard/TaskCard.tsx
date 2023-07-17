import { Link } from "react-router-dom";
import styles from "./taskcard.module.css"
import formatDate from "src/utils/formatDate";
import formatTime from "src/utils/formatTime";
import UserImage from "src/components/ImageComponent/UserImage";

interface ITaskCardProps {
    taskId:number;
    service:string;
    description:string;
    individual:{
        firstname:string;
        lastname:string;
        profileImage:string;
    };
    schedule:{
        startAt:Date;
        endAt:Date;
    };
}

export default function TaskCard({
    taskId,
    description,
    service,
    individual,
    schedule,
}:ITaskCardProps) {

    return (
        <Link to={`${taskId}`} className={styles.medication_service_card}>
            <div className={styles.title}>{ service }</div>

            <div className={styles.desc}>{ description }</div>

            <div className={styles.dets}>
                <div className={styles.schedule}>
                    <div className={styles.frequency}>{ formatDate(schedule.startAt.toString()) }</div>
                    <div className={styles.time}>{ formatTime(schedule.startAt.toString()) }</div>
                </div>

                <div className={styles.individual}>
                    <div className={styles.image}>
                        { UserImage(individual.profileImage, individual.firstname, "25px") }
                    </div>
                    <div className={styles.name}>
                        { individual.firstname + ' ' + individual.lastname }
                    </div>
                </div>
            </div>

            <div className={`${styles.status} ${styles.todo}`}>Todo</div>
        </Link>
    )
}