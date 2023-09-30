import { useNavigate, useParams } from "react-router-dom";
import styles from "./compartmentdetails.module.css";
import { FaAngleLeft } from "react-icons/fa";
import capitalize from "src/utils/capitalize";
import { useEffect } from "react";
import { useCompartmentState } from "src/features/compartment/state";
import { useFetchCompartmentDetails } from "src/features/compartment/selector";
import SizedBox from "src/components/SizedBox";
import CompartmentSubcompartmentList from "./Subcompartments";
import CompartmentServicesList from "./CompartmentServices/CompartmentServicesList/CompartmentServicesList";

export default function CompartmentDetails() {

    const { compartmentId } = useParams();

    const navigate = useNavigate()

    const [compartmentState, setCompartmentState] = useCompartmentState();

    const compartmentDetailsResponse = useFetchCompartmentDetails(parseInt(compartmentId!));

    useEffect(()=> {
        setCompartmentState(state => ({
            ...state,
            error: compartmentDetailsResponse.error,
            message: compartmentDetailsResponse.message,
            compartment: compartmentDetailsResponse.compartment,
        }))

    }, [compartmentDetailsResponse, setCompartmentState])

    return (
        <div className={styles.compartment_details}> 
            <div className={styles.header}>
                <FaAngleLeft 
                    className={styles.back_btn} 
                    onClick={()=> navigate({ pathname: '/dashboard/compartments' }) }
                />

                <div className={styles.heading}>{ capitalize(compartmentState.compartment.title) }</div>
            </div>

            <SizedBox height="50px" />

            <CompartmentSubcompartmentList />

            <SizedBox height="40px" />
            
            <CompartmentServicesList />
        </div>
    )
}