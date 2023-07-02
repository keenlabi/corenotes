import IndividualsListTable from "src/pages/Dashboard/Individuals/IndividualsList/IndividualsListTable";
import styles from "./serviceindividuals.module.css";
import { useServicesState } from "src/features/service/state";

export default function ServiceIndividuals() {

    const [serviceState, setServiceState] = useServicesState();

    // const serviceIndividualsResponse = useFetchServiceIndividuals();

    return (
        <div className={styles.service_individuals}>
            <IndividualsListTable 
                individuals={serviceState.service.individuals.list}
                currentPage={serviceState.service.individuals.currentPage} 
                totalPages={serviceState.service.individuals.totalPages} 
                goToPage={(pageNumber:number)=> console.log(pageNumber)} 
                errorMessage={serviceState.message}
            />
        </div>
    )
}