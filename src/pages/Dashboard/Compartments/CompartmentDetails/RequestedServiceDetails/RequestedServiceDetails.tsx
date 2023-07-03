import styles from "./requestedservicedetails.module.css"
import CompartmentDetailsNavigation from "../CompartmentDetailsNavigation/CompartmentDetailsNavigation";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useServicesState } from "src/features/service/state";
import { useFetchServiceDetails } from "src/features/service/selector";
import { useEffect } from "react";
import { FaAngleLeft } from "react-icons/fa";
import capitalize from "src/utils/capitalize";

export default function RequestedServiceDetails() {

    const navigate = useNavigate();

    const { serviceId } = useParams();

    const [serviceState, setServiceState] = useServicesState();

    const serviceDetailsResponse = useFetchServiceDetails(parseInt(serviceId!));

    useEffect(()=> {
        setServiceState(state => ({
            ...state,
            error: serviceDetailsResponse.error,
            message: serviceDetailsResponse.message,
            service: serviceDetailsResponse.service
        }))
    }, [serviceDetailsResponse, setServiceState])


    return (
        <div className={styles.staff_profile}>
            <div className={styles.header}>
                <FaAngleLeft 
                    className={styles.back_btn} 
                    onClick={()=> navigate({ pathname: '/dashboard/compartments' }) }
                />

                <div className={styles.heading}>{ capitalize(serviceState.service.title) }</div>
            </div>

            <div className={styles.main}>
                <CompartmentDetailsNavigation />

                <div className={styles.content}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}