import { useNavigate, useParams } from "react-router-dom";
import styles from "./individualservicedetails.module.css";
import { FaAngleLeft } from "react-icons/fa";
import capitalize from "src/utils/capitalize";
import { useFetchServiceDetails } from "src/features/service/selector";
import { useEffect } from "react";
import { useServicesState } from "src/features/service/state";

export default function IndividualServiceDetails () {

    const { individualServiceId } = useParams();
    const navigate = useNavigate()

    const [serviceState, setServiceState] = useServicesState();
 
    const serviceDetailsResponse = useFetchServiceDetails(parseInt(individualServiceId!));

    useEffect(()=> {
        setServiceState(state => ({
            ...state,
            error: serviceDetailsResponse.error,
            message: serviceDetailsResponse.message,
            service: {
                ...state.service,
                ...serviceDetailsResponse.service
            },
        }))

    }, [serviceDetailsResponse, setServiceState])

    return (
        <div className={styles.service_details}>
            <div className={styles.header}>
                <FaAngleLeft 
                    className={styles.back_btn} 
                    onClick={()=> navigate({ pathname: '/dashboard/compartments' }) }
                />

                <div className={styles.heading}>{ capitalize(serviceState.service.title) }</div>
                <div className={styles.category}>{ serviceState.service.category }</div>
            </div>
        </div>
    )
}