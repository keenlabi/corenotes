import SizedBox from "src/components/SizedBox"
import IndividualProfileHeader from "../IndividualProfileHeader"
import styles from "./individualassessments.module.css"
import AssessmentsList from "./AssessmentsList"

export default function IndividualAssessments () {

    return (
        <div className={styles.individual_assessments}>
            <IndividualProfileHeader />
            <SizedBox height={"50px"} />
            <AssessmentsList />
        </div>
    )
}