import SizedBox from "src/components/SizedBox"
import IndividualProfileHeader from "../IndividualProfileHeader"
import AssessmentsList from "./AssessmentsList/AssessmentsList"
import styles from "./individualassessments.module.css"

export default function IndividualAssessments () {

    return (
        <div className={styles.individual_assessments}>
            <IndividualProfileHeader />
            <SizedBox height={"50px"} />
            <AssessmentsList />
        </div>
    )
}