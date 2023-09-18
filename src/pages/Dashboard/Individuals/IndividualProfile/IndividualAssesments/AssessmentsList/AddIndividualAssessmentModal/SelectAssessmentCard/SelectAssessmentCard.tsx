import styles from "./selectassessmentcard.module.css";

interface AssessmentCardProps {
    title:string;
    category:string;
    status?:string;
    questionsCount:number;
    assessmentType:string;
    path?:string;
    isSelected:boolean;
    selectAction?:()=> void
}

export default function SelectAssessmentCard({
    title,
    category,
    status,
    questionsCount,
    assessmentType,
    isSelected,
    selectAction
}:AssessmentCardProps) {
    return (
        <div className={`${styles.assessment_card} ${isSelected ?styles.is_selected :""}`} onClick={selectAction}>
            <div className={styles.category}>{category} assessment</div>

            <div className={styles.title}>{title}</div>
            <div className={styles.questions_count}>{questionsCount} questions</div>

            <div className={styles.assigned_to}>{ assessmentType }</div>
            <div className={styles.status}>{status}</div>
        </div>
    )
}