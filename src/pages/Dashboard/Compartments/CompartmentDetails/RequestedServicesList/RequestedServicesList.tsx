import styles from "./requestedserviceslist.module.css";
import GridList from "src/components/GridList/GridList";
import { useCompartmentStateValue } from "src/features/compartment/state";
import RequestedServiceCard from "./RequestedServiceCard";

export default function RequestedServices() {

    const compartmentState = useCompartmentStateValue()

    return (
        <div className={styles.requested_services_list}>
            <GridList columnCount={3}>
                {
                    compartmentState.compartment.services?.map((service)=> {
                        return  <RequestedServiceCard
                                    key={service.serviceId}
                                    serviceId={service.serviceId} 
                                    title={service.title}
                                    description={service.description}
                                    individualsCount={service.individuals.length}
                                />
                    })
                }
            </GridList>
        </div>
    )
}