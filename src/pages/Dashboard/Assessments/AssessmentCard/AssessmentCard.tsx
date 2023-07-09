import styles from "./assessmentcard.module.css";

interface AssessmentCardProps {
    title:string, 
    category:string, 
    questionsCount:number,
    assignedTo:string,
}

export default function AssessmentCard({
    title,
    category,
    questionsCount,
    assignedTo,

}:AssessmentCardProps) {

    return (
        <div className={styles.assessment_card}>
            <div className={styles.category}>{category} assessment</div>

            <div className={styles.title}>{title}</div>
            <div className={styles.questions_count}>{questionsCount} questions</div>

            <div className={styles.assigned_to}>{ assignedTo }</div>
        </div>
    )
}