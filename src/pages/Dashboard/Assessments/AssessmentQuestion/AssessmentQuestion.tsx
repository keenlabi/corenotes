import capitalize from "src/utils/capitalize";
import styles from "./assessmentquestion.module.css";
import { FaRegEdit } from "react-icons/fa";

export default function AssessmentQuestion({sNumber, question, category}:{sNumber:number, question:string, category:string}) {
    return (
        <div className={styles.assessment_question_card}>
            <div className={styles.category}> { category } </div>
            <div className={styles.question_text}>
                <div className={styles.number}> Q{sNumber}. </div>
                <div className={styles.text}>
                    { capitalize(question) } 
                    <FaRegEdit className={styles.icon_edit} />
                </div>
            </div>
        </div>
    )
}