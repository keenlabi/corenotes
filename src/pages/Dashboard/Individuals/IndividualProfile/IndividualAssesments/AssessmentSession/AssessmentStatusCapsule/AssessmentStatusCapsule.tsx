import Capsule from "src/components/Capsules"

export default function AssessmentStatusCapsule({
    status, height
}:{status:string, height:string}) {

    function detStyle() {
        switch(status) {
            case "PENDING": {
                return {
                    color: "var(--yellow-accent-100)",
                    bgColor: "var(--yellow-faded-accent-100)",
                }
            }

            case "IN-PROGRESS": {
                return {
                    color: "var(--red-accent-100)",
                    bgColor: "var(--red-accent-faded-100)",
                }
            }

            case "COMPLETED": {
                return {
                    color: "var(--green-accent-100)",
                    bgColor: "var(--green-faded-accent-100)",
                }
            }

            default: {
                return {
                    color: "var(--yellow-accent-100)",
                    bgColor: "var(--yellow-faded-accent-100)",
                }
            }
            
        }
    }

    return (
        <Capsule 
            height={height}
            color={detStyle()?.color} 
            backgroundColor={detStyle()?.bgColor}
            label={status}
        />
    )
}