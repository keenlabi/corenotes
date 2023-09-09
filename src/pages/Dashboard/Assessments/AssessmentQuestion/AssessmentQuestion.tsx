import capitalize from "src/utils/capitalize";
import styles from "./assessmentquestion.module.css";
import { FaRegEdit } from "react-icons/fa";
import EditAssessmentQuestion from "./EditAssessmentQuestion";
import { useState } from "react";

export default function AssessmentQuestion({
  sNumber,
  question,
  category,
}: {
  sNumber: number;
  question: string;
  category: string;
}) {
  const [assessmentQuestionVisibility, setAssessmentQuestionVisibility] =
    useState(false);
  function openAssessmentQuestionModal() {
    setAssessmentQuestionVisibility(!assessmentQuestionVisibility);
  }
  return (
    <div className={styles.assessment_question_card}>
      <div className={styles.category}> {category} </div>
      <div className={styles.question_text}>
        <div className={styles.number}> Q{sNumber}. </div>
        <div className={styles.text} onClick={openAssessmentQuestionModal}>
          {capitalize(question)}
          <FaRegEdit className={styles.icon_edit}  />
        </div>
      {
        assessmentQuestionVisibility ?   <EditAssessmentQuestion closeModal={openAssessmentQuestionModal} /> : ''
      }
      </div>
    </div>
  );
}
