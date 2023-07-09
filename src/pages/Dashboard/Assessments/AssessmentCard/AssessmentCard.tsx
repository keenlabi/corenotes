import RoundedIconButton from "src/components/Buttons/RoundedIconButton";
import styles from "./assessmentcard.module.css";
import { FaArrowRight } from "react-icons/fa";
import AssessmentStatusCapsule from "../../Individuals/IndividualProfile/IndividualAssesments/AssessmentSession/AssessmentStatusCapsule";
import SizedBox from "src/components/SizedBox";

interface AssessmentCardProps {
    title:string, 
    category:string, 
    questionsCount:number,
    assignedTo:string,
    openAction:()=> void
}

export default function AssessmentCard({
    title,
    category,
    questionsCount,
    assignedTo,
    openAction

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