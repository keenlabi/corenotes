import { Link } from "react-router-dom";
import styles from "./assessmentcard.module.css";

interface AssessmentCardProps {
    title:string;
    category:string;
    questionsCount:number;
    assignedTo:string;
    path?:string;
    openAction?:()=> void
}

export default function AssessmentCard({
    title,
    category,
    questionsCount,
    assignedTo,
    path,

}:AssessmentCardProps) {
    return (
        <Link to={path?.toString() ?? ""} className={styles.assessment_card}>
            <div className={styles.category}>{category} assessment</div>

            <div className={styles.title}>{title}</div>
            <div className={styles.questions_count}>{questionsCount} questions</div>

            <div className={styles.assigned_to}>{ assignedTo }</div>
        </Link>
    )
}