import IndividualsListTable from "src/pages/Dashboard/Individuals/IndividualsList/IndividualsListTable";
import styles from "./serviceindividuals.module.css";
import { useServicesState } from "src/features/service/state";
import { useParams } from "react-router-dom";
import { useFetchServiceIndividualsSelector } from "src/features/service/selector";
import { useEffect } from "react";

export default function ServiceIndividuals() {

    const params = useParams();

    const [serviceState, setServiceState] = useServicesState();

    const serviceIndividualsResponse = useFetchServiceIndividualsSelector(parseInt(params.serviceId!), serviceState.service.individuals.currentPage);

    useEffect(()=> {
        setServiceState(state => ({
            ...state,
            error: serviceIndividualsResponse.error,
            message: serviceIndividualsResponse.message,
            service: {
                ...state.service,
                individuals: serviceIndividualsResponse.serviceIndividuals
            }
        }))

    }, [serviceIndividualsResponse, setServiceState])


    return (
        <div className={styles.service_individuals}>
            <IndividualsListTable 
                individuals={serviceState.service.individuals.list}
                currentPage={serviceState.service.individuals.currentPage} 
                totalPages={serviceState.service.individuals.totalPages} 
                goToPage={(pageNumber:number)=> console.log(pageNumber)} 
                errorMessage={"No individual has been assigned this service"}
            />
        </div>
    )
}