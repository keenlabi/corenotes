import RoundedIconButton from "src/components/Buttons/RoundedIconButton";
import styles from "./assessmentcard.module.css";
import { FaArrowRight } from "react-icons/fa";
import AssessmentStatusCapsule from "../../AssessmentSession/AssessmentStatusCapsule";
import SizedBox from "src/components/SizedBox";

interface AssessmentCardProps {
    title:string, 
    category:string, 
    questionsCount:number,
    status:string,
    openAction:()=> void
}

export default function AssessmentCard({
    title,
    category,
    questionsCount,
    status,
    openAction
}:AssessmentCardProps) {

    return (
        <div className={styles.assessment_card}>
            <div className={styles.category}>{category} assessment</div>
            <div className={styles.title}>{title}</div>
            <div>{questionsCount} questions</div>

            <SizedBox height="10px" />
            
            <AssessmentStatusCapsule 
                height={"20px"}
                status={status} 
            />


            <div className={styles.button}>
                <RoundedIconButton
                    size={{height: '60px', width:'60px'}}
                    backgroundColor={"var(--blue-accent-100)"}
                    color={'#FFFFFF'}
                    icon={<FaArrowRight />}
                    action={()=> openAction()}
                />
            </div>
        </div>
    )
}