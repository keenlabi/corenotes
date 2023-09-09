import styles from "./assessmentslist.module.css";
import { useEffect, useState } from "react";
import { useIndividualState } from "src/features/Individual/state";
import AssessmentCard from "../../../../Assessments/AssessmentCard";
import GridList from "src/components/GridList/GridList";
import AssessmentSessionModal from "../AssessmentSession/AssessmentSessionModal";
import { useFetchIndividualAssessmentsList } from "src/features/Individual/selector";
import { useParams } from "react-router-dom";

export default function AssessmentsList() {
	const params = useParams();

	const [individualState, setIndividualState] = useIndividualState();

	const assessmentsResponse = useFetchIndividualAssessmentsList(
		parseInt(params.individualId!),
		individualState.assessments.currentPage
	);

	useEffect(() => {
		if (!assessmentsResponse.error) {
			setIndividualState((state) => ({
				...state,
				assessments: {
					...state.assessments,
					...assessmentsResponse.individualAssessments,
				},
			}));
		}

		return () => {
			setIndividualState((state) => {
				return {
					...state,
					status: "IDLE",
					error: false,
				};
			});
		};
	}, [assessmentsResponse, setIndividualState]);

	const [isAssessmentModalVisible, setIsAssessmentModalVisible] =
		useState(false);
	const [assessmentSessionId, setAssessmentSessionId] = useState("");

	function toggleTakeAssessmentModal(assessmentObjId: string) {
		setAssessmentSessionId(assessmentObjId);

		setIsAssessmentModalVisible(true);
	}

	return (
		<div className={styles.assessment_list}>
			<GridList columnCount={3}>
				{individualState.assessments.list.map((assessment) => {
					return (
						<AssessmentCard
							key={assessment.id}
							category={assessment.category}
							title={assessment.title}
							questionsCount={assessment.questionCount}
							assignedTo={""}
							status={""}
							openAction={() => toggleTakeAssessmentModal(assessment.id)}
						/>
					);
				})}
			</GridList>

			{isAssessmentModalVisible ? (
				<AssessmentSessionModal
					assessmentSessionId={assessmentSessionId}
					closeModal={() => setIsAssessmentModalVisible(false)}
				/>
			) : null}
		</div>
	);
}